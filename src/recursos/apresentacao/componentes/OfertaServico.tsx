"use client";

import { motion } from "framer-motion";

import { links } from "../links";

const SUAVE = [0.16, 1, 0.3, 1] as const;

export function OfertaServico() {
  return (
    <section className="border-b border-mf-borda px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: SUAVE }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-2xl border border-mf-accent/30 bg-mf-superficie p-10 text-center sm:p-14"
      >
        <span className="font-mono text-xs uppercase tracking-[0.32em] text-mf-accent">
          / um site assim na sua empresa
        </span>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Vendo esse modelo de site sob medida para o seu negócio,
          no estilo da sua marca.
        </h2>
        <p className="max-w-2xl text-mf-texto-secundario">
          Identidade visual, performance e código limpo. Entrego o que você
          está vendo aqui, customizado para a sua empresa — do design ao
          deploy.
        </p>
        <a
          href={links.whatsapp.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-mf-accent px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-mf-fundo transition-colors hover:bg-mf-accent-forte"
        >
          Falar no WhatsApp
          <span aria-hidden>→</span>
        </a>
      </motion.div>
    </section>
  );
}
