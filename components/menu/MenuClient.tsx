'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MENU, type Dish } from '@/lib/data/menu';
import { DishCard } from './DishCard';
import { DishModal } from './DishModal';
import { MenuFilters, type MenuFilterState } from './MenuFilters';

export function MenuClient() {
  const [filter, setFilter] = useState<MenuFilterState>({
    category: 'todo',
    tags: new Set(),
    query: '',
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MENU.filter((dish) => {
      if (filter.category !== 'todo' && dish.category !== filter.category) return false;
      if (filter.tags.size > 0) {
        for (const t of filter.tags) {
          if (!dish.tags.includes(t)) return false;
        }
      }
      if (filter.query.trim()) {
        const q = filter.query.trim().toLowerCase();
        const haystack = [dish.name, dish.galician ?? '', dish.description].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filter]);

  const activeDish: Dish | null = activeId
    ? MENU.find((d) => d.id === activeId) ?? null
    : null;

  return (
    <>
      <MenuFilters state={filter} onChange={setFilter} totalCount={filtered.length} />

      <div className="container-refugio pt-10 pb-[var(--section-y)]">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-lg)] border border-dashed border-[color:var(--color-border-default)] p-12 text-center"
          >
            <p className="font-display text-2xl italic text-stone-200">
              No hay platos con esos filtros.
            </p>
            <p className="mt-2 text-sm text-stone-400">Prueba a quitar uno.</p>
            <button
              type="button"
              onClick={() => setFilter({ category: 'todo', tags: new Set(), query: '' })}
              className="mt-6 rounded-full border border-[color:var(--color-border-strong)] px-4 py-2 text-sm hover:border-turquoise-400 hover:text-turquoise-200"
            >
              Limpiar filtros
            </button>
          </motion.div>
        ) : (
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            <AnimatePresence>
              {filtered.map((dish) => (
                <motion.li
                  key={dish.id}
                  id={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <DishCard dish={dish} onOpen={(id) => setActiveId(id)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      <DishModal dish={activeDish} onClose={() => setActiveId(null)} />
    </>
  );
}
