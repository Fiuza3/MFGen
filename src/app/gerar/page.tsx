"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

import { LogoAnimado } from "@/identidade/LogoAnimado";
import { useEstadoGerador } from "@/compartilhado/hooks/useEstadoGerador";
import { FormularioConteudo } from "@/recursos/editor/componentes/FormularioConteudo";
import { BotaoExportar } from "@/recursos/exportador/componentes/BotaoExportar";
import { SeletorTemplate } from "@/recursos/galeria/componentes/SeletorTemplate";
import { CamposDimensaoCustom } from "@/recursos/proporcao/componentes/CamposDimensaoCustom";
import { SeletorProporcao } from "@/recursos/proporcao/componentes/SeletorProporcao";
import { ID_PROPORCAO_CUSTOM } from "@/recursos/proporcao/tipos";
import { Palco } from "@/recursos/visualizador/componentes/Palco";
import { obterTemplate, obterTemplatePadrao } from "@/templates/registro";

export default function PaginaGerador() {
  const templatePadrao = obterTemplatePadrao();
  const estado = useEstadoGerador(templatePadrao?.meta.id ?? "");
  const Componente =
    (obterTemplate(estado.idTemplate) ?? templatePadrao)?.Componente;

  // Aponta para o nó em dimensão real dentro do palco; é o que o
  // exportador captura para gerar o PNG na resolução pedida.
  const refExportavel = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-full bg-mf-fundo text-mf-texto flex flex-col">
      <header className="border-b border-mf-borda px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Voltar para a apresentação"
          className="inline-flex items-center"
        >
          <LogoAnimado tamanho={22} />
        </Link>
        <span className="font-mono text-xs text-mf-texto-secundario uppercase tracking-widest">
          gerador de imagens
        </span>
      </header>

      <main className="flex flex-1 flex-col lg:grid lg:grid-cols-[420px_1fr] lg:min-h-0">
        {/*
          No mobile o preview vem antes da sidebar (order-1) para o usuário
          ver o que está editando enquanto rola; no desktop o grid coloca
          a sidebar à esquerda naturalmente (order-1) e o preview à direita.
        */}
        <section className="order-1 min-h-[55vh] overflow-hidden bg-mf-superficie lg:order-2 lg:min-h-0">
          {Componente ? (
            <Palco dimensao={estado.dimensao} ref={refExportavel}>
              <Componente
                dimensao={estado.dimensao}
                conteudo={estado.conteudo}
              />
            </Palco>
          ) : (
            <p className="flex h-full items-center justify-center p-8 text-sm text-mf-texto-sutil">
              Nenhum template registrado.
            </p>
          )}
        </section>

        <aside className="order-2 border-t border-mf-borda lg:order-1 lg:overflow-y-auto lg:border-r lg:border-t-0">
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
              refNo={refExportavel}
              dimensao={estado.dimensao}
              idTemplate={estado.idTemplate}
            />
          </Secao>
        </aside>
      </main>
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="border-b border-mf-borda px-6 py-5">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mf-texto-secundario mb-3">
        {titulo}
      </h2>
      {children}
    </div>
  );
}
