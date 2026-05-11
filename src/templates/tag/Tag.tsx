import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import type { PropsTemplate } from "../tipos";

/**
 * Composição de destaque: tag em capitulares no topo, título em
 * tamanho enorme dominando o centro, subtítulo discreto e logo no pé.
 */
export function Tag({ dimensao, conteudo }: PropsTemplate) {
  const fator = Math.min(dimensao.largura, dimensao.altura) / 1080;
  const px = (valor: number) => `${valor * fator}px`;

  const tag = conteudo.tag.trim() || "destaque";
  const titulo = conteudo.titulo.trim() || "Um título que merece tela inteira";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "subtítulo opcional acompanha o destaque sem competir com ele.";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: cores.fundo,
        padding: px(112),
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: familias.sans,
        color: cores.textoPrimario,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DecoracaoLateral px={px} />

      <CabecalhoTag tag={tag} px={px} />

      <h1
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontWeight: pesos.bold,
          fontSize: px(132),
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          color: cores.textoPrimario,
          maxWidth: "92%",
        }}
      >
        {titulo}
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: px(40),
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: familias.sans,
            fontSize: px(28),
            lineHeight: 1.45,
            color: cores.textoSecundario,
            maxWidth: "60%",
          }}
        >
          {subtitulo}
        </p>
        <Logo
          tamanho={Number(px(28).replace("px", ""))}
          corSigla={cores.accentForte}
        />
      </div>
    </div>
  );
}

function CabecalhoTag({
  tag,
  px,
}: {
  tag: string;
  px: (valor: number) => string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: px(20),
      }}
    >
      <span
        aria-hidden
        style={{
          width: px(48),
          height: px(2),
          background: cores.accentForte,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontFamily: familias.mono,
          fontWeight: pesos.semibold,
          fontSize: px(24),
          letterSpacing: "0.32em",
          color: cores.accentForte,
          textTransform: "uppercase",
        }}
      >
        {tag}
      </span>
    </div>
  );
}

function DecoracaoLateral({ px }: { px: (valor: number) => string }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        right: px(64),
        top: px(64),
        bottom: px(64),
        width: px(2),
        background: `linear-gradient(to bottom, transparent, ${cores.borda}, transparent)`,
      }}
    />
  );
}
