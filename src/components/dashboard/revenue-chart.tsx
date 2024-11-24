import { fetchRevenue } from '@/lib/data'
import { cn, generateYAxis } from '@/lib/utils'

import { lusitana } from '../fonts'

export async function RevenueChart() {
  const revenue = await fetchRevenue()
  const chartHeight = 350
  const { yAxisLabels, topLabel } = generateYAxis(revenue)

  return (
    <div className="w-full md:col-span-4">
      <h2 className={cn('mb-4 text-xl md:text-2xl', lusitana.className)}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-secondary p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-background p-4 md:grid-cols-13 md:gap-4">
          {/* y-axis */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-muted-foreground md:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map(label => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map(month => (
            <div key={month.month} className="flex flex-col items-center gap-3 md:gap-2">
              {/* bars */}
              <div
                className="w-full rounded-md bg-primary/70"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              />
              {/* x-axis */}
              <p className="-rotate-90 text-sm text-muted-foreground md:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="i-mingcute-calendar-line size-5 text-muted-foreground" />
          <h3 className="ml-2 text-sm text-muted-foreground">Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}
