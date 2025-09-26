import type { ReactNode, InputHTMLAttributes } from "react";
import { forwardRef } from "react";

type InputProps = {
  variant?: "default" | "dark" | "error";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>; // ✅ inherit native input props

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      placeholder,
      iconLeft,
      iconRight,
      errorMessage,
      className,
      ...props // ✅ spread all other input props (name, onChange, value, etc.)
    },
    ref
  ) => {
    const base =
      "flex items-center gap-2 rounded-lg px-[0.75rem] py-[0.656rem] text-dark-blue text-base border";
    const styles = {
      default: "border-grey-2",
      dark: "border-dark-blue",
      error: "border-red",
    };

    return (
      <div className="flex flex-col">
        <div className={`${base} ${styles[variant]} ${className ?? ""}`}>
          {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
          <input
            ref={ref} // ✅ forward the ref
            placeholder={placeholder}
            className="flex-1 outline-none bg-transparent"
            {...props} // ✅ inject react-hook-form stuff
          />
          {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </div>
        {variant === "error" && errorMessage && (
          <p className="text-red text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // ✅ required when using forwardRef

export default Input;
