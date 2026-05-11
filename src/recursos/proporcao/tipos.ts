/**
 * Dimensão de uma imagem em pixels. Sempre representada na resolução real
 * que será exportada (o preview faz a escala visual em runtime).
 */
export type Dimensao = {
  largura: number;
  altura: number;
};

/**
 * Preset de proporção predefinido (1:1, 9:16, etc) com sua dimensão padrão.
 * O usuário pode partir do preset e ajustar a dimensão se quiser.
 */
export type Proporcao = {
  id: string;
  rotulo: string;
  descricao: string;
  dimensaoPadrao: Dimensao;
};

/** Identificador especial para a opção de dimensão totalmente customizada. */
export const ID_PROPORCAO_CUSTOM = "custom" as const;

export type IdProporcao = Proporcao["id"] | typeof ID_PROPORCAO_CUSTOM;
