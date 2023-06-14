"use server"

import { prisma } from "@/db";
import { green } from 'console-log-colors';

export default async function toggleTodo(id: string, complete: boolean) {
  console.log(green(`updating entry => ${id}`))
  try  {
    await prisma.todo.update({ where: { id }, data: { complete } })
  } catch (err) {
    alert(err)
  } 
} 