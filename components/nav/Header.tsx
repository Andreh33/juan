'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/composed/Logo';
import { ButtonLink } from '@/components/primitives/ButtonLink';
import { AudioToggle } from './AudioToggle';
import { MobileDrawer } from './MobileDrawer';
import { NAV_ITEMS } from './nav-items';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 240) {
        if (y > lastY + 8) setHidden(true);
        else if (y < lastY - 8) setHidden(false);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[var(--z-sticky)] transition-[transform,background-color,backdrop-filter] duration-[320ms] ease-[var(--ease-out-quart)]',
          hidden ? '-translate-y-full' : 'translate-y-0',
          scrolled
            ? 'bg-[color:var(--color-bg-deep)]/65 backdrop-blur-xl backdrop-saturate-150 border-b border-[color:var(--color-border-subtle)]'
            : 'bg-transparent',
        )}
      >
        <div className="container-refugio flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="shrink-0" data-cursor="grow" aria-label="Inicio · El Refugio de A Cabana">
            <Logo />
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'link-underline transition-colors',
                        active ? 'text-turquoise-200' : 'text-stone-200 hover:text-[color:var(--color-text-primary)]',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <AudioToggle className="hidden md:inline-flex" />
            <ButtonLink
              href="/reservas"
              size="sm"
              magnetic
              className="hidden md:inline-flex"
              data-cursor="reserve"
              data-cursor-label="Reservar"
            >
              Reservar
            </ButtonLink>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={drawerOpen}
              data-cursor="grow"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-default)] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} pathname={pathname} />
    </>
  );
}
