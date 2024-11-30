'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils'

import { lusitana } from '../fonts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

export function Chart({ revenue }: { revenue: { month: string, revenue: number }[] }) {
  const isMobile = useIsMobile()

  return (
    <div className="w-full md:col-span-4">
      <h2 className={cn('mb-4 text-xl md:text-2xl', lusitana.className)}>
        Recent Revenue
      </h2>
      <div className="rounded-lg bg-secondary p-4">
        <div className="rounded-md bg-background p-4">
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
        </div>
        <div className="flex items-center justify-between pb-2 pt-6">
          <div className="flex items-center">
            <div className="i-mingcute-calendar-line size-5 text-muted-foreground" />
            <h3 className="ml-2 text-sm text-muted-foreground">Last 12 months</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
