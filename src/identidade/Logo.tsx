import type { CSSProperties } from "react";

import { cores } from "./cores";
import { familias, pesos } from "./tipografia";

type LogoProps = {
  tamanho?: number;
  cor?: string;
  corSigla?: string;
  compacto?: boolean;
  className?: string;
};

export function Logo({
  tamanho = 24,
  cor = cores.textoPrimario,
  corSigla,
  compacto = false,
  className,
}: LogoProps) {
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
      <span style={{ color: corSigla ?? cor }}>MF</span>
      {!compacto && <span aria-hidden>/</span>}
      <span aria-hidden>&gt;</span>
    </span>
  );
}
