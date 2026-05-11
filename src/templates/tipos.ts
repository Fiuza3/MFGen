import type { ComponentType } from "react";

import type { CampoConteudo, Conteudo } from "@/recursos/editor/tipos";
import type { Dimensao } from "@/recursos/proporcao/tipos";

/**
 * Props recebidas por todo template. O componente é sempre renderizado
 * na dimensão real (em pixels) — quem aplica escala visual para preview
 * é o palco, não o template.
 */
export type PropsTemplate = {
  dimensao: Dimensao;
  conteudo: Conteudo;
};

export type ComponenteTemplate = ComponentType<PropsTemplate>;

/**
 * Metadados de um template. `camposUsados` permite à UI sinalizar quais
 * campos do formulário esse template realmente consome (futuro: ocultar
 * ou destacar campos não usados).
 */
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
