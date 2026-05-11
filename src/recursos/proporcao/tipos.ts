export type Dimensao = {
  largura: number;
  altura: number;
};

export type Proporcao = {
  id: string;
  rotulo: string;
  descricao: string;
  dimensaoPadrao: Dimensao;
};

export const ID_PROPORCAO_CUSTOM = "custom" as const;

export type IdProporcao = Proporcao["id"] | typeof ID_PROPORCAO_CUSTOM;
