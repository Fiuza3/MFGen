import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import type { PropsTemplate } from "../tipos";

/**
 * Estilo "commit log": hash falso à esquerda, branch como tag,
 * mensagem como título e descrição como corpo.
 */
export function CommitCard({ dimensao, conteudo }: PropsTemplate) {
  const fator = Math.min(dimensao.largura, dimensao.altura) / 1080;
  const px = (valor: number) => `${valor * fator}px`;

  const titulo = conteudo.titulo.trim() || "primeira mensagem do commit";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "descrição estendida do commit aparece logo abaixo, com mais detalhes.";
  const tag = conteudo.tag.trim() || "main";
  const hash = derivarHash(titulo);

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
      }}
    >
      <Topo px={px} />
      <Corpo
        hash={hash}
        tag={tag}
        titulo={titulo}
        subtitulo={subtitulo}
        px={px}
      />
      <Rodape px={px} />
    </div>
  );
}

function Topo({ px }: { px: (valor: number) => string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: familias.mono,
        fontSize: px(20),
        color: cores.textoSutil,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      <span>git log --oneline</span>
      <span>commit 01 / 04</span>
    </div>
  );
}

function Corpo({
  hash,
  tag,
  titulo,
  subtitulo,
  px,
}: {
  hash: string;
  tag: string;
  titulo: string;
  subtitulo: string;
  px: (valor: number) => string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: px(40) }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: px(24),
          fontFamily: familias.mono,
          fontSize: px(28),
        }}
      >
        <span style={{ color: cores.accentForte, fontWeight: pesos.semibold }}>
          {hash}
        </span>
        <BadgeBranch tag={tag} px={px} />
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontWeight: pesos.semibold,
          fontSize: px(88),
          lineHeight: 1.1,
          color: cores.textoPrimario,
          letterSpacing: "-0.025em",
        }}
      >
        {titulo}
      </h1>
      <p
        style={{
          margin: 0,
          fontFamily: familias.sans,
          fontSize: px(32),
          lineHeight: 1.5,
          color: cores.textoSecundario,
          maxWidth: "85%",
        }}
      >
        {subtitulo}
      </p>
    </div>
  );
}

function BadgeBranch({
  tag,
  px,
}: {
  tag: string;
  px: (valor: number) => string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: px(10),
        padding: `${px(6)} ${px(16)}`,
        border: `${px(1)} solid ${cores.accent}`,
        borderRadius: px(999),
        color: cores.accentForte,
        background: `${cores.accentSutil}33`,
        textTransform: "lowercase",
        letterSpacing: "0.02em",
      }}
    >
      <span
        aria-hidden
        style={{
          width: px(10),
          height: px(10),
          borderRadius: "50%",
          background: cores.accentForte,
        }}
      />
      {tag}
    </span>
  );
}

function Rodape({ px }: { px: (valor: number) => string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: familias.mono,
        fontSize: px(20),
        color: cores.textoSutil,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <Logo
        tamanho={Number(px(24).replace("px", ""))}
        corSigla={cores.accentForte}
      />
      <span>autor / marcus fiuza</span>
    </div>
  );
}

/**
 * Gera um "hash" determinístico curto a partir do título, só para
 * decorar — não tem valor criptográfico nem semântico.
 */
function derivarHash(entrada: string): string {
  let h = 0;
  for (let i = 0; i < entrada.length; i++) {
    h = (h * 31 + entrada.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(7, "0").slice(0, 7);
}
