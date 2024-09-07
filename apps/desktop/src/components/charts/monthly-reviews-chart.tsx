import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

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
    label: 'Mês',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface MonthlyReviewsChartProps {
  data:
    | {
        month: string
        count: number
      }[]
    | undefined
}

export function MonthlyReviewsChart({ data }: MonthlyReviewsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Review</CardTitle>
        <CardDescription>Total reviews in the last months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              name="Month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="count"
              name="Reviews"
              type="basis"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
