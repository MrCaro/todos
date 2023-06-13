import Link from "next/link";
import { redirect } from "next/navigation"
import APITodos from "./api/todos";
import { prisma } from "@/db";
import TodoItem from "@/components/TodoItem";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Todos, columns } from "../utils/columns"
import DataTable from "../utils/data-table"

async function createTodo(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf()

  if(typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title") 
  } 

  await prisma.todo.create({ data: {title, complete: false} })

  redirect('/')
}

export default async function Home() {
  const todos = await APITodos.get()

  return (
    <main>
      <h1 className="">My Todos List</h1>
      <DataTable columns={columns} data={todos} />
      <Dialog>
        <div className="text-right mt-4">
          <DialogTrigger asChild>
            <Button variant="outline">Add todo</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add item to your todo list</DialogTitle>
            <DialogDescription>
              Once you type your task click &apos;save item&apos; to add it to your list.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" action={createTodo}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Todo
              </Label>
              <Input id="title" name="title" type="text" placeholder="i.e Do my laundry" className="col-span-3" />
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button type="submit">Save item</Button>
            </div>
          </form>
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
