/**
 * Escala tipográfica e pesos usados pelos templates.
 * As famílias vêm das variáveis CSS definidas em src/app/layout.tsx.
 */
export const familias = {
  sans: "var(--fonte-sans), system-ui, -apple-system, sans-serif",
  mono: "var(--fonte-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const pesos = {
  regular: 400,
  medio: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Tamanhos em px pensados para canvas 1080 (templates 1:1).
 * Os templates aplicam um fator de escala próprio quando a dimensão muda.
 */
export const tamanhos = {
  microtag: 14,
  legenda: 18,
  corpo: 24,
  destaque: 36,
  subtitulo: 48,
  titulo: 96,
  herois: 144,
} as const;

export type ChaveFamilia = keyof typeof familias;
export type ChavePeso = keyof typeof pesos;
export type ChaveTamanho = keyof typeof tamanhos;
