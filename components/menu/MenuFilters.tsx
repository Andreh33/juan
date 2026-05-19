'use client';

import { Search, X } from 'lucide-react';
import { CATEGORIES, type DishCategory, type DishTag, TAG_LABELS } from '@/lib/data/menu';
import { cn } from '@/lib/utils/cn';

export interface MenuFilterState {
  category: DishCategory | 'todo';
  tags: ReadonlySet<DishTag>;
  query: string;
}

interface Props {
  state: MenuFilterState;
  onChange: (next: MenuFilterState) => void;
  totalCount: number;
}

const TOGGLEABLE_TAGS: DishTag[] = ['sin-gluten', 'picante', 'compartir', 'recomendado'];

export function MenuFilters({ state, onChange, totalCount }: Props) {
  const setCategory = (category: MenuFilterState['category']) =>
    onChange({ ...state, category });
  const toggleTag = (tag: DishTag) => {
    const next = new Set(state.tags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    onChange({ ...state, tags: next });
  };

  const hasFilters =
    state.category !== 'todo' || state.tags.size > 0 || state.query.length > 0;

  return (
    <div className="sticky top-[72px] z-[var(--z-sticky)] -mx-[var(--gutter)] border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-deep)]/90 backdrop-blur-xl">
      <div className="container-refugio flex flex-col gap-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-cursor="grow"
            onClick={() => setCategory('todo')}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
              state.category === 'todo'
                ? 'border-turquoise-400 bg-turquoise-500/10 text-turquoise-200'
                : 'border-[color:var(--color-border-default)] text-stone-200 hover:border-turquoise-400/60',
            )}
          >
            Todo
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-cursor="grow"
              onClick={() => setCategory(cat.id)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                state.category === cat.id
                  ? 'border-turquoise-400 bg-turquoise-500/10 text-turquoise-200'
                  : 'border-[color:var(--color-border-default)] text-stone-200 hover:border-turquoise-400/60',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {TOGGLEABLE_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                data-cursor="grow"
                aria-pressed={state.tags.has(tag)}
                onClick={() => toggleTag(tag)}
                className={cn(
                  'rounded-full border px-3 py-1 text-[11px] font-medium transition-colors',
                  state.tags.has(tag)
                    ? 'border-wood-300 bg-wood-700/40 text-wood-100'
                    : 'border-[color:var(--color-border-default)] text-stone-300 hover:border-wood-300/60',
                )}
              >
                {TAG_LABELS[tag]}
              </button>
            ))}
          </div>
          <label className="ml-auto flex items-center gap-2 rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-base)] px-3 py-1.5 focus-within:border-turquoise-400">
            <Search className="h-3.5 w-3.5 text-stone-300" aria-hidden />
            <span className="sr-only">Buscar plato</span>
            <input
              type="search"
              value={state.query}
              onChange={(e) => onChange({ ...state, query: e.target.value })}
              placeholder="Buscar plato"
              className="w-40 bg-transparent text-xs text-stone-100 placeholder:text-stone-400 focus:outline-none"
            />
          </label>
          {hasFilters ? (
            <button
              type="button"
              data-cursor="grow"
              onClick={() => onChange({ category: 'todo', tags: new Set(), query: '' })}
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border-default)] px-3 py-1.5 text-[11px] text-stone-300 hover:border-ember-500 hover:text-ember-500"
            >
              <X className="h-3 w-3" />
              Limpiar
            </button>
          ) : null}
          <span className="font-mono text-[11px] tabular tracking-wide text-stone-400">
            {totalCount} {totalCount === 1 ? 'plato' : 'platos'}
          </span>
        </div>
      </div>
    </div>
  );
}
