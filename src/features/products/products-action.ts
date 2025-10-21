'use server'

import { Prisma } from "@/generated/prisma"
import { prisma } from "@/lib/prisma-client"
import { revalidatePath } from "next/cache";
import { ProductSchema } from "@/lib/z-schemas/products-schema";
import { getAuthUser } from "../auth/auth";

export type Product = Prisma.ProductGetPayload<{}>

// 
export async function getAllProducts(user_id?: string): Promise<{ products: Product[], totalProduct: number }> {
    const products = await prisma.product.findMany({
        where: { user_id },
        orderBy: { created_at: 'desc' },
    });
    const totalProduct = await prisma.product.count({
        where: { user_id }
    });

    return { products, totalProduct }
};

// 
export async function productTotalAmount(user_id?: string) {
    const products = await prisma.product.findMany({
        where: { user_id },
        select: { price: true, quantity: true }
    });
    const totalAmount = products.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)
    return totalAmount;
};


// 
export async function lowStockProducts(user_id?: string) {
    const products = await prisma.product.count({
        where: {
            user_id,
            quantity: { lte: 5 }
        },
    })
    return products;
}


// weeklydata
export async function getWeeklyProductData(products: Product[]) {
    const now = new Date();
    const weeklyProductsData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekStart.setHours(23, 59, 59, 999);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
            2,
            "0"
        )}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

        const weekProducts = products.filter((product) => {
            const productDate = new Date(product.created_at);
            return productDate >= weekStart && productDate <= weekEnd;
        });

        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length,
        });
    }
    return weeklyProductsData;
}



export async function deleteProductAction(id: string) {
    const isDelete = !!(await prisma.product.delete({
        where: { id },
    }));
    if (isDelete) {
        revalidatePath('/dashboard/inventory')
        return isDelete;
    }
}



export async function createProductsAction(initialState: unknown, formData: FormData) {
    const user = await getAuthUser();
    const data = Object.fromEntries(formData.entries())

    const { success, data: validateFields, error } = data && await ProductSchema.safeParseAsync({ ...data, user_id: user?.id! })

    if (!success) {
        return {
            success, errors: {
                name: error?.format().name?._errors,
                price: error?.format().price?._errors,
                quantity: error?.format().quantity?._errors,
            }
        }
    };

    try {
        const result = await prisma.product.create({
            data: {
                // ...validateFields
                name: validateFields.name,
                price: Number(validateFields.price),
                user_id: validateFields.user_id,
                quantity: Number(validateFields.quantity),
                sku: validateFields.sku,
                lowStockAt: Number(validateFields.lowStockAt)
            }
        });

        if (result !== null) {
            return { success: true, message: `${result?.id} was successfully created!` }
        }
    } catch (error) {
        return { success: false, errors: { other: error instanceof Error ? error?.message : "server error" } }
    }
}