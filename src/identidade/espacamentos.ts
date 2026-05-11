/**
 * Escala de espaçamentos em px para uso dentro dos templates.
 * Pensado para canvas 1080 — templates escalam proporcionalmente.
 */
export const espacamentos = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
  xxl: 96,
} as const;

export const raios = {
  pequeno: 8,
  medio: 16,
  grande: 24,
} as const;

export const bordas = {
  fina: 1,
  media: 2,
  grossa: 3,
} as const;

export type ChaveEspacamento = keyof typeof espacamentos;
export type ChaveRaio = keyof typeof raios;
