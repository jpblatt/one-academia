import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // As fotos são <img> externas do Unsplash com object-cover/parallax via GSAP — mantidas como no projeto original.
      "@next/next/no-img-element": "off",
    },
  },
])
