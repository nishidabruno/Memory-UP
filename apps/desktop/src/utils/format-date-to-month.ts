import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateToMonth(date: string): string {
  const parsedDate = parseISO(date)

  const monthName = format(parsedDate, 'MMM', { locale: ptBR })

  return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}
