"use client";

import { templates } from "@/templates/registro";

import { CardMiniatura } from "./CardMiniatura";

type SeletorTemplateProps = {
  selecionado: string;
  aoSelecionar: (id: string) => void;
};

export function SeletorTemplate({
  selecionado,
  aoSelecionar,
}: SeletorTemplateProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((entrada) => (
        <CardMiniatura
          key={entrada.meta.id}
          entrada={entrada}
          ativo={entrada.meta.id === selecionado}
          aoSelecionar={aoSelecionar}
        />
      ))}
    </div>
  );
}
