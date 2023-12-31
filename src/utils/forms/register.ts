import { RegisterRequest } from '@redux/auth'
import { z, ZodType } from 'zod'

export const registerFormSchema: ZodType<RegisterRequest> = z
  .object({
    fname: z.string().min(3),
    lname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords are not matching!',
    path: ['password_confirmation'],
  })
