import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

const chartConfig = {
  desktop: {
    label: 'Reviews',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface QualityWiseReviewsChartProps {
  data:
    | {
        quality: string
        count: number
      }[]
    | undefined
}

export function QualityWiseReviewsChart({
  data,
}: QualityWiseReviewsChartProps) {
  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle>Reviews by quality</CardTitle>
        <CardDescription>Review results by quality</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto w-full">
          <RadarChart data={data}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="quality" />
            <PolarGrid />
            <Radar
              dataKey="count"
              name="Reviews"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
