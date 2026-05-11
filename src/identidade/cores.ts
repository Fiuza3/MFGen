/**
 * Paleta da MF Desenvolvimento.
 * Mantenha em sincronia com os tokens declarados em src/app/globals.css.
 */
export const cores = {
  fundo: "#0A0A0B",
  superficie: "#111114",
  superficieElevada: "#17171B",
  borda: "#1F1F23",
  bordaForte: "#2A2A30",

  textoPrimario: "#FAFAFA",
  textoSecundario: "#A1A1AA",
  textoSutil: "#71717A",

  accent: "#10B981",
  accentForte: "#34D399",
  accentSutil: "#064E3B",

  alerta: "#F97316",
  erro: "#EF4444",
} as const;

export type ChaveCor = keyof typeof cores;
