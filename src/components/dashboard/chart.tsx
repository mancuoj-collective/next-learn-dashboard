'use client'

import NumberFlow from '@number-flow/react'
import { useState } from 'react'

import { cn, generateYAxis } from '@/lib/utils'

import { lusitana } from '../fonts'

export function Chart({ revenue }: { revenue: { month: string, revenue: number }[] }) {
  const chartHeight = 350
  const { yAxisLabels, topLabel } = generateYAxis(revenue)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(11)
  const totalRevenue = revenue.reduce((acc, curr) => acc + curr.revenue, 0)

  return (
    <div className="w-full md:col-span-4" onClick={() => setSelectedMonth(null)}>
      <h2 className={cn('mb-4 text-xl md:text-2xl', lusitana.className)}>
        Recent Revenue
      </h2>
      <div className="rounded-lg bg-secondary p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-background p-4 md:grid-cols-13 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-muted-foreground md:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map(label => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month, index) => (
            <div key={month.month} className="flex flex-col items-center gap-3 md:gap-2">
              <div
                className={cn(
                  'w-full cursor-pointer rounded bg-primary/50 transition-colors hover:bg-primary',
                  { 'bg-primary': selectedMonth === index },
                )}
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue + 3}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedMonth(index)
                }}
              />
              <p className="-rotate-90 text-sm text-muted-foreground md:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pb-2 pt-6">
          <div className="flex items-center">
            <div className="i-mingcute-calendar-line size-5 text-muted-foreground" />
            <h3 className="ml-2 text-sm text-muted-foreground">Last 12 months</h3>
          </div>
          <NumberFlow
            willChange
            className={cn(lusitana.className, 'text-base tracking-wider md:text-lg')}
            value={selectedMonth !== null ? revenue[selectedMonth].revenue : totalRevenue}
            locales="en-US"
            format={{ style: 'currency', currency: 'USD' }}
          />
        </div>
      </div>
    </div>
  )
}
