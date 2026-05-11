"use client";

import { CONTEUDO_INICIAL } from "@/recursos/editor/tipos";
import type { EntradaRegistro } from "@/templates/tipos";

const LADO_PREVIA = 1080;
const LADO_RENDERIZADO = 168;

type CardMiniaturaProps = {
  entrada: EntradaRegistro;
  ativo: boolean;
  aoSelecionar: (id: string) => void;
};

// A miniatura usa o próprio componente do template e escala para caber
// no card. Mantém uma única fonte da verdade para o visual em vez de
// pintar miniaturas estáticas que descasariam ao mexer no template.
export function CardMiniatura({
  entrada,
  ativo,
  aoSelecionar,
}: CardMiniaturaProps) {
  const { meta, Componente } = entrada;
  const escala = LADO_RENDERIZADO / LADO_PREVIA;
  const bordas = ativo
    ? "border-mf-accent ring-1 ring-mf-accent/40"
    : "border-mf-borda hover:border-mf-borda-forte";

  return (
    <button
      type="button"
      onClick={() => aoSelecionar(meta.id)}
      className={`${bordas} group flex flex-col gap-2 rounded-md border bg-mf-superficie p-2 text-left transition-colors`}
    >
      <div
        style={{
          width: LADO_RENDERIZADO,
          height: LADO_RENDERIZADO,
          overflow: "hidden",
          borderRadius: 6,
          background: "#0a0a0b",
        }}
        className="pointer-events-none"
      >
        <div
          style={{
            width: LADO_PREVIA,
            height: LADO_PREVIA,
            transform: `scale(${escala})`,
            transformOrigin: "top left",
          }}
        >
          <Componente
            dimensao={{ largura: LADO_PREVIA, altura: LADO_PREVIA }}
            conteudo={CONTEUDO_INICIAL}
          />
        </div>
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <span className="font-mono text-[12px] uppercase tracking-widest text-mf-texto">
          {meta.nome}
        </span>
        <span className="text-[11px] text-mf-texto-sutil leading-tight">
          {meta.descricao}
        </span>
      </div>
    </button>
  );
}
