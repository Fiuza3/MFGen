import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function Tag({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

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
      <DecoracaoLateral escala={escala} />

      <CabecalhoTag tag={tag} escala={escala} />

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
        <Logo tamanho={escala.n(28)} corSigla={cores.accentForte} />
      </div>
    </div>
  );
}

function CabecalhoTag({ tag, escala }: { tag: string; escala: Escala }) {
  const { px } = escala;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: px(20) }}>
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

function DecoracaoLateral({ escala }: { escala: Escala }) {
  const { px } = escala;
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
