import { z } from 'zod';

export const ReservaSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida.'),
  hora: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida.'),
  comensales: z.coerce
    .number()
    .int('Tiene que ser un número entero.')
    .min(1, 'Al menos 1 comensal.')
    .max(12, 'Para más de 12, llámanos al 659 633 047.'),
  nombre: z.string().min(2, 'El nombre es muy corto.').max(80),
  telefono: z
    .string()
    .regex(/^[0-9+\s]{9,15}$/, 'Teléfono no válido.'),
  email: z.string().email('Email no válido.'),
  notas: z.string().max(500).optional().default(''),
  consent: z
    .union([z.literal('on'), z.literal(true), z.literal('true')])
    .transform(() => true),
  website: z.string().max(0).optional().default(''),
});

export type ReservaInput = z.infer<typeof ReservaSchema>;
