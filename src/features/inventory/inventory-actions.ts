import { prisma } from "@/lib/prisma-client"



export async function getAllInventory({ user_id, limit, skip }: { user_id?: string, limit?: number, skip?: number }) {
    const products = await prisma.product.findMany({
        where: { user_id },
        orderBy: { created_at: 'desc' },
        take: limit,
        skip,

    })
    return products;
}