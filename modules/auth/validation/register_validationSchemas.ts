import { z } from 'zod'

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .nonempty('First name is required')
      .regex(/^[A-Za-z\s'-]+$/, 'First name must contain only letters'),

    lastName: z
      .string()
      .nonempty('Last name is required')
      .regex(/^[A-Za-z\s'-]+$/, 'Last name must contain only letters'),

     email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),

   
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
    //   .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
  

    confirmPassword: z.string().nonempty('Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // highlight only confirmPassword
  })

export type SignupFormData = z.infer<typeof signupSchema>
