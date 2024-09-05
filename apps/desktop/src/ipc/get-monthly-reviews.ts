import { invoke } from '@tauri-apps/api/core'

interface MonthlyReviews {
  count: number
  month: string
}

export async function getMonthlyReviews() {
  const response = await invoke<MonthlyReviews[]>('get_total_reviews_by_month')

  return response
}
