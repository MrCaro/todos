import TodoItem from "@/components/TodoItem";
import Link from "next/link";
import APITodos from "./api/todos";
import { prisma } from "@/db";

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function Home() {
  const todos = await APITodos.get()

  return (
    <main>
      <Link href='/about'>
        About us
      </Link>
      <p>Todos</p>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </main>
  )
}
