import { z } from 'zod';

export const newPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: 'A senha atual deve ser informada' }),
    password: z
      .string()
      .min(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'A nova senha e a confirmação não coincidem',
    path: ['confirmPassword'],
  });

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
