import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function Marca({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px, n } = escala;

  const tag = conteudo.tag.trim();
  const subtitulo = conteudo.subtitulo.trim() || "desenvolvimento web";
  const contato = conteudo.contato.trim() || "mfdesenvolvimento.online";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: `radial-gradient(circle at 50% 45%, ${cores.superficie} 0%, ${cores.fundo} 70%)`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: px(40),
        fontFamily: familias.sans,
        color: cores.textoPrimario,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlowAccent escala={escala} />

      {tag && <Tagline texto={tag} escala={escala} />}

      <Logo tamanho={n(240)} />

      <Subtitulo texto={subtitulo} escala={escala} />

      <Contato texto={contato} escala={escala} />
    </div>
  );
}

function GlowAccent({ escala }: { escala: Escala }) {
  const { px } = escala;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: px(900),
        height: px(900),
        borderRadius: "50%",
        background: cores.accent,
        opacity: 0.08,
        filter: `blur(${px(160)})`,
        pointerEvents: "none",
      }}
    />
  );
}

function Tagline({ texto, escala }: { texto: string; escala: Escala }) {
  const { px } = escala;
  return (
    <span
      style={{
        fontFamily: familias.mono,
        fontWeight: pesos.semibold,
        fontSize: px(22),
        letterSpacing: "0.38em",
        color: cores.accent,
        textTransform: "uppercase",
      }}
    >
      {texto}
    </span>
  );
}

function Subtitulo({ texto, escala }: { texto: string; escala: Escala }) {
  const { px } = escala;
  return (
    <span
      style={{
        fontFamily: familias.sans,
        fontWeight: pesos.medio,
        fontSize: px(28),
        letterSpacing: "0.22em",
        color: cores.textoSecundario,
        textTransform: "uppercase",
      }}
    >
      {texto}
    </span>
  );
}

function Contato({ texto, escala }: { texto: string; escala: Escala }) {
  const { px } = escala;
  return (
    <span
      style={{
        position: "absolute",
        bottom: px(64),
        fontFamily: familias.mono,
        fontSize: px(20),
        color: cores.textoSutil,
        letterSpacing: "0.12em",
      }}
    >
      {texto}
    </span>
  );
}
