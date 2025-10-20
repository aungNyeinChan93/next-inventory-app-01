'use server'

import { Prisma } from "@/generated/prisma"
import { prisma } from "@/lib/prisma-client"
import { product } from './../../../node_modules/effect/src/Equivalence';
import { revalidatePath } from "next/cache";

export type Product = Prisma.ProductGetPayload<{}>

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

export async function productTotalAmount(user_id?: string) {
    const products = await prisma.product.findMany({
        where: { user_id },
        select: { price: true, quantity: true }
    });
    const totalAmount = products.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)
    return totalAmount;
};


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
    }
}