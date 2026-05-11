import type { Dimensao } from "@/recursos/proporcao/tipos";

/**
 * Calcula o fator de escala visual para fazer um canvas de tamanho real
 * caber dentro do espaço disponível, preservando a proporção. O valor é
 * limitado em 1 — nunca aumentamos visualmente, só reduzimos.
 */
export function calcularEscala(
  disponivel: { largura: number; altura: number },
  alvo: Dimensao,
  margem = 24,
): number {
  if (alvo.largura <= 0 || alvo.altura <= 0) return 1;

  const larguraUtil = Math.max(0, disponivel.largura - margem * 2);
  const alturaUtil = Math.max(0, disponivel.altura - margem * 2);

  const escalaPorLargura = larguraUtil / alvo.largura;
  const escalaPorAltura = alturaUtil / alvo.altura;

  return Math.min(1, escalaPorLargura, escalaPorAltura);
}
