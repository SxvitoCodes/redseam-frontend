import type { ReactNode } from "react"

type InputProps = {
  variant?: "default" | "dark" | "error"
  placeholder?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  errorMessage?: string
}

export default function Input({
  variant = "default",
  placeholder,
  iconLeft,
  iconRight,
  errorMessage,
}: InputProps) {
  const base =
    "flex items-center gap-2 rounded-lg px-[0.75rem] py-[0.656rem] text-dark-blue text-base border"
  const styles = {
    default: "border-grey-2",
    dark: "border-dark-blue",
    error: "border-red",
  }

  return (
    <div className="flex flex-col">
      <div className={`${base} ${styles[variant]}`}>
        {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
        <input
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
        />
        {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </div>
      {variant === "error" && errorMessage && (
        <p className="text-red text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  )
}
