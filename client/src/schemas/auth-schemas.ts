import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password is too short (min 6).',
  }),
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name is too short (min 2).',
    }),
    lastName: z.string().min(2, {
      message: 'Last name is too short (min 2).',
    }),
    confirmPassword: z.string(),
  })
  .and(signInSchema)
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match.",
      });
    }
  });
