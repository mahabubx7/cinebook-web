import { LoginRequest } from '@redux/auth'
import { ZodType, z } from 'zod'

export const loginFormSchema: ZodType<LoginRequest> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
