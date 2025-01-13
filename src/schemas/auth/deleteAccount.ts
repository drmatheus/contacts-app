import { z } from 'zod';

export const deleteAccountSchema = z.object({
  password: z.string().min(1, { message: 'É necessário confirmar sua senha' }),
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
