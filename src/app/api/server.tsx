"use server"

import { prisma } from "@/db";

export async function toggleTodo(id: string, complete: boolean) {
  
  console.log('updating entry', id, ' value ', complete)
  await prisma.todo.update({ where: { id }, data: { complete } })
} 