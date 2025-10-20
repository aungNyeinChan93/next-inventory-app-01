import { prisma } from "@/lib/prisma-client"


export async function getAllInventory({ user_id, limit, skip, q }: { user_id?: string, limit?: number, skip?: number, q?: string }) {
    const products = await prisma.product.findMany({
        where: { user_id, name: { contains: q, mode: 'insensitive' } },
        orderBy: { created_at: 'desc' },
        take: limit,
        skip,
    })
    return products;
}