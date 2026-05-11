import type { Dimensao } from "@/recursos/proporcao/tipos";

const CANVAS_REFERENCIA = 1080;

export type Escala = {
  fator: number;
  n: (valor: number) => number;
  px: (valor: number) => string;
};

// Escala interna dos templates: tudo é desenhado como se o menor lado
// fosse 1080. Em proporções esticadas, o conteúdo se mantém visualmente
// equivalente em vez de inflar com a largura/altura.
export function criarEscala(dimensao: Dimensao): Escala {
  const fator = Math.min(dimensao.largura, dimensao.altura) / CANVAS_REFERENCIA;
  return {
    fator,
    n: (valor) => valor * fator,
    px: (valor) => `${valor * fator}px`,
  };
}
