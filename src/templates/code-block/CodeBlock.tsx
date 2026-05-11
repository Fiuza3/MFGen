import type { ReactNode } from "react";

import { cores } from "@/identidade/cores";
import { Logo } from "@/identidade/Logo";
import { familias, pesos } from "@/identidade/tipografia";

import { criarEscala, type Escala } from "../escala";
import type { PropsTemplate } from "../tipos";

const SINTAXE = {
  keyword: "#C084FC",
  funcao: "#34D399",
  string: "#FCD34D",
  comentario: "#71717A",
  identificador: "#FAFAFA",
} as const;

type Linha = { numero: number; render: () => ReactNode };

export function CodeBlock({ dimensao, conteudo }: PropsTemplate) {
  const escala = criarEscala(dimensao);
  const { px } = escala;

  const arquivo = nomeArquivoApartirDaTag(conteudo.tag);
  const identificador = identificadorApartirDoTitulo(conteudo.titulo);
  const stringRetorno = conteudo.titulo.trim() || "Olá, mundo!";
  const comentario =
    conteudo.subtitulo.trim() || "comentário explicando a intenção do código";

  const linhas: Linha[] = [
    { numero: 1, render: () => <Comentario texto={`// ${comentario}`} /> },
    {
      numero: 2,
      render: () => (
        <>
          <Token cor={SINTAXE.keyword}>export default function</Token>{" "}
          <Token cor={SINTAXE.funcao}>{identificador}</Token>
          <Token cor={SINTAXE.identificador}>{"() {"}</Token>
        </>
      ),
    },
    {
      numero: 3,
      render: () => (
        <span style={{ paddingLeft: px(48) }}>
          <Token cor={SINTAXE.keyword}>return</Token>{" "}
          <Token cor={SINTAXE.string}>{`"${stringRetorno}"`}</Token>
          <Token cor={SINTAXE.identificador}>;</Token>
        </span>
      ),
    },
    {
      numero: 4,
      render: () => <Token cor={SINTAXE.identificador}>{"}"}</Token>,
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
      <BarraArquivo arquivo={arquivo} escala={escala} />
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
          <Gutter linhas={linhas.map((l) => l.numero)} escala={escala} />
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
              <div key={linha.numero}>{linha.render()}</div>
            ))}
          </pre>
        </div>
        <Rodape escala={escala} />
      </div>
    </div>
  );
}

function BarraArquivo({
  arquivo,
  escala,
}: {
  arquivo: string;
  escala: Escala;
}) {
  const { px } = escala;
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

function Gutter({ linhas, escala }: { linhas: number[]; escala: Escala }) {
  const { px } = escala;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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

function Token({ cor, children }: { cor: string; children: ReactNode }) {
  return (
    <span style={{ color: cor, fontWeight: pesos.semibold }}>{children}</span>
  );
}

function Comentario({ texto }: { texto: string }) {
  return (
    <span style={{ color: SINTAXE.comentario, fontStyle: "italic" }}>
      {texto}
    </span>
  );
}

function Rodape({ escala }: { escala: Escala }) {
  const { px } = escala;
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
      <Logo tamanho={escala.n(22)} corSigla={cores.accentForte} />
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

function nomeArquivoApartirDaTag(tag: string): string {
  const limpo = tag.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
  if (!limpo) return "mfgen.ts";
  return limpo.includes(".") ? limpo : `${limpo}.ts`;
}

function identificadorApartirDoTitulo(titulo: string): string {
  const palavras = titulo
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (palavras.length === 0) return "boasVindas";
  const [primeira, ...resto] = palavras;
  const camel =
    primeira + resto.map((p) => p[0].toUpperCase() + p.slice(1)).join("");
  return camel.slice(0, 28);
}
