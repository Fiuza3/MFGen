import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function StoryReels({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const tag = conteudo.tag.trim() || "novidade";
  const titulo = conteudo.titulo.trim() || "Pronto para colocar seu projeto no ar?";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "Desenvolvimento web sob medida com entrega rápida.";
  const cta = conteudo.cta.trim() || "arrasta pra cima";
  const contato = conteudo.contato.trim() || "@mfdesenvolvimento";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: cores.fundo,
        // Stories tem UI nas bordas — respiração generosa em cima/baixo.
        padding: `${px(220)} ${px(96)} ${px(180)}`,
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
      <BrilhoVertical escala={escala} />

      <Topo tag={tag} escala={escala} />

      <Centro titulo={titulo} subtitulo={subtitulo} escala={escala} />

      <Rodape cta={cta} contato={contato} escala={escala} />
    </div>
  );
}

function BrilhoVertical({ escala }: { escala: Escala }) {
  const { px } = escala;
  return (
    <>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: px(-300),
          left: "50%",
          transform: "translateX(-50%)",
          width: px(900),
          height: px(900),
          borderRadius: "50%",
          background: cores.accent,
          opacity: 0.06,
          filter: `blur(${px(160)})`,
          pointerEvents: "none",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: px(120),
          left: 0,
          right: 0,
          height: px(2),
          background: `linear-gradient(to right, transparent, ${cores.accent}, transparent)`,
          opacity: 0.35,
        }}
      />
    </>
  );
}

function Topo({ tag, escala }: { tag: string; escala: Escala }) {
  const { px } = escala;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: px(16) }}>
      <Logo tamanho={escala.n(34)} corSigla={cores.accent} />
      <span
        aria-hidden
        style={{
          width: px(2),
          height: px(28),
          background: cores.bordaForte,
        }}
      />
      <span
        style={{
          fontFamily: familias.mono,
          fontWeight: pesos.semibold,
          fontSize: px(22),
          letterSpacing: "0.32em",
          color: cores.accent,
          textTransform: "uppercase",
        }}
      >
        {tag}
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
    <div style={{ display: "flex", flexDirection: "column", gap: px(36) }}>
      <h1
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontWeight: pesos.bold,
          fontSize: px(124),
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          color: cores.textoPrimario,
        }}
      >
        {titulo}
      </h1>
      <p
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontSize: px(34),
          lineHeight: 1.45,
          color: cores.textoSecundario,
          maxWidth: "90%",
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
        flexDirection: "column",
        alignItems: "center",
        gap: px(24),
      }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: familias.mono,
          fontSize: px(48),
          color: cores.accent,
          lineHeight: 1,
        }}
      >
        ↑
      </span>
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
        style={{
          fontFamily: familias.mono,
          fontSize: px(22),
          color: cores.textoSutil,
          letterSpacing: "0.08em",
        }}
      >
        {contato}
      </span>
    </div>
  );
}
