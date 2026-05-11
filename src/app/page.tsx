"use client";

import { useRef } from "react";

import { Logo } from "@/identidade/Logo";
import { usarEstadoGerador } from "@/compartilhado/hooks/usarEstadoGerador";
import { FormularioConteudo } from "@/recursos/editor/componentes/FormularioConteudo";
import { BotaoExportar } from "@/recursos/exportador/componentes/BotaoExportar";
import { SeletorTemplate } from "@/recursos/galeria/componentes/SeletorTemplate";
import { CamposDimensaoCustom } from "@/recursos/proporcao/componentes/CamposDimensaoCustom";
import { SeletorProporcao } from "@/recursos/proporcao/componentes/SeletorProporcao";
import { ID_PROPORCAO_CUSTOM } from "@/recursos/proporcao/tipos";
import { Palco } from "@/recursos/visualizador/componentes/Palco";
import { obterTemplatePadrao, obterTemplate } from "@/templates/registro";

/**
 * Página única do gerador. Define a estrutura visual em três seções:
 * — galeria de templates,
 * — editor (proporção + conteúdo),
 * — visualizador (preview + exportar).
 */
export default function PaginaGerador() {
  const templatePadrao = obterTemplatePadrao();
  const estado = usarEstadoGerador({
    idTemplateInicial: templatePadrao?.meta.id ?? "",
  });
  const entradaAtual = obterTemplate(estado.idTemplate) ?? templatePadrao;
  const Componente = entradaAtual?.Componente;

  /**
   * Aponta para o nó renderizado em dimensão real dentro do palco.
   * Será usado pelo botão exportar no próximo commit.
   */
  const refNoExportavel = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-full bg-mf-fundo text-mf-texto flex flex-col">
      <header className="border-b border-mf-borda px-6 py-4 flex items-center justify-between">
        <Logo tamanho={22} corSigla="#10B981" />
        <span className="font-mono text-xs text-mf-texto-secundario uppercase tracking-widest">
          gerador de imagens
        </span>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-0">
        <aside className="border-b lg:border-b-0 lg:border-r border-mf-borda overflow-y-auto">
          <Secao titulo="Galeria">
            <SeletorTemplate
              selecionado={estado.idTemplate}
              aoSelecionar={estado.selecionarTemplate}
            />
          </Secao>

          <Secao titulo="Proporção">
            <div className="flex flex-col gap-3">
              <SeletorProporcao
                selecionado={estado.idProporcao}
                aoSelecionar={estado.selecionarProporcao}
              />
              {estado.idProporcao === ID_PROPORCAO_CUSTOM && (
                <CamposDimensaoCustom
                  dimensao={estado.dimensao}
                  aoMudar={estado.definirDimensao}
                />
              )}
              <span className="font-mono text-[11px] uppercase tracking-widest text-mf-texto-sutil">
                {estado.dimensao.largura} × {estado.dimensao.altura} px
              </span>
            </div>
          </Secao>

          <Secao titulo="Conteúdo">
            <FormularioConteudo
              conteudo={estado.conteudo}
              aoMudar={estado.atualizarConteudo}
            />
          </Secao>

          <Secao titulo="Exportar">
            <BotaoExportar
              refNo={refNoExportavel}
              dimensao={estado.dimensao}
              idTemplate={estado.idTemplate}
            />
          </Secao>
        </aside>

        <section className="bg-mf-superficie min-h-0 overflow-hidden">
          {Componente ? (
            <Palco dimensao={estado.dimensao} ref={refNoExportavel}>
              <Componente
                dimensao={estado.dimensao}
                conteudo={estado.conteudo}
              />
            </Palco>
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <Espacador descricao="Nenhum template registrado." />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-mf-borda px-6 py-5">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mf-texto-secundario mb-3">
        {titulo}
      </h2>
      <div>{children}</div>
    </div>
  );
}

function Espacador({ descricao }: { descricao: string }) {
  return (
    <div className="rounded-md border border-dashed border-mf-borda-forte bg-mf-superficie-elevada/40 px-4 py-3 text-sm text-mf-texto-sutil">
      {descricao}
    </div>
  );
}
