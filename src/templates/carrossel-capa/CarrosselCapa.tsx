import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

const TOTAL_SLIDES_PADRAO = 6;

export function CarrosselCapa({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const tag = conteudo.tag.trim() || "guia rápido";
  const titulo = conteudo.titulo.trim() || "6 sinais de que seu site precisa de uma refeita";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "Antes de gastar com tráfego pago, garanta que seu site converte.";
  const cta = conteudo.cta.trim() || "arrasta";
  const contato = conteudo.contato.trim() || "@mfdesenvolvimento";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: cores.fundo,
        padding: px(96),
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
      <Brilho escala={escala} />

      <Cabecalho tag={tag} escala={escala} />

      <Centro titulo={titulo} subtitulo={subtitulo} escala={escala} />

      <Rodape cta={cta} contato={contato} escala={escala} />
    </div>
  );
}

function Brilho({ escala }: { escala: Escala }) {
  const { px } = escala;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        bottom: px(-200),
        right: px(-200),
        width: px(700),
        height: px(700),
        borderRadius: "50%",
        background: cores.accent,
        opacity: 0.08,
        filter: `blur(${px(140)})`,
        pointerEvents: "none",
      }}
    />
  );
}

function Cabecalho({ tag, escala }: { tag: string; escala: Escala }) {
  const { px } = escala;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: px(16) }}>
        <span
          aria-hidden
          style={{
            width: px(32),
            height: px(2),
            background: cores.accent,
          }}
        />
        <span
          style={{
            fontFamily: familias.mono,
            fontWeight: pesos.semibold,
            fontSize: px(22),
            letterSpacing: "0.28em",
            color: cores.accent,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      </div>
      <span
        style={{
          fontFamily: familias.mono,
          fontWeight: pesos.semibold,
          fontSize: px(22),
          letterSpacing: "0.18em",
          color: cores.textoSutil,
        }}
      >
        01 / {TOTAL_SLIDES_PADRAO.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

function Centro({
  titulo,
  subtitulo,
  escala,
}: {
  titulo: string;
  subtitulo: string;
  escala: Escala;
}) {
  const { px } = escala;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: px(32) }}>
      <h1
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontWeight: pesos.bold,
          fontSize: px(108),
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          maxWidth: "95%",
        }}
      >
        {titulo}
      </h1>
      <p
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontSize: px(30),
          lineHeight: 1.5,
          color: cores.textoSecundario,
          maxWidth: "80%",
        }}
      >
        {subtitulo}
      </p>
    </div>
  );
}

function Rodape({
  cta,
  contato,
  escala,
}: {
  cta: string;
  contato: string;
  escala: Escala;
}) {
  const { px } = escala;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: px(32),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: px(20) }}>
        <span
          style={{
            fontFamily: familias.mono,
            fontWeight: pesos.semibold,
            fontSize: px(28),
            letterSpacing: "0.28em",
            color: cores.accent,
            textTransform: "uppercase",
          }}
        >
          {cta}
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: familias.mono,
            fontSize: px(48),
            color: cores.accent,
            lineHeight: 1,
          }}
        >
          →
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: px(8),
        }}
      >
        <Logo tamanho={escala.n(24)} corSigla={cores.accent} />
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(18),
            color: cores.textoSutil,
            letterSpacing: "0.06em",
          }}
        >
          {contato}
        </span>
      </div>
    </div>
  );
}
