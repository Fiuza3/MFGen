import type { Proporcao } from "./tipos";

export const proporcoes: readonly Proporcao[] = [
  {
    id: "1-1",
    rotulo: "1:1",
    descricao: "Post quadrado",
    dimensaoPadrao: { largura: 1080, altura: 1080 },
  },
  {
    id: "9-16",
    rotulo: "9:16",
    descricao: "Story, Reels, Shorts",
    dimensaoPadrao: { largura: 1080, altura: 1920 },
  },
  {
    id: "16-9",
    rotulo: "16:9",
    descricao: "Thumbnail, banner, capa",
    dimensaoPadrao: { largura: 1920, altura: 1080 },
  },
  {
    id: "4-3",
    rotulo: "4:3",
    descricao: "Apresentação clássica",
    dimensaoPadrao: { largura: 1440, altura: 1080 },
  },
  {
    id: "3-4",
    rotulo: "3:4",
    descricao: "Cartão vertical",
    dimensaoPadrao: { largura: 1080, altura: 1440 },
  },
  {
    id: "feed-trio",
    rotulo: "3:1",
    descricao: "Trio de posts sincronizados no feed",
    dimensaoPadrao: { largura: 3240, altura: 1080 },
  },
] as const;

export const PROPORCAO_PADRAO = proporcoes[0];

export const LIMITE_DIMENSAO_MINIMA = 240;
export const LIMITE_DIMENSAO_MAXIMA = 4096;

export function encontrarProporcao(id: string): Proporcao | undefined {
  return proporcoes.find((p) => p.id === id);
}
