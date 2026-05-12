"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { CONTEUDO_INICIAL } from "@/recursos/editor/tipos";
import type { EntradaRegistro } from "@/templates/tipos";

const LADO_PREVIA = 1080;

type CardMiniaturaProps = {
  entrada: EntradaRegistro;
  ativo: boolean;
  aoSelecionar: (id: string) => void;
};

// A miniatura renderiza o próprio componente do template em 1080×1080 e
// aplica scale para caber no card. Como o card é fluido (width: 100% no
// grid), o lado renderizado é medido em runtime — assim não estoura no
// mobile nem desperdiça espaço no desktop.
export function CardMiniatura({
  entrada,
  ativo,
  aoSelecionar,
}: CardMiniaturaProps) {
  const { meta, Componente } = entrada;
  const refQuadro = useRef<HTMLDivElement>(null);
  const [lado, setLado] = useState(0);

  useLayoutEffect(() => {
    const el = refQuadro.current;
    if (!el) return;
    const medir = () => setLado(el.clientWidth);
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const escala = lado === 0 ? 0 : lado / LADO_PREVIA;
  const bordas = ativo
    ? "border-mf-accent ring-1 ring-mf-accent/40"
    : "border-mf-borda hover:border-mf-borda-forte";

  return (
    <button
      type="button"
      onClick={() => aoSelecionar(meta.id)}
      className={`${bordas} group flex w-full flex-col gap-2 rounded-md border bg-mf-superficie p-2 text-left transition-colors`}
    >
      <div
        ref={refQuadro}
        className="pointer-events-none relative w-full overflow-hidden rounded bg-mf-fundo"
        style={{ aspectRatio: "1 / 1" }}
      >
        {escala > 0 && (
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
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <span className="font-mono text-[12px] uppercase tracking-widest text-mf-texto">
          {meta.nome}
        </span>
        <span className="text-[11px] leading-tight text-mf-texto-sutil">
          {meta.descricao}
        </span>
      </div>
    </button>
  );
}
