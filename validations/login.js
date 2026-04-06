import * as z from 'zod'
export const userlogin = z.object({
    name: z.string().trim().min(2).max(50),
    phone: z.string().regex(/^[0-9]{10}$/),
    password: z.string().min(8).regex(/[0-9]/, "Must include number")
        .regex(/[a-z]/, 'Must include lowercase letter')
        .regex(/[A-Z]/, 'Must include Upercase letter')
        .regex(/[@$!%*?&]/, 'Must at least one Special Character')
})

