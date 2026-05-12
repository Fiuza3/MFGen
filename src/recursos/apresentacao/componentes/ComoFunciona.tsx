"use client";

import { motion } from "framer-motion";

type Passo = {
  numero: string;
  titulo: string;
  descricao: string;
};

const PASSOS: readonly Passo[] = [
  {
    numero: "01",
    titulo: "Escolha um template",
    descricao:
      "Galeria com posts de feed, story, anúncio para OLX, carrossel, marca e variantes dev.",
  },
  {
    numero: "02",
    titulo: "Defina o tamanho",
    descricao:
      "Presets 1:1, 9:16, 16:9 ou dimensão custom de até 4096px. O preview escala em tempo real.",
  },
  {
    numero: "03",
    titulo: "Customize o conteúdo",
    descricao:
      "Tag, título, subtítulo, CTA, contato e preço. Cada template usa o que faz sentido.",
  },
  {
    numero: "04",
    titulo: "Exporte PNG",
    descricao:
      "Captura na resolução exata pedida — direto do navegador, sem upload, sem espera.",
  },
] as const;

const SUAVE = [0.16, 1, 0.3, 1] as const;

export function ComoFunciona() {
  return (
    <section className="border-b border-mf-borda px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <CabecalhoSecao
          etiqueta="passo a passo"
          titulo="Como funciona"
          texto="Quatro passos, um arquivo PNG no final. Sem cadastro, sem fila."
        />
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PASSOS.map((passo, i) => (
            <motion.li
              key={passo.numero}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: SUAVE }}
              className="rounded-xl border border-mf-borda bg-mf-superficie p-6"
            >
              <span className="font-mono text-sm tracking-widest text-mf-accent">
                {passo.numero}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-mf-texto">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mf-texto-secundario">
                {passo.descricao}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CabecalhoSecao({
  etiqueta,
  titulo,
  texto,
}: {
  etiqueta: string;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.32em] text-mf-accent">
        / {etiqueta}
      </span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {titulo}
      </h2>
      <p className="max-w-2xl text-mf-texto-secundario">{texto}</p>
    </div>
  );
}
