import { useEffect, useState } from "react"

/**
 * Data atual, atualizada a cada `interval` ms.
 * Retorna `null` no servidor e na hidratação (o horário do servidor e o fuso dele
 * são diferentes dos do visitante); a data real chega logo após montar no navegador.
 */
export function useNow(interval = 30_000) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const update = () => setNow(new Date())
    update()
    const id = setInterval(update, interval)
    return () => clearInterval(id)
  }, [interval])
  return now
}
