"use client";

import { useCallback, useMemo, useState } from "react";

import { CONTEUDO_INICIAL, type Conteudo } from "@/recursos/editor/tipos";
import {
  encontrarProporcao,
  PROPORCAO_PADRAO,
} from "@/recursos/proporcao/catalogo";
import {
  ID_PROPORCAO_CUSTOM,
  type Dimensao,
  type IdProporcao,
} from "@/recursos/proporcao/tipos";

type EntradaUsarEstadoGerador = {
  idTemplateInicial: string;
};

export type EstadoGerador = {
  idTemplate: string;
  idProporcao: IdProporcao;
  dimensao: Dimensao;
  conteudo: Conteudo;
  selecionarTemplate: (id: string) => void;
  selecionarProporcao: (id: IdProporcao) => void;
  definirDimensao: (dimensao: Dimensao) => void;
  atualizarConteudo: (parcial: Partial<Conteudo>) => void;
};

/**
 * Estado central do gerador. Concentra template selecionado, dimensão da
 * imagem e conteúdo dos campos editáveis num único hook para evitar
 * prop-drilling entre as seções da página (galeria, editor, visualizador).
 *
 * Se um dia o app crescer (histórico, múltiplas imagens, persistência),
 * a troca para Zustand é trocar a implementação interna mantendo a API.
 */
export function usarEstadoGerador({
  idTemplateInicial,
}: EntradaUsarEstadoGerador): EstadoGerador {
  const [idTemplate, setIdTemplate] = useState<string>(idTemplateInicial);
  const [idProporcao, setIdProporcao] = useState<IdProporcao>(
    PROPORCAO_PADRAO.id,
  );
  const [dimensao, setDimensao] = useState<Dimensao>(
    PROPORCAO_PADRAO.dimensaoPadrao,
  );
  const [conteudo, setConteudo] = useState<Conteudo>(CONTEUDO_INICIAL);

  const selecionarTemplate = useCallback((id: string) => {
    setIdTemplate(id);
  }, []);

  const selecionarProporcao = useCallback((id: IdProporcao) => {
    setIdProporcao(id);
    if (id === ID_PROPORCAO_CUSTOM) {
      return;
    }
    const proporcao = encontrarProporcao(id);
    if (proporcao) {
      setDimensao(proporcao.dimensaoPadrao);
    }
  }, []);

  const definirDimensao = useCallback((nova: Dimensao) => {
    setDimensao(nova);
  }, []);

  const atualizarConteudo = useCallback((parcial: Partial<Conteudo>) => {
    setConteudo((atual) => ({ ...atual, ...parcial }));
  }, []);

  return useMemo<EstadoGerador>(
    () => ({
      idTemplate,
      idProporcao,
      dimensao,
      conteudo,
      selecionarTemplate,
      selecionarProporcao,
      definirDimensao,
      atualizarConteudo,
    }),
    [
      idTemplate,
      idProporcao,
      dimensao,
      conteudo,
      selecionarTemplate,
      selecionarProporcao,
      definirDimensao,
      atualizarConteudo,
    ],
  );
}
