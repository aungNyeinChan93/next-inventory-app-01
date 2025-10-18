import { prisma } from "@/lib/prisma-client"
import { error } from "console";



export async function productSeeder() {
    await prisma.product.createMany({
        data: Array.from({ length: 30 }).map((_i, idx) => ({
            user_id: '8854e2dc-f59a-4f42-998b-467ab347eff7',
            name: `Product - ${idx + 1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            lowStockAt: 5,
            quantity: 10 + idx,
        }))

    })
};

productSeeder()
    .catch((e) => {
        console.log(e instanceof Error ? error?.name : 'connection err');
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });