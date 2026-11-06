import { useId } from "react"
import {
  GOLD,
  ONE_PATHS,
  ORANGE,
  layoutAcademia,
} from "@/components/logo-paths"
import { cn } from "@/lib/utils"

type LogoProps = {
  /** Versão branca, para fundos coloridos */
  mono?: boolean
  /** Só a palavra "ONE", sem "ACADEMIA" */
  mark?: boolean
  /** Para o preloader: traços sem preenchimento que se desenham via GSAP */
  draw?: boolean
  className?: string
  title?: string
}

const academia = layoutAcademia()

/** Logo vetorial da ONE Academia (redesenhada em SVG). */
export function Logo({
  mono,
  mark,
  draw,
  className,
  title = "ONE Academia",
}: LogoProps) {
  const id = useId().replace(/:/g, "")
  const gradId = `one-grad-${id}`
  const fill = mono ? "currentColor" : `url(#${gradId})`

  return (
    <svg
      viewBox={mark ? "-2 -2 250 104" : "-2 -2 250 140"}
      role="img"
      aria-label={title}
      className={cn("h-auto overflow-visible", className)}
    >
      {!mono && (
        <defs>
          <linearGradient
            id={gradId}
            x1="0"
            y1="0"
            x2="246"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".15" stopColor={GOLD} />
            <stop offset="1" stopColor={ORANGE} />
          </linearGradient>
        </defs>
      )}
      <g fill={fill} data-logo-one>
        {ONE_PATHS.map((d) => (
          <path
            key={d}
            d={d}
            fillRule="evenodd"
            data-logo-path
            {...(draw
              ? {
                  stroke: mono ? "currentColor" : `url(#${gradId})`,
                  strokeWidth: 1.2,
                }
              : {})}
          />
        ))}
      </g>
      {!mark && (
        <g
          fill="none"
          stroke={mono ? "currentColor" : "#fff"}
          strokeWidth="2.6"
          data-logo-academia
          aria-hidden="true"
        >
          {academia.map((g, i) => (
            <path key={i} d={g.d} transform={`translate(${g.x} 134)`} />
          ))}
        </g>
      )}
    </svg>
  )
}
