import Button from "@/components/Button"
import { prisma } from "@/db"
import { redirect } from "next/navigation"
import Link from "next/link"

async function createTodo(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf()

  if(typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title") 
  } 

  await prisma.todo.create({ data: {title, complete: false} })

  redirect('/')
}

export default function About() {         
  return (
    <form className="flex flex-col" action={createTodo}>
      <label htmlFor="title" className="">Add Todo item</label>
      <input type="text" name="title" className="bg-transparent border-slate-100 border-2" />
      <div className="flex justify-end">
        <Link href="..">
          Back
        </Link>
        <Button type="submit" className="" variant="solid" color="blue">
          CREATE
        </Button>
      </div>
    </form>
  )
}