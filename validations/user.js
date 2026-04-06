import * as z from 'zod'
export const user = z.object({
    name: z.string().trim().min(2).max(50),
    email: z.string().email(),
    phone: z.string().regex(/^[0-9]{10}$/, "phone number must be provide exactly 10 digits"),
    password: z.string().min(8).max(12).regex(/[0-9]/, 'Must at least one number')
        .regex(/[a-z]/, 'Must at least one number')
        .regex(/[!@$%&]/, 'Must at least One Character'),
    role:z.string()
});

