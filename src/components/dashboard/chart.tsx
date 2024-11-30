'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-is-mobile'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

export function Chart({ revenue }: { revenue: { month: string, revenue: number }[] }) {
  const isMobile = useIsMobile()

  return (
    <ChartContainer config={{}} className="aspect-square min-h-[260px] w-full md:aspect-video md:h-[360px]">
      <BarChart accessibilityLayer data={revenue}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis
          className="hidden md:block"
          width={isMobile ? 0 : 30}
          tickMargin={5}
          tickLine={false}
          axisLine={false}
          domain={[0, 5000]}
          ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          tickFormatter={value => `$${value / 1000}K`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
