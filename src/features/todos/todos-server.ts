'use server'

import { prisma } from "@/lib/prisma-client"


export async function getAllTodos() {
    const todos = await prisma.todo.findMany()
    return todos;
}


export async function deleteTodo(id: string) {
    const isDelete = await prisma.todo.delete({
        where: { id }
    })
    return isDelete;
}