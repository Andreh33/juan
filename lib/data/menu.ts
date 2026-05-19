/**
 * Carta — source of truth de los platos del restaurante.
 * Cliente edita este archivo para actualizar precios o descripciones.
 */

export type DishCategory =
  | 'para-picar'
  | 'mar'
  | 'galicia'
  | 'combinados'
  | 'postres';

export type DishTag =
  | 'sin-gluten'
  | 'picante'
  | 'recomendado'
  | 'temporada'
  | 'compartir';

export type Allergen =
  | 'gluten'
  | 'huevo'
  | 'lacteo'
  | 'pescado'
  | 'crustaceo'
  | 'molusco'
  | 'sulfito';

export interface Dish {
  id: string;
  name: string;
  galician?: string;
  description: string;
  longDescription?: string;
  price: number;
  category: DishCategory;
  tags: ReadonlyArray<DishTag>;
  allergens: ReadonlyArray<Allergen>;
  pairing?: string;
  /** Color base para fallback / blur (hex). */
  hue: string;
  /** Foto del plato (relativa a /public). */
  image: string;
  /** alt text accesible. */
  alt: string;
}

export const CATEGORIES: ReadonlyArray<{ id: DishCategory; label: string }> = [
  { id: 'para-picar', label: 'Para picar' },
  { id: 'mar', label: 'De cuchara y mar' },
  { id: 'galicia', label: 'Galicia en grande' },
  { id: 'combinados', label: 'Combinados' },
  { id: 'postres', label: 'Postres' },
] as const;

export const TAG_LABELS: Record<DishTag, string> = {
  'sin-gluten': 'Sin gluten',
  picante: 'Picante',
  recomendado: 'Recomendado',
  temporada: 'Temporada',
  compartir: 'Para compartir',
};

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: 'Gluten',
  huevo: 'Huevo',
  lacteo: 'Lácteo',
  pescado: 'Pescado',
  crustaceo: 'Crustáceo',
  molusco: 'Molusco',
  sulfito: 'Sulfitos',
};

export const MENU: ReadonlyArray<Dish> = [
  {
    id: 'pulpo-a-la-gallega',
    name: 'Pulpo a la gallega',
    galician: 'Polbo á feira',
    description:
      'Polbo á feira como mandan los cánones. Cocido al momento, cachelos, pimentón y AOVE.',
    longDescription:
      'Cocido en el momento, cachelos por debajo, pimentón de la Vera por encima, sal gorda y un buen AOVE. Punto. Con su vaso de tinto del país.',
    price: 18.5,
    category: 'mar',
    tags: ['recomendado', 'sin-gluten', 'compartir'],
    allergens: ['molusco'],
    pairing: 'Tinto del país, joven y fresco.',
    hue: '#A8854F',
    image: '/images/dishes/pulpo-a-la-gallega.jpg',
    alt: 'Plato hondo con marisco, arroz y caldo de pimentón sobre madera rústica',
  },
  {
    id: 'raxo-al-queso',
    name: 'Raxo al queso',
    description:
      'Taquitos de lomo macerado fritos al momento, rematados con queso fundido. Pan a mano.',
    price: 13.9,
    category: 'galicia',
    tags: ['recomendado'],
    allergens: ['lacteo'],
    pairing: 'Albariño con cuerpo o Mencía joven.',
    hue: '#D9582A',
    image: '/images/dishes/raxo-al-queso.jpg',
    alt: 'Carne de cerdo lacada brillante sobre tabla, con tomates y pepinillo al lado',
  },
  {
    id: 'zorza',
    name: 'Zorza',
    description: 'Lomo de cerdo en su adobo lento: pimentón, ajo, orégano. Picantito justo.',
    price: 11.5,
    category: 'galicia',
    tags: ['picante', 'recomendado'],
    allergens: [],
    pairing: 'Tinto joven de la Ribeira Sacra.',
    hue: '#B43F18',
    image: '/images/dishes/zorza.jpg',
    alt: 'Guiso anaranjado de la casa con hierbas frescas y limón',
  },
  {
    id: 'ensalada-campera',
    name: 'Ensalada campera',
    description:
      'Patata cocida, atún, huevo, cebolla, pimiento, aceituna y AOVE. La de toda la vida.',
    price: 9.5,
    category: 'para-picar',
    tags: ['compartir', 'sin-gluten'],
    allergens: ['huevo', 'pescado'],
    hue: '#4ED1C2',
    image: '/images/dishes/ensalada-campera.jpg',
    alt: 'Cuenco con ensalada de patata, huevo, tomate, maíz y verduras frescas',
  },
  {
    id: 'tortilla-de-patata',
    name: 'Tortilla de patata',
    description: 'De patata, hecha al momento. La pides jugosa o cuajada — tú mandas.',
    price: 8.5,
    category: 'para-picar',
    tags: ['recomendado', 'compartir'],
    allergens: ['huevo'],
    hue: '#C8AA82',
    image: '/images/dishes/tortilla-de-patata.jpg',
    alt: 'Plato blanco con porción dorada de tortilla, pan al lado y copa de vino',
  },
  {
    id: 'pinchos-variados',
    name: 'Pinchos variados',
    description: 'Para una tapa rápida en la barra. Pregunta lo que hay hoy.',
    price: 2.2,
    category: 'para-picar',
    tags: ['temporada'],
    allergens: ['gluten'],
    hue: '#8A6730',
    image: '/images/dishes/pinchos-variados.jpg',
    alt: 'Pinchos calientes sobre tabla con guarnición casera',
  },
  {
    id: 'bocadillos-calientes',
    name: 'Bocadillos calientes',
    description: 'Para llevar al puerto o quedarte. Pregunta los rellenos del día.',
    price: 5.5,
    category: 'para-picar',
    tags: [],
    allergens: ['gluten'],
    hue: '#6E4F1F',
    image: '/images/dishes/bocadillos-calientes.jpg',
    alt: 'Bocadillo tostado a la plancha con relleno fundido y salsas para mojar',
  },
  {
    id: 'mariscos-temporada',
    name: 'Mariscos de temporada',
    description: 'Lo que entra de la lonja de Ferrol. Pregunta disponibilidad y precio.',
    price: 0,
    category: 'mar',
    tags: ['temporada', 'compartir'],
    allergens: ['crustaceo', 'molusco'],
    pairing: 'Albariño Rías Baixas.',
    hue: '#1FBDAB',
    image: '/images/dishes/mariscos-temporada.jpg',
    alt: 'Pieza de pescado a la plancha con tartar de verduras sobre cama de espinacas',
  },
  {
    id: 'combinado-clasico',
    name: 'Combinado clásico',
    description:
      'Dos huevos fritos con su puntilla, jamón serrano, patatas y pan crujiente. Sin trampa.',
    price: 10.9,
    category: 'combinados',
    tags: ['recomendado'],
    allergens: ['gluten', 'huevo'],
    hue: '#E4D3B8',
    image: '/images/dishes/combinado-clasico.jpg',
    alt: 'Tostada con huevo frito perfectamente cuajado, yema brillante, pimienta y especias',
  },
  {
    id: 'hamburguesa-casa',
    name: 'Hamburguesa de la casa',
    description: 'Carne picada nuestra, pan brioche, lechuga, tomate, cebolla pochada y queso.',
    price: 12.5,
    category: 'combinados',
    tags: [],
    allergens: ['gluten', 'lacteo', 'huevo'],
    hue: '#523913',
    image: '/images/dishes/hamburguesa-casa.jpg',
    alt: 'Hamburguesa con patatas fritas sobre tabla de madera, fondo oscuro',
  },
  {
    id: 'helados-artesanos',
    name: 'Helados artesanos',
    description: 'Varios sabores rotativos. El cierre dulce del xantar.',
    price: 4.5,
    category: 'postres',
    tags: [],
    allergens: ['lacteo'],
    hue: '#BFF1EA',
    image: '/images/dishes/helados-artesanos.jpg',
    alt: 'Polos artesanos de fruta del bosque apilados con frambuesas frescas',
  },
] as const;

export function getDishesByCategory(category: DishCategory): ReadonlyArray<Dish> {
  return MENU.filter((d) => d.category === category);
}

export function getDishById(id: string): Dish | undefined {
  return MENU.find((d) => d.id === id);
}
