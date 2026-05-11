import type { Dimensao } from "@/recursos/proporcao/tipos";

// Cap em 1: nunca amplia o preview, só reduz quando o canvas real é
// maior que o espaço disponível.
export function calcularEscala(
  disponivel: { largura: number; altura: number },
  alvo: Dimensao,
  margem = 24,
): number {
  if (alvo.largura <= 0 || alvo.altura <= 0) return 1;

  const larguraUtil = Math.max(0, disponivel.largura - margem * 2);
  const alturaUtil = Math.max(0, disponivel.altura - margem * 2);

  return Math.min(1, larguraUtil / alvo.largura, alturaUtil / alvo.altura);
}
