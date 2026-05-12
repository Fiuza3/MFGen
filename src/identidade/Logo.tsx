import type { CSSProperties } from "react";

import { cores } from "./cores";
import { familias, pesos } from "./tipografia";

type LogoProps = {
  tamanho?: number;
  corColchetes?: string;
  corSigla?: string;
  corBarra?: string;
  compacto?: boolean;
  className?: string;
};

// Padrão visual igual ao do site: colchetes em accent ciano, sigla em
// branco e barra em cinza. Cada cor pode ser sobrescrita por prop.
export function Logo({
  tamanho = 24,
  corColchetes = cores.accent,
  corSigla = cores.textoPrimario,
  corBarra = cores.textoSecundario,
  compacto = false,
  className,
}: LogoProps) {
  const estilo: CSSProperties = {
    fontFamily: familias.mono,
    fontWeight: pesos.semibold,
    fontSize: `${tamanho}px`,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    display: "inline-flex",
    alignItems: "center",
  };

  return (
    <span style={estilo} className={className} aria-label="MF Desenvolvimento">
      <span aria-hidden style={{ color: corColchetes }}>
        &lt;
      </span>
      <span style={{ color: corSigla }}>MF</span>
      {!compacto && (
        <span aria-hidden style={{ color: corBarra }}>
          /
        </span>
      )}
      <span aria-hidden style={{ color: corColchetes }}>
        &gt;
      </span>
    </span>
  );
}
