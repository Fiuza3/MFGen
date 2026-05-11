"use client";

import type { ChangeEvent } from "react";

type CampoTextoAreaProps = {
  rotulo: string;
  valor: string;
  aoMudar: (novo: string) => void;
  placeholder?: string;
  maximo?: number;
  linhas?: number;
};

export function CampoTextoArea({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  maximo,
  linhas = 3,
}: CampoTextoAreaProps) {
  const aoDigitar = (evento: ChangeEvent<HTMLTextAreaElement>) => {
    aoMudar(evento.target.value);
  };

  const restante = maximo !== undefined ? maximo - valor.length : undefined;

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-mf-texto-secundario">
        {rotulo}
      </span>
      <textarea
        value={valor}
        onChange={aoDigitar}
        placeholder={placeholder}
        maxLength={maximo}
        rows={linhas}
        className="font-sans bg-mf-superficie border border-mf-borda rounded-md px-3 py-2 text-sm text-mf-texto placeholder:text-mf-texto-sutil focus:outline-none focus:border-mf-accent transition-colors resize-none"
      />
      {restante !== undefined && (
        <span className="text-[11px] text-mf-texto-sutil self-end font-mono">
          {restante} restantes
        </span>
      )}
    </label>
  );
}
