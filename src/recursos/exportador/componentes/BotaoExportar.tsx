"use client";

import { useEffect, useState, type RefObject } from "react";

import type { Dimensao } from "@/recursos/proporcao/tipos";

import { baixarDataUrl, exportarComoPng } from "../exportar";

type BotaoExportarProps = {
  refNo: RefObject<HTMLElement | null>;
  dimensao: Dimensao;
  idTemplate: string;
};

type Estado =
  | { tipo: "ocioso" }
  | { tipo: "exportando" }
  | { tipo: "sucesso"; nomeArquivo: string }
  | { tipo: "erro"; mensagem: string };

const DURACAO_MENSAGEM_SUCESSO_MS = 3500;

/**
 * Aciona a captura do nó renderizado em dimensão real e dispara o
 * download do PNG. Devolve feedback inline: estado de exportação,
 * confirmação de sucesso (com nome do arquivo) e mensagens de erro.
 */
export function BotaoExportar({
  refNo,
  dimensao,
  idTemplate,
}: BotaoExportarProps) {
  const [estado, setEstado] = useState<Estado>({ tipo: "ocioso" });

  useEffect(() => {
    if (estado.tipo !== "sucesso") return;
    const tempo = window.setTimeout(
      () => setEstado({ tipo: "ocioso" }),
      DURACAO_MENSAGEM_SUCESSO_MS,
    );
    return () => window.clearTimeout(tempo);
  }, [estado]);

  const exportar = async () => {
    const no = refNo.current;
    if (!no) {
      setEstado({
        tipo: "erro",
        mensagem: "Visualizador ainda não está pronto. Tente novamente.",
      });
      return;
    }
    setEstado({ tipo: "exportando" });
    try {
      const { dataUrl, nomeArquivo } = await exportarComoPng({
        no,
        dimensao,
        idTemplate,
      });
      baixarDataUrl(dataUrl, nomeArquivo);
      setEstado({ tipo: "sucesso", nomeArquivo });
    } catch (causa) {
      console.error("Falha ao exportar PNG", causa);
      setEstado({
        tipo: "erro",
        mensagem: "Não consegui gerar o PNG. Tente novamente em instantes.",
      });
    }
  };

  const exportando = estado.tipo === "exportando";

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={exportar}
        disabled={exportando}
        className="font-mono text-sm uppercase tracking-widest bg-mf-accent text-mf-fundo rounded-md px-4 py-3 hover:bg-mf-accent-forte disabled:opacity-60 disabled:cursor-progress transition-colors"
      >
        {exportando ? "Exportando..." : "Exportar PNG"}
      </button>

      <p className="font-mono text-[11px] uppercase tracking-widest text-mf-texto-sutil">
        {dimensao.largura} × {dimensao.altura} px
      </p>

      {estado.tipo === "sucesso" && (
        <p
          className="text-xs font-mono text-mf-accent-forte break-all"
          role="status"
        >
          ✓ {estado.nomeArquivo}
        </p>
      )}

      {estado.tipo === "erro" && (
        <p className="text-xs text-mf-erro" role="alert">
          {estado.mensagem}
        </p>
      )}
    </div>
  );
}
