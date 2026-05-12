import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function CommitCard({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const titulo = conteudo.titulo.trim() || "primeira mensagem do commit";
  const subtitulo =
    conteudo.subtitulo.trim() ||
    "descrição estendida do commit aparece logo abaixo, com mais detalhes.";
  const tag = conteudo.tag.trim() || "main";
  const hash = hashCurto(titulo);

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
      <Topo escala={escala} />
      <Corpo
        hash={hash}
        tag={tag}
        titulo={titulo}
        subtitulo={subtitulo}
        escala={escala}
      />
      <Rodape escala={escala} />
    </div>
  );
}

function Topo({ escala }: { escala: Escala }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: familias.mono,
        fontSize: escala.px(20),
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
  escala,
}: {
  hash: string;
  tag: string;
  titulo: string;
  subtitulo: string;
  escala: Escala;
}) {
  const { px } = escala;
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
        <BadgeBranch tag={tag} escala={escala} />
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

function BadgeBranch({ tag, escala }: { tag: string; escala: Escala }) {
  const { px } = escala;
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

function Rodape({ escala }: { escala: Escala }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: familias.mono,
        fontSize: escala.px(20),
        color: cores.textoSutil,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <Logo tamanho={escala.n(24)} />
      <span>autor / marcus fiuza</span>
    </div>
  );
}

// Decorativo: gera 7 chars hex estáveis a partir do título. Não é hash
// criptográfico; só serve para não mostrar um valor literal estático.
function hashCurto(entrada: string): string {
  let h = 0;
  for (let i = 0; i < entrada.length; i++) {
    h = (h * 31 + entrada.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(7, "0").slice(0, 7);
}
