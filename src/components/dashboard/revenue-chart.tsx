import { fetchRevenue } from '@/lib/data'
import { cn } from '@/lib/utils'

import { lusitana } from '../fonts'
import { Chart } from './chart'

export async function RevenueChart() {
  const revenue = await fetchRevenue()

  return (
    <div className="w-full md:col-span-4">
      <h2 className={cn('mb-4 pl-1 text-xl md:text-2xl', lusitana.className)}>
        Recent Revenue
      </h2>
      <div className="rounded-lg bg-secondary p-4">
        <div className="rounded-md bg-background p-4">
          <Chart revenue={revenue} />
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
