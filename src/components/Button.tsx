import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>; // ✅ allow type, onClick, className, etc.

export default function Button({
  variant = "primary",
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-[0.625rem] px-[1rem] py-[1rem] rounded-md font-medium cursor-pointer";
  const styles =
    variant === "primary"
      ? "bg-red text-white"
      : "bg-grey text-dark-blue";

  return (
    <button
      className={`${base} ${styles} ${className ?? ""}`}
      {...props} // ✅ forward type, onClick, etc.
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
Button.displayName = "Button"; // ✅ for better debugging and testing