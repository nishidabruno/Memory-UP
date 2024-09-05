import { useQuery } from '@tanstack/react-query'

import { MonthlyReviewsChart } from '@/components/charts/monthly-reviews-chart'
import { QualityWiseReviewsChart } from '@/components/charts/quality-wise-reviews-chart'
import { Sidebar } from '@/components/sidebar'
import { getAllReviewsQualityWise } from '@/ipc/get-all-reviews-by-quality'
import { getMonthlyReviews } from '@/ipc/get-monthly-reviews'
import { formatDateToMonth } from '@/utils/format-date-to-month'

export const Stats = () => {
  const { data: monthlyReviews } = useQuery({
    queryKey: ['stats', 'monthly-reviews'],
    queryFn: getMonthlyReviews,
  })
  const { data: qualityWiseReviews } = useQuery({
    queryKey: ['stats', 'quality-wise-reviews'],
    queryFn: getAllReviewsQualityWise,
  })

  const formattedMonthlyReviews = monthlyReviews?.map((review) => ({
    ...review,
    month: formatDateToMonth(review.month),
  }))

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-14 h-full w-full space-y-4 p-4">
        <h1 className="pt-3 text-3xl">Estatísticas</h1>
        <MonthlyReviewsChart data={formattedMonthlyReviews} />
        <QualityWiseReviewsChart data={qualityWiseReviews} />
      </div>
    </div>
  )
}
