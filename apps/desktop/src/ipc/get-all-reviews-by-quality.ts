import { invoke } from '@tauri-apps/api/core'

interface QualityWiseReviews {
  quality: string
  count: number
}
export async function getAllReviewsQualityWise() {
  const response = await invoke<QualityWiseReviews[]>(
    'get_total_reviews_by_quality',
  )

  return response
}
