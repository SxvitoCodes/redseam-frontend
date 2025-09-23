type PaginationButtonProps = {
  active?: boolean
  label: string | number
  onClick?: () => void
}

export default function PaginationButton({ active, label, onClick }: PaginationButtonProps) {
  const base =
    "w-[2rem] h-[2rem] flex items-center justify-center rounded-[0.25rem] text-[0.875rem] font-medium leading-[1.25rem] px-1 py-[0.3125rem] cursor-pointer"
  const styles = active
    ? "text-red border border-red bg-white"
    : "text-dark-grey-400 bg-white"

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  )
}
