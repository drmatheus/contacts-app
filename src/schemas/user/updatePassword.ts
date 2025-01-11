import { z } from 'zod';

const updatePasswordSchema = z
  .object({
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
    oldPassword: z.string().min(1, 'A senha antiga deve ser informada'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export default updatePasswordSchema;

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
