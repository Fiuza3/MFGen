import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function PostInstagram({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const tag = conteudo.tag.trim() || "01 / serviço";
  const titulo = conteudo.titulo.trim() || "Sites que carregam rápido e convertem";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "Desenvolvimento web sob medida, focado em performance e resultado.";
  const cta = conteudo.cta.trim() || "Solicite seu orçamento";
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
      <BrilhoAccent escala={escala} />

      <Cabecalho tag={tag} escala={escala} />

      <Centro titulo={titulo} subtitulo={subtitulo} escala={escala} />

      <Rodape cta={cta} contato={contato} escala={escala} />
    </div>
  );
}

function BrilhoAccent({ escala }: { escala: Escala }) {
  const { px } = escala;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: px(-200),
        right: px(-200),
        width: px(600),
        height: px(600),
        borderRadius: "50%",
        background: cores.accent,
        opacity: 0.08,
        filter: `blur(${px(120)})`,
        pointerEvents: "none",
      }}
    />
  );
}

function Cabecalho({ tag, escala }: { tag: string; escala: Escala }) {
  const { px } = escala;
  return (
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
    <div style={{ display: "flex", flexDirection: "column", gap: px(28) }}>
      <h1
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontWeight: pesos.bold,
          fontSize: px(104),
          lineHeight: 1.04,
          letterSpacing: "-0.035em",
          color: cores.textoPrimario,
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
          maxWidth: "78%",
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
      <BotaoCta cta={cta} escala={escala} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: px(8),
        }}
      >
        <Logo tamanho={escala.n(26)} />
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

function BotaoCta({ cta, escala }: { cta: string; escala: Escala }) {
  const { px } = escala;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: px(14),
        padding: `${px(20)} ${px(34)}`,
        border: `${px(2)} solid ${cores.accent}`,
        borderRadius: px(999),
        fontFamily: familias.mono,
        fontWeight: pesos.semibold,
        fontSize: px(26),
        color: cores.accent,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        background: cores.accentSutil,
      }}
    >
      <span aria-hidden>→</span>
      {cta}
    </span>
  );
}
