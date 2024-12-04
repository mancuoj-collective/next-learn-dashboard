'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSign, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useActionState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { InsertCustomer } from '@/db/schema'
import type { State } from '@/lib/actions'
import { createInvoice } from '@/lib/actions'

import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { StatusBadge } from './badge'
import { FormSchema } from './schema'

export function CreateForm({ customers }: { customers: InsertCustomer[] }) {
  const initialState: State = { message: null }
  const [state, formAction] = useActionState(createInvoice, initialState)
  const [isCreating, startTransition] = useTransition()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  })

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message)
    }
  }, [state?.message])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData()
    formData.append('customerId', data.customerId)
    formData.append('amount', data.amount.toString())
    formData.append('status', data.status)
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 rounded-lg bg-secondary p-4 md:p-6">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose customer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="relative bg-background pl-10">
                    <SelectTrigger className="group">
                      <SelectValue placeholder="Select a customer" />
                      <UserCircle className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground group-focus:text-foreground" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose an amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter USD amount" {...field} type="number" step={0.01} className="peer bg-background pl-10" />
                    <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Set the invoice status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-3 whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none"
                  >
                    <FormItem className="flex items-center gap-1.5">
                      <FormControl>
                        <RadioGroupItem value="pending" />
                      </FormControl>
                      <FormLabel>
                        <StatusBadge status="pending" />
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-1.5">
                      <FormControl>
                        <RadioGroupItem value="paid" />
                      </FormControl>
                      <FormLabel>
                        <StatusBadge status="paid" />
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/invoices">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isCreating}>Create invoice</Button>
        </div>
      </form>
    </Form>
  )
}
