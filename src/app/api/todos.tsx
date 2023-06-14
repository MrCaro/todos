import { prisma } from "@/db"
import { redirect } from 'next/navigation'

// await prisma.todo.create({ data: { title: 'Workout', complete: false } })
// await prisma.todo.update({ where: { id: '55196fc3-da84-45a0-8d40-45864e4fde5c' }, data: { title: 'Make your bed', complete: false } })

function get() {
  return prisma.todo.findMany()
}

function getCompleted() {
  return prisma.todo.findMany({ where: { complete: true }})
}

async function create(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf()

  if(typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title") 
  } 

  await prisma.todo.create({ data: {title, complete: false} })

  redirect('/')
}

const APITodos = { get, getCompleted, create }
export default APITodos