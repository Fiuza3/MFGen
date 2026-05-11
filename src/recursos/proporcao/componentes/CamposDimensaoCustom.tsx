"use client";

import type { ChangeEvent } from "react";

import {
  LIMITE_DIMENSAO_MAXIMA,
  LIMITE_DIMENSAO_MINIMA,
} from "../catalogo";
import type { Dimensao } from "../tipos";

type CamposDimensaoCustomProps = {
  dimensao: Dimensao;
  aoMudar: (dimensao: Dimensao) => void;
};

/**
 * Dois inputs numéricos lado a lado para largura e altura no modo custom.
 * Valores fora dos limites do catálogo são clampados antes de propagar.
 */
export function CamposDimensaoCustom({
  dimensao,
  aoMudar,
}: CamposDimensaoCustomProps) {
  const aoEditar = (campo: keyof Dimensao) => (evento: ChangeEvent<HTMLInputElement>) => {
    const bruto = Number(evento.target.value);
    if (!Number.isFinite(bruto)) {
      return;
    }
    const limitado = Math.min(
      LIMITE_DIMENSAO_MAXIMA,
      Math.max(LIMITE_DIMENSAO_MINIMA, Math.round(bruto)),
    );
    aoMudar({ ...dimensao, [campo]: limitado });
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <CampoNumero
        rotulo="Largura"
        valor={dimensao.largura}
        aoMudar={aoEditar("largura")}
      />
      <CampoNumero
        rotulo="Altura"
        valor={dimensao.altura}
        aoMudar={aoEditar("altura")}
      />
    </div>
  );
}

function CampoNumero({
  rotulo,
  valor,
  aoMudar,
}: {
  rotulo: string;
  valor: number;
  aoMudar: (evento: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-mf-texto-secundario">
        {rotulo}
      </span>
      <input
        type="number"
        min={LIMITE_DIMENSAO_MINIMA}
        max={LIMITE_DIMENSAO_MAXIMA}
        step={1}
        value={valor}
        onChange={aoMudar}
        className="font-mono bg-mf-superficie border border-mf-borda rounded-md px-3 py-2 text-sm text-mf-texto focus:outline-none focus:border-mf-accent transition-colors"
      />
    </label>
  );
}
