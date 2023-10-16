import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name is too short (min 2).',
  }),
  lastName: z.string().min(2, {
    message: 'Last name is too short (min 2).',
  }),
});

export const editUserSchema = userNameSchema.partial();

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password is too short (min 6).',
  }),
});

export const signUpSchema = z
  .object({ confirmPassword: z.string() })
  .and(signInSchema)
  .and(userNameSchema)
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match.",
      });
    }
  });

export const userSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email(),
    role: z.union([z.literal('admin'), z.literal('user')]),
  })
  .and(userNameSchema);

export type UserType = z.infer<typeof userSchema>;
