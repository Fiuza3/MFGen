import type { ReactNode } from "react";

import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

// Cada painel ocupa exatamente 1/3 da largura (= 1 post quadrado no feed).
// Os divisores indicam onde cortar para virar 3 PNGs separados antes de postar.
export function FeedTrio({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);

  const tag = conteudo.tag.trim() || "novidade";
  const titulo = conteudo.titulo.trim() || "três posts, uma só mensagem";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "carrossel sincronizado para chamar atenção logo no perfil.";
  const cta = conteudo.cta.trim() || "arrasta o feed →";
  const contato = conteudo.contato.trim() || "@mfdesenvolvimento";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: cores.fundo,
        display: "flex",
        fontFamily: familias.sans,
        color: cores.textoPrimario,
      }}
    >
      <PainelHook tag={tag} titulo={titulo} escala={escala} />
      <Divisor escala={escala} />
      <PainelMarca subtitulo={subtitulo} escala={escala} />
      <Divisor escala={escala} />
      <PainelChamada cta={cta} contato={contato} escala={escala} />
    </div>
  );
}

function PainelHook({
  tag,
  titulo,
  escala,
}: {
  tag: string;
  titulo: string;
  escala: Escala;
}) {
  const { px } = escala;
  return (
    <Painel escala={escala}>
      <Etiqueta texto={tag} escala={escala} />
      <h2
        style={{
          margin: 0,
          marginTop: px(40),
          fontFamily: familias.sans,
          fontWeight: pesos.bold,
          fontSize: px(96),
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        {titulo}
      </h2>
      <Rodape escala={escala}>
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(20),
            letterSpacing: "0.32em",
            color: cores.accent,
            textTransform: "uppercase",
          }}
        >
          01 / 03
        </span>
        <Logo tamanho={escala.n(28)} />
      </Rodape>
    </Painel>
  );
}

function PainelMarca({
  subtitulo,
  escala,
}: {
  subtitulo: string;
  escala: Escala;
}) {
  const { px } = escala;
  return (
    <Painel
      escala={escala}
      style={{
        background: `radial-gradient(circle at 50% 45%, ${cores.superficie} 0%, ${cores.fundo} 75%)`,
        position: "relative",
      }}
    >
      <Glow escala={escala} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: px(32),
          position: "relative",
        }}
      >
        <Logo tamanho={escala.n(260)} />
        <span
          style={{
            fontFamily: familias.sans,
            fontWeight: pesos.medio,
            fontSize: px(28),
            letterSpacing: "0.22em",
            color: cores.textoSecundario,
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: "85%",
          }}
        >
          {subtitulo}
        </span>
      </div>
      <Rodape escala={escala} centralizado>
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(20),
            letterSpacing: "0.32em",
            color: cores.accent,
            textTransform: "uppercase",
          }}
        >
          02 / 03
        </span>
      </Rodape>
    </Painel>
  );
}

function PainelChamada({
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
    <Painel escala={escala}>
      <Etiqueta texto="próximo passo" escala={escala} />
      <p
        style={{
          margin: 0,
          marginTop: px(40),
          fontFamily: familias.sans,
          fontWeight: pesos.bold,
          fontSize: px(88),
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        {cta}
      </p>
      <Rodape escala={escala}>
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(20),
            letterSpacing: "0.32em",
            color: cores.accent,
            textTransform: "uppercase",
          }}
        >
          03 / 03
        </span>
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(22),
            color: cores.textoSecundario,
            letterSpacing: "0.08em",
          }}
        >
          {contato}
        </span>
      </Rodape>
    </Painel>
  );
}

function Painel({
  escala,
  children,
  style,
}: {
  escala: Escala;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const { px } = escala;
  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        boxSizing: "border-box",
        padding: px(80),
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Divisor({ escala }: { escala: Escala }) {
  return (
    <span
      aria-hidden
      style={{
        width: escala.px(1),
        height: "100%",
        background: `linear-gradient(to bottom, transparent, ${cores.borda} 30%, ${cores.borda} 70%, transparent)`,
      }}
    />
  );
}

function Etiqueta({ texto, escala }: { texto: string; escala: Escala }) {
  const { px } = escala;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: px(16) }}>
      <span
        aria-hidden
        style={{
          width: px(40),
          height: px(2),
          background: cores.accent,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontFamily: familias.mono,
          fontWeight: pesos.semibold,
          fontSize: px(20),
          letterSpacing: "0.32em",
          color: cores.accent,
          textTransform: "uppercase",
        }}
      >
        {texto}
      </span>
    </div>
  );
}

function Rodape({
  escala,
  centralizado = false,
  children,
}: {
  escala: Escala;
  centralizado?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: escala.px(40),
        display: "flex",
        alignItems: "center",
        justifyContent: centralizado ? "center" : "space-between",
        gap: escala.px(16),
      }}
    >
      {children}
    </div>
  );
}

function Glow({ escala }: { escala: Escala }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: escala.px(700),
        height: escala.px(700),
        borderRadius: "50%",
        background: cores.accent,
        opacity: 0.08,
        filter: `blur(${escala.px(140)})`,
        pointerEvents: "none",
      }}
    />
  );
}
