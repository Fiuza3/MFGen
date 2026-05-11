import { toPng } from "html-to-image";

import { cores } from "@/identidade/cores";
import type { Dimensao } from "@/recursos/proporcao/tipos";

type EntradaExportar = {
  no: HTMLElement;
  dimensao: Dimensao;
  idTemplate: string;
};

export async function exportarComoPng({
  no,
  dimensao,
  idTemplate,
}: EntradaExportar): Promise<{ dataUrl: string; nomeArquivo: string }> {
  // Sem esperar as fontes, o PNG sai com fallback genérico em vez da
  // tipografia da marca.
  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(no, {
    width: dimensao.largura,
    height: dimensao.altura,
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: cores.fundo,
    style: { transform: "none" },
  });

  return { dataUrl, nomeArquivo: nomeArquivoFor(idTemplate, dimensao) };
}

export function baixarDataUrl(dataUrl: string, nomeArquivo: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function nomeArquivoFor(idTemplate: string, dimensao: Dimensao): string {
  const carimbo = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return `mfgen-${idTemplate}-${dimensao.largura}x${dimensao.altura}-${carimbo}.png`;
}
