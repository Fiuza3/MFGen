/**
 * Campos editáveis pelo usuário e consumidos pelos templates.
 * Nem todo template usa todos os campos — cada template declara o que
 * consome em seu meta.ts. O estado guarda o conjunto completo para que
 * trocar de template não apague o que já foi digitado.
 */
export type Conteudo = {
  titulo: string;
  subtitulo: string;
  tag: string;
};

export const CONTEUDO_INICIAL: Conteudo = {
  titulo: "",
  subtitulo: "",
  tag: "",
};

export type CampoConteudo = keyof Conteudo;
