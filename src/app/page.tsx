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
        <div className="flex flex-wrap mb-12 justify-between">
          <div>
            <h1 className="text-primary text-3xl lg:text-5xl font-bold">Todos</h1>
            <p>
              A list of all my current and past todo items including their title and status.
            </p>
          </div>  
          <Dialog>
            <div className="text-right mt-4 w-full md:w-auto">
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">Add todo</Button>
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Add item to your list</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col gap-4 py-4" action={createTodo}>
                <Label htmlFor="title" className="text-left">
                  Todo Item
                </Label>
                <Input id="title" name="title" type="text" placeholder="i.e Do my laundry" />
                <div className="flex">
                  <Button className="w-full" type="submit">Save item</Button>
                </div>
              </form>
              <DialogFooter className="text-sm">
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-xs text-muted-foreground text-right">{Math.floor(completedTodos.length * 100 / todos.length)}%</p>
        <p className="text-xs text-muted-foreground text-right">{completedTodos.length} out of {todos.length} completed</p>
        <Progress value={completedTodos.length * 100 / todos.length} className="h-1 translate-y-2/4 rounded-bl-none rounded-br-none" />
        <DataTable columns={columns} data={todos} />
      </main>
      <Footer />
    </>
  )
}
