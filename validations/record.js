import * as z from 'zod'
export const record = z.object({
    amount: z.number(),
    type:z.string(),
    category:z.string(),
    date:z.coerce.date(),
    description: z.string()
})