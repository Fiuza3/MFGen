"use client";

import { useState, type RefObject } from "react";

import type { Dimensao } from "@/recursos/proporcao/tipos";

import { baixarDataUrl, exportarComoPng } from "../exportar";

type BotaoExportarProps = {
  refNo: RefObject<HTMLElement | null>;
  dimensao: Dimensao;
  idTemplate: string;
};

/**
 * Aciona a captura do nó renderizado em dimensão real e dispara o
 * download do PNG. Mantém estados simples (idle, exportando, erro) para
 * dar feedback visual sem cair em uma máquina de estados complexa.
 */
export function BotaoExportar({
  refNo,
  dimensao,
  idTemplate,
}: BotaoExportarProps) {
  const [exportando, setExportando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const exportar = async () => {
    const no = refNo.current;
    if (!no) {
      setErro("Visualizador ainda não está pronto. Tente novamente.");
      return;
    }
    setErro(null);
    setExportando(true);
    try {
      const { dataUrl, nomeArquivo } = await exportarComoPng({
        no,
        dimensao,
        idTemplate,
      });
      baixarDataUrl(dataUrl, nomeArquivo);
    } catch (causa) {
      console.error("Falha ao exportar PNG", causa);
      setErro("Não consegui gerar o PNG. Tente novamente em instantes.");
    } finally {
      setExportando(false);
    }
  };

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
      {erro && (
        <p className="text-xs text-mf-erro" role="alert">
          {erro}
        </p>
      )}
    </div>
  );
}
