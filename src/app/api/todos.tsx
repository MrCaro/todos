import { prisma } from "@/db";

// await prisma.todo.create({ data: { title: 'Workout', complete: false } })
// await prisma.todo.update({ where: { id: '55196fc3-da84-45a0-8d40-45864e4fde5c' }, data: { title: 'Make your bed', complete: false } })

function get() {
  return prisma.todo.findMany()
}

const APITodos = { get }
export default APITodos