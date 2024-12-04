import { z } from 'zod'

export const FormSchema = z.object({
  customerId: z.string({
    required_error: 'Please select a customer.',
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Please enter an amount greater than $0.',
  }),
  status: z.enum(['pending', 'paid'], {
    required_error: 'Please select an invoice status.',
    invalid_type_error: 'Please select an invoice status.',
  }),
})
