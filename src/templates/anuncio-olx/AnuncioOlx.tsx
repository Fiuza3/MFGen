import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function AnuncioOlx({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const categoria = conteudo.tag.trim() || "desenvolvimento web";
  const titulo = conteudo.titulo.trim() || "Sites institucionais sob medida";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "Entrega em 7 dias, hospedagem grátis no primeiro ano, suporte direto.";
  const preco = conteudo.preco.trim() || "A partir de R$ 1.500";
  const contato = conteudo.contato.trim() || "wa.me/5519999999999";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: cores.fundo,
        padding: px(80),
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: px(40),
        fontFamily: familias.sans,
        color: cores.textoPrimario,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Borda escala={escala} />

      <Categoria valor={categoria} escala={escala} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: px(32),
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: familias.sans,
            fontWeight: pesos.bold,
            fontSize: px(96),
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            maxWidth: "90%",
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

      <Faixa preco={preco} contato={contato} escala={escala} />
    </div>
  );
}

function Borda({ escala }: { escala: Escala }) {
  const { px } = escala;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        inset: px(32),
        border: `${px(2)} solid ${cores.borda}`,
        borderRadius: px(20),
        pointerEvents: "none",
      }}
    />
  );
}

function Categoria({ valor, escala }: { valor: string; escala: Escala }) {
  const { px } = escala;
  return (
    <div
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: px(12),
        padding: `${px(10)} ${px(18)}`,
        border: `${px(1)} solid ${cores.accent}`,
        borderRadius: px(999),
        background: cores.accentSutil,
      }}
    >
      <span
        aria-hidden
        style={{
          width: px(10),
          height: px(10),
          borderRadius: "50%",
          background: cores.accent,
        }}
      />
      <span
        style={{
          fontFamily: familias.mono,
          fontWeight: pesos.semibold,
          fontSize: px(22),
          letterSpacing: "0.22em",
          color: cores.accent,
          textTransform: "uppercase",
        }}
      >
        {valor}
      </span>
    </div>
  );
}

function Faixa({
  preco,
  contato,
  escala,
}: {
  preco: string;
  contato: string;
  escala: Escala;
}) {
  const { px } = escala;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: px(32),
        padding: `${px(32)} ${px(36)}`,
        background: cores.superficie,
        border: `${px(1)} solid ${cores.borda}`,
        borderRadius: px(16),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: px(4) }}>
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(18),
            color: cores.textoSutil,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          investimento
        </span>
        <span
          style={{
            fontFamily: familias.sans,
            fontWeight: pesos.bold,
            fontSize: px(56),
            color: cores.accent,
            letterSpacing: "-0.02em",
          }}
        >
          {preco}
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
        <Logo tamanho={escala.n(26)} corSigla={cores.accent} />
        <span
          style={{
            fontFamily: familias.mono,
            fontSize: px(22),
            color: cores.textoPrimario,
            letterSpacing: "0.04em",
          }}
        >
          {contato}
        </span>
      </div>
    </div>
  );
}
