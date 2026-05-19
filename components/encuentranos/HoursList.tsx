'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { RESTAURANT, type DayKey } from '@/lib/data/restaurant';
import { cn } from '@/lib/utils/cn';

const DAY_INDEX_TO_KEY: Record<number, DayKey> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

export function HoursList() {
  const [today, setToday] = useState<DayKey | null>(null);

  useEffect(() => {
    const update = () => {
      setToday(DAY_INDEX_TO_KEY[new Date().getDay()] ?? null);
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div id="horarios">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
        Horarios
      </h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {RESTAURANT.hours.map((day) => {
          const isToday = day.day === today;
          return (
            <li
              key={day.day}
              className={cn(
                'flex items-center justify-between gap-4 rounded-md px-2 py-1 transition-colors',
                isToday && 'bg-turquoise-500/10',
              )}
            >
              <span className="flex items-center gap-2">
                {isToday ? (
                  <span aria-hidden className="h-2 w-2 rounded-full bg-turquoise-400 pulse-dot" />
                ) : (
                  <span aria-hidden className="h-2 w-2" />
                )}
                <span className={cn('font-medium', isToday ? 'text-turquoise-100' : 'text-stone-100')}>
                  {day.label}
                  {isToday ? <span className="ml-2 text-[10px] uppercase tracking-[0.24em] text-turquoise-300">hoy</span> : null}
                </span>
              </span>
              <span className={cn('font-mono tabular', isToday ? 'text-turquoise-200' : 'text-stone-300')}>
                {day.ranges.length === 0 ? 'Cerrado' : day.ranges.map(([a, b]) => `${a}–${b}`).join(' · ')}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-xs text-stone-400">
        <Clock className="h-3.5 w-3.5" />
        Festivos pueden variar. Llámanos si dudas.
      </p>
    </div>
  );
}
