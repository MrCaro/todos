import APITodos from "./api/todos";
import Header from "@/components/Header";
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
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { columns } from "../utils/columns"
import DataTable from "../utils/data-table"
import Footer from "@/components/Footer";

async function createTodo(data: FormData) {
  "use server"
  await APITodos.create(data)
}

export default async function Home() {
  const todos = await APITodos.get()
  const completedTodos = await APITodos.getCompleted()

  return (
    <>
      <Header />
      <main className='container mx-auto p-4 mt-8'>
        <p className="text-xs text-muted-foreground text-right">{Math.floor(completedTodos.length * 100 / todos.length)}% completed</p>
        <Progress value={completedTodos.length * 100 / todos.length} className="h-1 translate-y-2/4 rounded-bl-none rounded-br-none" />
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
      <Footer />
    </>
  )
}
