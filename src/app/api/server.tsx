"use server"

import { prisma } from "@/db";
import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';

export async function toggleTodo(id: string, complete: boolean) {
  
  console.log(green(`updating entry => ' ${id}`))
  await prisma.todo.update({ where: { id }, data: { complete } })
} 