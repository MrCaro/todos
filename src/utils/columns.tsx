"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import toggleTodo from "../app/api/server"

export type Todos = {
  id: string
  title: string
  complete: boolean
}

//page reload time after clicking checkbox
const timeToRefresh = 1000

function refreshPage() {
  setTimeout(() => location.reload(), timeToRefresh)
}

function onCheck(value: any, row: any) {
  row.toggleSelected(!!value)
  toggleTodo(row.original.id, !!value)
  // refreshPage()
}

export const columns: ColumnDef<Todos>[] = [
  {
    id: "select",
    header: () => (
      <button className="text-left flex gap-2" onClick={refreshPage}>
        <p>
          Refresh 
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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
      row.original.complete 
        ? 
        <span className="py-2 px-4 rounded-sm" style={{backgroundColor: '#dcfce7', color: '#15803d'}}>completed</span> 
        : 
        <span className="py-2 px-4 rounded-sm" style={{backgroundColor: '#fee2e2', color: '#b91c1c'}}>pending</span>
    ),
  }
]
