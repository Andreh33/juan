export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: '/', label: 'Inicio' },
  { href: '/carta', label: 'Carta' },
  { href: '/nuestra-historia', label: 'Historia' },
  { href: '/reservas', label: 'Reservas' },
  { href: '/encuentranos', label: 'Encuéntranos' },
] as const;
