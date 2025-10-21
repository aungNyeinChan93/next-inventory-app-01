import { prisma } from "@/lib/prisma-client"


export async function getAllInventory({ user_id, limit, q, page = 1 }:
    { user_id?: string, limit?: number, q?: string, page?: number }) {
    const skip = (Number(page - 1)) * Number(limit);

    const products = await prisma.product.findMany({
        where: { user_id, name: { contains: q, mode: 'insensitive' } },
        orderBy: { created_at: 'desc' },
        take: limit,
        skip,
    })
    return products;
};

export async function totalInventoryCount() {
    return await prisma.product?.count()
}