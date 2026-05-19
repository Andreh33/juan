'use client';

import { useActionState, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Loader2, Minus, Plus } from 'lucide-react';
import { crearReserva, type ReservaState } from '@/app/reservas/actions';
import { RESTAURANT } from '@/lib/data/restaurant';
import { cn } from '@/lib/utils/cn';

const INITIAL: ReservaState = { status: 'idle' };

interface SlotsByDay {
  date: string;
  label: string;
  slots: string[];
}

function nextDays(count: number): SlotsByDay[] {
  const out: SlotsByDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    const map: Record<number, (typeof RESTAURANT.hours)[number]> = {
      0: RESTAURANT.hours[6]!,
      1: RESTAURANT.hours[0]!,
      2: RESTAURANT.hours[1]!,
      3: RESTAURANT.hours[2]!,
      4: RESTAURANT.hours[3]!,
      5: RESTAURANT.hours[4]!,
      6: RESTAURANT.hours[5]!,
    };
    const day = map[dow];
    if (!day || day.ranges.length === 0) continue;
    const slots: string[] = [];
    for (const [start, end] of day.ranges) {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      const startMin = (sh ?? 0) * 60 + (sm ?? 0);
      const endMin = (eh ?? 0) * 60 + (em ?? 0) - 60;
      for (let m = startMin; m <= endMin; m += 30) {
        const h = Math.floor(m / 60).toString().padStart(2, '0');
        const mm = (m % 60).toString().padStart(2, '0');
        slots.push(`${h}:${mm}`);
      }
    }
    out.push({
      date: d.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }).format(d),
      slots,
    });
  }
  return out;
}

export function ReservaForm() {
  const [step, setStep] = useState(0);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [comensales, setComensales] = useState(2);
  const [state, formAction, pending] = useActionState(crearReserva, INITIAL);

  const days = useMemo(() => nextDays(21), []);
  const activeDay = days.find((d) => d.date === fecha);

  if (state.status === 'success') {
    return <SuccessPanel reference={state.ref ?? ''} fecha={fecha} hora={hora} comensales={comensales} />;
  }

  const canStep1 = Boolean(fecha && hora);
  const canStep2 = comensales >= 1 && comensales <= 12;

  return (
    <form action={formAction} className="space-y-10">
      <ProgressBar step={step} />

      <input type="hidden" name="fecha" value={fecha} />
      <input type="hidden" name="hora" value={hora} />
      <input type="hidden" name="comensales" value={comensales} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        className="sr-only h-0 w-0 opacity-0"
      />

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <Step key="step-0">
            <StepHeader index="01" title="¿Cuándo te esperamos?" />
            <div className="space-y-6">
              <fieldset>
                <legend className="font-mono text-[11px] uppercase tracking-[0.24em] text-stone-300">
                  Día
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7">
                  {days.slice(0, 14).map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => {
                        setFecha(d.date);
                        setHora('');
                      }}
                      data-cursor="grow"
                      className={cn(
                        'rounded-[var(--radius-md)] border px-2 py-3 text-center text-xs transition-colors',
                        fecha === d.date
                          ? 'border-turquoise-400 bg-turquoise-500/15 text-turquoise-200'
                          : 'border-[color:var(--color-border-default)] hover:border-turquoise-400/60',
                      )}
                    >
                      <span className="block capitalize">{d.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {activeDay ? (
                <fieldset>
                  <legend className="font-mono text-[11px] uppercase tracking-[0.24em] text-stone-300">
                    Hora
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeDay.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        data-cursor="grow"
                        onClick={() => setHora(slot)}
                        className={cn(
                          'rounded-full border px-3.5 py-1.5 text-sm font-mono tabular transition-colors',
                          hora === slot
                            ? 'border-turquoise-400 bg-turquoise-500/15 text-turquoise-200'
                            : 'border-[color:var(--color-border-default)] hover:border-turquoise-400/60',
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <p className="text-sm text-stone-400">Selecciona un día para ver horarios.</p>
              )}
            </div>
          </Step>
        ) : null}

        {step === 1 ? (
          <Step key="step-1">
            <StepHeader index="02" title="¿Cuántos venís?" />
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setComensales((v) => Math.max(1, v - 1))}
                aria-label="Restar comensal"
                className="grid h-14 w-14 place-items-center rounded-full border border-[color:var(--color-border-strong)] hover:border-turquoise-400"
              >
                <Minus className="h-5 w-5" />
              </button>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[length:var(--fs-display-lg)] tabular leading-none">
                  {comensales}
                </span>
                <span className="text-sm text-stone-300">
                  {comensales === 1 ? 'comensal' : 'comensales'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setComensales((v) => Math.min(12, v + 1))}
                aria-label="Sumar comensal"
                className="grid h-14 w-14 place-items-center rounded-full border border-[color:var(--color-border-strong)] hover:border-turquoise-400"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {comensales > 8 ? (
              <p className="rounded-[var(--radius-md)] border border-[color:var(--color-ember-600)]/40 bg-[color:var(--color-ember-600)]/15 p-4 text-sm text-[color:var(--color-ember-500)]">
                Para grupos grandes, prefiere llamarnos al{' '}
                <a href={RESTAURANT.phone.tel} className="underline">
                  {RESTAURANT.phone.display}
                </a>{' '}
                para confirmar mesa.
              </p>
            ) : null}
          </Step>
        ) : null}

        {step === 2 ? (
          <Step key="step-2">
            <StepHeader index="03" title="Tus datos" />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Nombre" name="nombre" autoComplete="name" required errors={state.errors?.nombre} />
              <FormField label="Teléfono" name="telefono" type="tel" autoComplete="tel" required errors={state.errors?.telefono} />
              <FormField label="Email" name="email" type="email" autoComplete="email" required className="sm:col-span-2" errors={state.errors?.email} />
              <FormField label="Notas (alergias, ocasión...)" name="notas" textarea className="sm:col-span-2" />
            </div>
            <label className="mt-4 flex items-start gap-3 text-xs text-stone-300">
              <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-turquoise-500" />
              <span>
                He leído y acepto la{' '}
                <a href="/privacidad" className="link-underline">política de privacidad</a>.
              </span>
            </label>
            {state.status === 'error' ? (
              <p className="rounded-[var(--radius-md)] border border-[color:var(--color-ember-600)]/40 bg-[color:var(--color-ember-600)]/15 p-3 text-sm text-[color:var(--color-ember-500)]">
                {state.message}
              </p>
            ) : null}
          </Step>
        ) : null}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-default)] px-4 py-2 text-sm disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </button>

        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(2, s + 1))}
            disabled={(step === 0 && !canStep1) || (step === 1 && !canStep2)}
            className="inline-flex items-center gap-2 rounded-full bg-turquoise-500 px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-on-turq)] disabled:opacity-40 hover:bg-turquoise-400"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-turquoise-500 px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-on-turq)] disabled:opacity-50 hover:bg-turquoise-400"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Confirmar reserva
          </button>
        )}
      </div>
    </form>
  );
}

function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / 3) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-stone-300">
        <span>Paso {step + 1} de 3</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-px w-full overflow-hidden bg-[color:var(--color-border-default)]">
        <motion.div
          className="h-full bg-turquoise-400"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}

function StepHeader({ index, title }: { index: string; title: string }) {
  return (
    <header>
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">· {index}</p>
      <h2 className="mt-2 font-display text-[length:var(--fs-h2)] leading-tight">{title}</h2>
    </header>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  textarea?: boolean;
  errors?: string[];
}

function FormField({ label, name, type = 'text', autoComplete, required, className, textarea, errors }: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <label htmlFor={id} className={cn('block', className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-300">
        {label}
        {required ? <span aria-hidden className="ml-1 text-turquoise-300">·</span> : null}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          aria-describedby={errors ? errorId : undefined}
          className="mt-2 w-full rounded-[var(--radius-md)] border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-hollow)] px-4 py-3 text-sm focus:border-turquoise-400 focus:outline-none"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          aria-describedby={errors ? errorId : undefined}
          className="mt-2 w-full rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-hollow)] px-4 py-3 text-sm focus:border-turquoise-400 focus:outline-none"
        />
      )}
      {errors?.length ? (
        <p id={errorId} className="mt-1 text-xs text-[color:var(--color-ember-500)]">
          {errors[0]}
        </p>
      ) : null}
    </label>
  );
}

function SuccessPanel({
  reference,
  fecha,
  hora,
  comensales,
}: {
  reference: string;
  fecha: string;
  hora: string;
  comensales: number;
}) {
  const icsDataUri = useMemo(() => {
    const [y, m, d] = fecha.split('-').map(Number);
    const [hh, mm] = hora.split(':').map(Number);
    if (!y || !m || !d || hh == null || mm == null) return '';
    const start = new Date(Date.UTC(y, m - 1, d, hh - 2, mm)); // CET/CEST -2 aprox
    const end = new Date(start.getTime() + 90 * 60 * 1000);
    const fmt = (date: Date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//El Refugio de A Cabana//Reservas//ES',
      'BEGIN:VEVENT',
      `UID:${reference}@elrefugiodeacabana.com`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Reserva · El Refugio de A Cabana (${comensales}p)`,
      `LOCATION:${RESTAURANT.address.full}`,
      `DESCRIPTION:Referencia ${reference}. Teléfono ${RESTAURANT.phone.display}.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    return `data:text/calendar;charset=utf-8;base64,${typeof Buffer !== 'undefined' ? Buffer.from(ics).toString('base64') : btoa(ics)}`;
  }, [reference, fecha, hora, comensales]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[var(--radius-xl)] border border-turquoise-700/40 bg-turquoise-900/20 p-8 md:p-12"
      aria-live="polite"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-500 text-[color:var(--color-text-on-turq)]">
        <Check className="h-6 w-6" />
      </span>
      <h2 className="mt-6 font-display text-[length:var(--fs-display-lg)] leading-tight">
        Reserva anotada.
      </h2>
      <p className="mt-4 max-w-xl text-stone-200">
        Te esperamos el <strong>{fecha}</strong> a las <strong>{hora}</strong>, mesa para{' '}
        <strong>{comensales}</strong>. Si necesitas cambiar algo, llámanos al{' '}
        <a href={RESTAURANT.phone.tel} className="link-underline">
          {RESTAURANT.phone.display}
        </a>.
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-stone-300">
        Referencia · <span className="tabular text-turquoise-200">{reference}</span>
      </p>
      {icsDataUri ? (
        <a
          href={icsDataUri}
          download={`reserva-${reference}.ics`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-turquoise-500 px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-on-turq)] hover:bg-turquoise-400"
        >
          Añadir al calendario
        </a>
      ) : null}
    </motion.div>
  );
}
