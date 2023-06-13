"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { toggleTodo } from "../app/api/server"

// This type is used to define the shape of our data.
// You can use a Zod schema     here if you want.
export type Todos = {
  title: string
  complete: boolean
}

export const columns: ColumnDef<Todos>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        defaultChecked={row.original.complete}
        onCheckedChange={(value) => {row.toggleSelected(!!value); toggleTodo(row.original.id, !!value);}}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },    
  {
    accessorKey: "title",
    header: "Todo Item",
  },
  {
    accessorKey: "complete",
    header: "Status",
    cell: ({ row }) => (
      row.original.complete ? <span className="py-2 px-4 rounded-sm" style={{backgroundColor: '#dcfce7', color: '#15803d'}}>completed</span> : <span className="py-2 px-4 rounded-sm" style={{backgroundColor: '#fee2e2', color: '#b91c1c'}}>pending</span>
    ),
  }
]
