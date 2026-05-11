import type { CSSProperties } from "react";

import { cores } from "./cores";
import { familias, pesos } from "./tipografia";

type LogoProps = {
  /** Tamanho da fonte em px. */
  tamanho?: number;
  /** Cor do contorno `<` `/>` e da sigla. */
  cor?: string;
  /** Cor de destaque opcional para a sigla (sobrepõe `cor`). */
  corSigla?: string;
  /** Variante compacta (sem o "/" final) usada em ícones reduzidos. */
  compacto?: boolean;
  className?: string;
};

/**
 * Marca-tipo da MF Desenvolvimento, em formato de tag de markup.
 * Pensada para ser usada inline dentro de templates e do header do app.
 */
export function Logo({
  tamanho = 24,
  cor = cores.textoPrimario,
  corSigla,
  compacto = false,
  className,
}: LogoProps) {
  const corFinalSigla = corSigla ?? cor;

  const estilo: CSSProperties = {
    fontFamily: familias.mono,
    fontWeight: pesos.semibold,
    fontSize: `${tamanho}px`,
    lineHeight: 1,
    color: cor,
    letterSpacing: "-0.02em",
    display: "inline-flex",
    alignItems: "center",
  };

  return (
    <span style={estilo} className={className} aria-label="MF Desenvolvimento">
      <span aria-hidden>&lt;</span>
      <span style={{ color: corFinalSigla }}>MF</span>
      {!compacto && <span aria-hidden>/</span>}
      <span aria-hidden>&gt;</span>
    </span>
  );
}
