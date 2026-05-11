"use client";

import { proporcoes } from "../catalogo";
import { ID_PROPORCAO_CUSTOM, type IdProporcao } from "../tipos";

type SeletorProporcaoProps = {
  selecionado: IdProporcao;
  aoSelecionar: (id: IdProporcao) => void;
};

/**
 * Mostra os presets de proporção como botões em grade e uma opção
 * extra "Custom" para entrar com dimensões livres.
 */
export function SeletorProporcao({
  selecionado,
  aoSelecionar,
}: SeletorProporcaoProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {proporcoes.map((proporcao) => (
        <BotaoProporcao
          key={proporcao.id}
          ativo={selecionado === proporcao.id}
          rotulo={proporcao.rotulo}
          descricao={`${proporcao.dimensaoPadrao.largura}×${proporcao.dimensaoPadrao.altura}`}
          aoClicar={() => aoSelecionar(proporcao.id)}
        />
      ))}
      <BotaoProporcao
        ativo={selecionado === ID_PROPORCAO_CUSTOM}
        rotulo="Custom"
        descricao="livre"
        aoClicar={() => aoSelecionar(ID_PROPORCAO_CUSTOM)}
      />
    </div>
  );
}

function BotaoProporcao({
  ativo,
  rotulo,
  descricao,
  aoClicar,
}: {
  ativo: boolean;
  rotulo: string;
  descricao: string;
  aoClicar: () => void;
}) {
  const borda = ativo
    ? "border-mf-accent bg-mf-accent-sutil/20"
    : "border-mf-borda hover:border-mf-borda-forte";

  return (
    <button
      type="button"
      onClick={aoClicar}
      className={`${borda} rounded-md border px-3 py-2 text-left transition-colors`}
    >
      <span className="block font-mono text-sm text-mf-texto">{rotulo}</span>
      <span className="block font-mono text-[10px] uppercase tracking-wider text-mf-texto-sutil mt-0.5">
        {descricao}
      </span>
    </button>
  );
}
