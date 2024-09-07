import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function formatDateToMonth(date: string): string {
  const parsedDate = parseISO(date)

  const monthName = format(parsedDate, 'MMM', { locale: enUS })

  return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}
