import { cn } from "@/lib/utils"

/**
 * Texto que "rola" para cima no hover (efeito do Casa Momo).
 * Funciona dentro de qualquer <Button>, que já declara `group/button`.
 */
export function RollText({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[1.2em] overflow-hidden leading-[1.2]",
        className
      )}
      aria-label={children}
    >
      <span
        aria-hidden="true"
        className="flex h-max shrink-0 flex-col self-start transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover/button:-translate-y-1/2"
      >
        <span className="h-[1.2em]">{children}</span>
        <span className="h-[1.2em]">{children}</span>
      </span>
    </span>
  )
}
