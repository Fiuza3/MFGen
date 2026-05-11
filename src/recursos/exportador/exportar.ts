import { toPng } from "html-to-image";

import type { Dimensao } from "@/recursos/proporcao/tipos";

type EntradaExportar = {
  no: HTMLElement;
  dimensao: Dimensao;
  idTemplate: string;
};

/**
 * Captura o nó (em tamanho real) como PNG na dimensão exata pedida,
 * aguarda as fontes carregadas para evitar tipografia genérica no
 * arquivo final, e devolve um par dataURL/nome pronto para download.
 */
export async function exportarComoPng({
  no,
  dimensao,
  idTemplate,
}: EntradaExportar): Promise<{ dataUrl: string; nomeArquivo: string }> {
  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(no, {
    width: dimensao.largura,
    height: dimensao.altura,
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: "#0A0A0B",
    style: {
      transform: "none",
    },
  });

  return {
    dataUrl,
    nomeArquivo: montarNomeArquivo(idTemplate, dimensao),
  };
}

/**
 * Dispara o download no navegador a partir de um dataURL.
 * Mantido separado da captura para facilitar testes e reuso.
 */
export function baixarDataUrl(dataUrl: string, nomeArquivo: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function montarNomeArquivo(idTemplate: string, dimensao: Dimensao): string {
  const carimbo = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  return `mfgen-${idTemplate}-${dimensao.largura}x${dimensao.altura}-${carimbo}.png`;
}
