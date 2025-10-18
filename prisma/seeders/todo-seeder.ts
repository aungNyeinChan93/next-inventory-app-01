import { Prisma } from "@/generated/prisma"
import { prisma } from "@/lib/prisma-client"

export type Todo = Prisma.TodoGetPayload<{}>

export async function todoSeeder() {
    const todos = await prisma.todo.createMany({
        data: [
            { task: 'task one' },
            { task: 'task two' },
            { task: 'task three' },
        ]
    })
    console.log(todos);
};

todoSeeder();