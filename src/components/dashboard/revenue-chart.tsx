import { fetchRevenue } from '@/lib/data'

import { Chart } from './chart'

export async function RevenueChart() {
  const revenue = await fetchRevenue()

  return <Chart revenue={revenue} />
}
