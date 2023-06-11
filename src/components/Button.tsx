import clsx from "clsx"

type ButtonProp = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: string
  color: string
  className: string
  children: any
}

interface Base {
  [key: string]: string
}

interface Variant { 
  [key: string]: {
    [key: string]: string
  }
}

const baseStyles: Base = {
  solid: 'inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline: 'inline-flex ring-1 items-center justify-center rounded-lg py-2 px-4 text-sm focus:outline-none',
}

const variantStyles: Variant = {
  solid: {
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
  },
  outline: {
    white: 'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  }
}

export default function Button({ variant = 'solid', color = 'white', className, children  , ...props }: ButtonProp) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color]
  )

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}