import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

export function Terminal({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const titulo = conteudo.titulo.trim() || "diga algo bonito";
  const subtitulo =
    conteudo.subtitulo.trim() || "o subtítulo aparece como saída do comando";
  const rotuloJanela = conteudo.tag.trim() || "~/mfdesenvolvimento";

  return (
    <div
      style={{
        width: dimensao.largura,
        height: dimensao.altura,
        background: cores.fundo,
        padding: px(80),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: familias.sans,
        color: cores.textoPrimario,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          background: cores.superficie,
          border: `${px(2)} solid ${cores.borda}`,
          borderRadius: px(20),
          overflow: "hidden",
          boxShadow: `0 ${px(30)} ${px(80)} rgba(0,0,0,0.6)`,
        }}
      >
        <BarraDaJanela rotulo={rotuloJanela} escala={escala} />
        <div
          style={{
            padding: `${px(56)} ${px(64)} ${px(72)}`,
            display: "flex",
            flexDirection: "column",
            gap: px(32),
          }}
        >
          <Linha
            prompt="$"
            texto={titulo}
            cor={cores.accentForte}
            escala={escala}
          />
          <Saida texto={subtitulo} escala={escala} />
        </div>
        <Rodape escala={escala} />
      </div>
    </div>
  );
}

function BarraDaJanela({ rotulo, escala }: { rotulo: string; escala: Escala }) {
  const { px } = escala;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: px(12),
        padding: `${px(20)} ${px(28)}`,
        background: cores.superficieElevada,
        borderBottom: `${px(1)} solid ${cores.borda}`,
      }}
    >
      <Ponto cor="#FF5F57" escala={escala} />
      <Ponto cor="#FEBC2E" escala={escala} />
      <Ponto cor="#28C840" escala={escala} />
      <span
        style={{
          marginLeft: px(20),
          fontFamily: familias.mono,
          fontSize: px(20),
          color: cores.textoSecundario,
          letterSpacing: "0.04em",
        }}
      >
        {rotulo}
      </span>
    </div>
  );
}

function Ponto({ cor, escala }: { cor: string; escala: Escala }) {
  const lado = escala.px(18);
  return (
    <span
      style={{
        width: lado,
        height: lado,
        borderRadius: "50%",
        background: cor,
        display: "inline-block",
      }}
    />
  );
}

function Linha({
  prompt,
  texto,
  cor,
  escala,
}: {
  prompt: string;
  texto: string;
  cor: string;
  escala: Escala;
}) {
  const { px } = escala;
  return (
    <p
      style={{
        margin: 0,
        fontFamily: familias.mono,
        fontWeight: pesos.semibold,
        fontSize: px(72),
        lineHeight: 1.15,
        color: cores.textoPrimario,
        letterSpacing: "-0.02em",
        display: "flex",
        gap: px(24),
        alignItems: "baseline",
      }}
    >
      <span style={{ color: cor }}>{prompt}</span>
      <span>{texto}</span>
    </p>
  );
}

function Saida({ texto, escala }: { texto: string; escala: Escala }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: familias.sans,
        fontSize: escala.px(34),
        lineHeight: 1.45,
        color: cores.textoSecundario,
        maxWidth: "90%",
      }}
    >
      {texto}
    </p>
  );
}

function Rodape({ escala }: { escala: Escala }) {
  const { px, n } = escala;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${px(20)} ${px(28)}`,
        borderTop: `${px(1)} solid ${cores.borda}`,
        background: cores.superficieElevada,
      }}
    >
      <Logo tamanho={n(22)} />
      <span
        style={{
          fontFamily: familias.mono,
          fontSize: px(18),
          color: cores.textoSutil,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        mfdesenvolvimento.online
      </span>
    </div>
  );
}
