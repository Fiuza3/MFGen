export type Conteudo = {
  titulo: string;
  subtitulo: string;
  tag: string;
  cta: string;
  contato: string;
  preco: string;
};

export type CampoConteudo = keyof Conteudo;

export const CONTEUDO_INICIAL: Conteudo = {
  titulo: "",
  subtitulo: "",
  tag: "",
  cta: "",
  contato: "",
  preco: "",
};
