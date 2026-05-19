'use server';

import { ReservaSchema } from '@/lib/reservations/schema';

export interface ReservaState {
  status: 'idle' | 'success' | 'error';
  ref?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

function generateRef(): string {
  // 8 chars hex, suficiente para confirmaciones manuales.
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export async function crearReserva(
  _prev: ReservaState,
  formData: FormData,
): Promise<ReservaState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = ReservaSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      errors: parsed.error.flatten().fieldErrors,
      message: 'Revisa los datos del formulario.',
    };
  }

  // Honeypot: respondemos OK silencioso.
  if (parsed.data.website) {
    return { status: 'success', ref: 'SILENT' };
  }

  const ref = generateRef();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVAS_EMAIL_TO;

  if (apiKey && to) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Reservas <reservas@elrefugiodeacabana.com>',
          to,
          reply_to: parsed.data.email,
          subject: `Nueva reserva · ${parsed.data.fecha} ${parsed.data.hora} · ${parsed.data.comensales}p`,
          text: renderEmail(parsed.data, ref),
        }),
      });
    } catch (err) {
      console.error('Resend send failed', err);
      // No bloqueamos la confirmación al cliente: la reserva entró aunque el email falle.
      // El operador puede recuperarla del log.
    }
  } else {
    console.info('[reserva]', ref, parsed.data);
  }

  return { status: 'success', ref };
}

function renderEmail(d: { fecha: string; hora: string; comensales: number; nombre: string; telefono: string; email: string; notas?: string }, ref: string) {
  return `Nueva reserva — Ref ${ref}\n\nFecha: ${d.fecha}\nHora: ${d.hora}\nComensales: ${d.comensales}\nNombre: ${d.nombre}\nTeléfono: ${d.telefono}\nEmail: ${d.email}\n\nNotas:\n${d.notas || '(sin notas)'}\n\n— Enviado desde elrefugiodeacabana.com`;
}
