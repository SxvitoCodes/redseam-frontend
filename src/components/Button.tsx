import type { ReactNode } from "react"

type ButtonProps = {
  variant?: "primary" | "secondary"
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
}

export default function Button({ variant = "primary", children, onClick, icon }: ButtonProps) {
  const base = "flex items-center justify-center gap-[0.625rem] px-[1rem] py-[1rem] rounded-md font-medium cursor-pointer"
  const styles =
    variant === "primary"
      ? "bg-red text-white"
      : "bg-grey text-dark-blue px-[1rem] py-[1rem]"

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
