"use client"

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
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { toggleTodo, updateTodo, deleteTodo } from "@/app/api/server"
import client from "@/app/api/client"
import { Button } from "@/components/ui/button"

export type Todos = {
  id: string
  title: string
  complete: boolean
}

function refreshPage(delay: number) {
  setTimeout(() => location.reload(), delay)
}

async function onCheck(value: any, row: any) {
  row.toggleSelected(!!value)
  await toggleTodo(row.original.id, !!value)
}

async function onUpdate(data: FormData) {
  await updateTodo(data)
  refreshPage(0)
}

async function onDelete(id: string) {
  await deleteTodo(id)
  refreshPage(0)
}

export const columns: ColumnDef<Todos>[] = [
  {
    id: "select",
    header: () => (
      <button className="text-left flex gap-2" onClick={client.refreshPage}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
    ),
    cell: ({ row }) => (
      <Checkbox
        defaultChecked={row.original.complete}
        onCheckedChange={(value) => {onCheck(value, row)}}
        aria-label="Select row"
      />
    ),
    // enableSorting: false,
    enableHiding: false,
  },  
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Todo Item
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "complete",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      row.original.complete 
        ? 
        <span className="py-2 px-4 rounded-sm" style={{backgroundColor: '#f0fdf4', color: '#16a34a'}}>completed</span> 
        : 
        <span className="py-2 px-4 rounded-sm" style={{backgroundColor: '#fef2f2', color: '#ef4444'}}>pending</span>
    ),
  },
  {
    id: "update",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-0 bg-transparent hover:bg-transparent text-primary font-normal">edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit item name</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4 py-4" action={onUpdate}>
            <Label htmlFor="title" className="text-left">
              Todo Item
            </Label>
            <Input id="title" name="title" type="text" placeholder={row.original.title} defaultValue={row.original.title} onChange={(e) => e.target.value} />
            <Input id="id" name="id" type="text" value={row.original.id} style={{display: 'none'}} />
            <div className="flex">
              <Button className="w-full" type="submit">Update</Button>
            </div>
          </form>
          <DialogFooter className="text-sm">
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent font-normal"
        onClick={() => onDelete(row.original.id)}
      >
        delete
      </Button>
    )
  }
]
