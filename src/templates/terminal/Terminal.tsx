import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import type { PropsTemplate } from "../tipos";

/**
 * Janela de terminal estilizada. O título vira o comando (`$ ...`),
 * o subtítulo vira a saída e a tag aparece como label da janela.
 */
export function Terminal({ dimensao, conteudo }: PropsTemplate) {
  // Fator de escala baseado no menor lado, comparado ao canvas de
  // referência de 1080px. Mantém proporção visual entre formatos.
  const fator = Math.min(dimensao.largura, dimensao.altura) / 1080;
  const px = (valor: number) => `${valor * fator}px`;

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
        <BarraDaJanela rotulo={rotuloJanela} px={px} />
        <div
          style={{
            padding: `${px(56)} ${px(64)} ${px(72)}`,
            display: "flex",
            flexDirection: "column",
            gap: px(32),
          }}
        >
          <Linha prompt="$" texto={titulo} px={px} cor={cores.accentForte} />
          <Saida texto={subtitulo} px={px} />
        </div>
        <Rodape px={px} />
      </div>
    </div>
  );
}

function BarraDaJanela({
  rotulo,
  px,
}: {
  rotulo: string;
  px: (valor: number) => string;
}) {
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
      <Bolinha cor="#FF5F57" px={px} />
      <Bolinha cor="#FEBC2E" px={px} />
      <Bolinha cor="#28C840" px={px} />
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

function Bolinha({
  cor,
  px,
}: {
  cor: string;
  px: (valor: number) => string;
}) {
  return (
    <span
      style={{
        width: px(18),
        height: px(18),
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
  px,
}: {
  prompt: string;
  texto: string;
  cor: string;
  px: (valor: number) => string;
}) {
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

function Saida({
  texto,
  px,
}: {
  texto: string;
  px: (valor: number) => string;
}) {
  return (
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
      {texto}
    </p>
  );
}

function Rodape({ px }: { px: (valor: number) => string }) {
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
      <Logo
        tamanho={Number(px(22).replace("px", ""))}
        corSigla={cores.accentForte}
      />
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
