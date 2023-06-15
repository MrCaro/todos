"use server"

import { prisma } from "@/db";
import { green } from 'console-log-colors';

export async function toggleTodo(id: string, complete: boolean) {
  console.log(green(`updating entry => ${id}`))

  try  {
    await prisma.todo.update({ where: { id }, data: { complete } })
  } catch (err) {
    console.log(err)
  } 
} 

export async function updateTodo(data: FormData) {
    const todoId = data.get("id")?.valueOf()
    const todoTitle = data.get("title")?.valueOf()

    console.log(green(`updating entry => ${todoId}`))
  
    if(typeof todoId !== "string" || todoId.length === 0) {
      throw new Error("Invalid ID") 
    } 
  
    if(typeof todoTitle !== "string" || todoTitle.length === 0) {
      throw new Error("Invalid Title") 
    }
  
    await prisma.todo.update({ where: {id: todoId}, data: {title: todoTitle} })
}

export async function deleteTodo(id: string) {
  try {
    await prisma.todo.delete({ where: { id } })
  } catch(err) {
    console.log(err)
  }
}

