"use client";

import { useState } from "react";

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

export function usarEstadoGerador(idTemplateInicial: string): EstadoGerador {
  const [idTemplate, setIdTemplate] = useState(idTemplateInicial);
  const [idProporcao, setIdProporcao] = useState<IdProporcao>(
    PROPORCAO_PADRAO.id,
  );
  const [dimensao, setDimensao] = useState<Dimensao>(
    PROPORCAO_PADRAO.dimensaoPadrao,
  );
  const [conteudo, setConteudo] = useState<Conteudo>(CONTEUDO_INICIAL);

  const selecionarProporcao = (id: IdProporcao) => {
    setIdProporcao(id);
    if (id === ID_PROPORCAO_CUSTOM) return;
    const proporcao = encontrarProporcao(id);
    if (proporcao) setDimensao(proporcao.dimensaoPadrao);
  };

  const atualizarConteudo = (parcial: Partial<Conteudo>) => {
    setConteudo((atual) => ({ ...atual, ...parcial }));
  };

  return {
    idTemplate,
    idProporcao,
    dimensao,
    conteudo,
    selecionarTemplate: setIdTemplate,
    selecionarProporcao,
    definirDimensao: setDimensao,
    atualizarConteudo,
  };
}
