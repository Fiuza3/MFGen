import type { ComponentType } from "react";

import type { CampoConteudo, Conteudo } from "@/recursos/editor/tipos";
import type { Dimensao } from "@/recursos/proporcao/tipos";

export type PropsTemplate = {
  dimensao: Dimensao;
  conteudo: Conteudo;
};

export type ComponenteTemplate = ComponentType<PropsTemplate>;

export type MetadadosTemplate = {
  id: string;
  nome: string;
  descricao: string;
  camposUsados: readonly CampoConteudo[];
};

export type EntradaRegistro = {
  meta: MetadadosTemplate;
  Componente: ComponenteTemplate;
};
