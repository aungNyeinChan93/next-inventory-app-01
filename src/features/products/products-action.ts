'use server'

import { Prisma } from "@/generated/prisma"
import { prisma } from "@/lib/prisma-client"
import { product } from './../../../node_modules/effect/src/Equivalence';

export type Product = Prisma.ProductGetPayload<{}>

export async function getAllProducts(user_id?: string): Promise<{ products: Product[], totalProduct: number }> {
    const products = await prisma.product.findMany({
        where: { user_id },
        // orderBy: { created_at: 'desc' },
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
