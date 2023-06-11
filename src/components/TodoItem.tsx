"use client"

type TodoItemProps = {
  id: string
  title: string
  complete: boolean
  toggleTodo: (id: string, complete: boolean) => void
}

export default  function TodoItem({ id, title, complete, toggleTodo}: TodoItemProps) {
  return (
    <li className="flex items-center gap-1">
      <input id={id} type="checkbox" className="peer cursor-pointer" defaultChecked={complete} onChange={e => toggleTodo(id, e.target.checked)} />
      <label htmlFor={id} className="peer-checked:text-slate-500 peer-checked:line-through cursor-pointer">
        {title}
      </label>
    </li>
  )
}