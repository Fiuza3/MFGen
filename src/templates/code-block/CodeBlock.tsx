import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import type { PropsTemplate } from "../tipos";

const TONS_SINTAXE = {
  keyword: "#C084FC",
  funcao: "#34D399",
  string: "#FCD34D",
  comentario: "#71717A",
  identificador: "#FAFAFA",
} as const;

/**
 * Bloco de código com gutter (números de linha) à esquerda e linhas
 * com tokens coloridos imitando uma IDE.
 */
export function CodeBlock({ dimensao, conteudo }: PropsTemplate) {
  const fator = Math.min(dimensao.largura, dimensao.altura) / 1080;
  const px = (valor: number) => `${valor * fator}px`;

  const arquivo = sanitizarNomeArquivo(conteudo.tag) || "mfgen.ts";
  const identificador = sanitizarIdentificador(conteudo.titulo) || "boasVindas";
  const stringRetorno = conteudo.titulo.trim() || "Olá, mundo!";
  const comentario =
    conteudo.subtitulo.trim() || "comentário explicando a intenção do código";

  const linhas = [
    { numero: 1, render: () => <Comentario texto={`// ${comentario}`} /> },
    {
      numero: 2,
      render: () => (
        <>
          <Token cor={TONS_SINTAXE.keyword}>export default function</Token>{" "}
          <Token cor={TONS_SINTAXE.funcao}>{identificador}</Token>
          <Token cor={TONS_SINTAXE.identificador}>{"() {"}</Token>
        </>
      ),
    },
    {
      numero: 3,
      render: () => (
        <span style={{ paddingLeft: px(48) }}>
          <Token cor={TONS_SINTAXE.keyword}>return</Token>{" "}
          <Token cor={TONS_SINTAXE.string}>{`"${stringRetorno}"`}</Token>
          <Token cor={TONS_SINTAXE.identificador}>;</Token>
        </span>
      ),
    },
    {
      numero: 4,
      render: () => <Token cor={TONS_SINTAXE.identificador}>{"}"}</Token>,
    },
  ];

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
      }}
    >
      <BarraArquivo arquivo={arquivo} px={px} />
      <div
        style={{
          flex: 1,
          background: cores.superficie,
          border: `${px(2)} solid ${cores.borda}`,
          borderRadius: px(20),
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: `${px(56)} ${px(48)}`,
            gap: px(40),
          }}
        >
          <Gutter linhas={linhas.map((l) => l.numero)} px={px} />
          <pre
            style={{
              margin: 0,
              flex: 1,
              fontFamily: familias.mono,
              fontSize: px(40),
              lineHeight: 1.6,
              color: cores.textoPrimario,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {linhas.map((linha) => (
              <div key={linha.numero} style={{ display: "block" }}>
                {linha.render()}
              </div>
            ))}
          </pre>
        </div>
        <Rodape px={px} />
      </div>
    </div>
  );
}

function BarraArquivo({
  arquivo,
  px,
}: {
  arquivo: string;
  px: (valor: number) => string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: px(16),
        fontFamily: familias.mono,
        fontSize: px(22),
        color: cores.textoSecundario,
        letterSpacing: "0.04em",
      }}
    >
      <span
        aria-hidden
        style={{
          width: px(10),
          height: px(10),
          background: cores.accentForte,
          borderRadius: "50%",
        }}
      />
      <span>{arquivo}</span>
    </div>
  );
}

function Gutter({
  linhas,
  px,
}: {
  linhas: number[];
  px: (valor: number) => string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        borderRight: `${px(1)} solid ${cores.borda}`,
        paddingRight: px(28),
        fontFamily: familias.mono,
        fontSize: px(40),
        lineHeight: 1.6,
        color: cores.textoSutil,
        textAlign: "right",
        minWidth: px(60),
      }}
    >
      {linhas.map((numero) => (
        <span key={numero}>{numero.toString().padStart(2, "0")}</span>
      ))}
    </div>
  );
}

function Token({
  cor,
  children,
}: {
  cor: string;
  children: React.ReactNode;
}) {
  return <span style={{ color: cor, fontWeight: pesos.semibold }}>{children}</span>;
}

function Comentario({ texto }: { texto: string }) {
  return (
    <span style={{ color: TONS_SINTAXE.comentario, fontStyle: "italic" }}>
      {texto}
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
        utf-8 · linha 1, col 1
      </span>
    </div>
  );
}

function sanitizarNomeArquivo(valor: string): string {
  const limpo = valor.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
  if (!limpo) return "";
  return limpo.includes(".") ? limpo : `${limpo}.ts`;
}

function sanitizarIdentificador(valor: string): string {
  const palavras = valor
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (palavras.length === 0) return "";
  const [primeira, ...resto] = palavras;
  return (
    primeira +
    resto
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("")
  ).slice(0, 28);
}
