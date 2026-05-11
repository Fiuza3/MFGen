export type Conteudo = {
  titulo: string;
  subtitulo: string;
  tag: string;
};

export type CampoConteudo = keyof Conteudo;

export const CONTEUDO_INICIAL: Conteudo = {
  titulo: "",
  subtitulo: "",
  tag: "",
};
