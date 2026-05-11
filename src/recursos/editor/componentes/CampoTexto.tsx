"use client";

import type { ChangeEvent } from "react";

type CampoTextoProps = {
  rotulo: string;
  valor: string;
  aoMudar: (novo: string) => void;
  placeholder?: string;
  /** Limite suave de caracteres exibido como contador. */
  maximo?: number;
  mono?: boolean;
};

export function CampoTexto({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  maximo,
  mono = false,
}: CampoTextoProps) {
  const aoDigitar = (evento: ChangeEvent<HTMLInputElement>) => {
    aoMudar(evento.target.value);
  };

  const fonte = mono ? "font-mono" : "font-sans";
  const restante = maximo !== undefined ? maximo - valor.length : undefined;

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-mf-texto-secundario">
        {rotulo}
      </span>
      <input
        type="text"
        value={valor}
        onChange={aoDigitar}
        placeholder={placeholder}
        maxLength={maximo}
        className={`${fonte} bg-mf-superficie border border-mf-borda rounded-md px-3 py-2 text-sm text-mf-texto placeholder:text-mf-texto-sutil focus:outline-none focus:border-mf-accent transition-colors`}
      />
      {restante !== undefined && (
        <span className="text-[11px] text-mf-texto-sutil self-end font-mono">
          {restante} restantes
        </span>
      )}
    </label>
  );
}
