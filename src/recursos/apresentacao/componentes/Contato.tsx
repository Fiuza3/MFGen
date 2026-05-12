"use client";

import { motion } from "framer-motion";

import { links } from "../links";

const SUAVE = [0.16, 1, 0.3, 1] as const;

const CARTOES = [
  links.github,
  links.linkedin,
  links.email,
  links.whatsapp,
] as const;

export function Contato() {
  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-mf-accent">
            / canais
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Onde me achar
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARTOES.map((link, i) => (
            <motion.li
              key={link.rotulo}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: SUAVE }}
            >
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex h-full flex-col gap-2 rounded-xl border border-mf-borda bg-mf-superficie p-6 transition-colors hover:border-mf-accent"
              >
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-mf-texto-sutil">
                  {link.rotulo}
                </span>
                <span className="font-mono text-mf-texto group-hover:text-mf-accent">
                  {link.handle}
                </span>
                <span
                  aria-hidden
                  className="mt-auto self-end font-mono text-mf-texto-sutil group-hover:text-mf-accent"
                >
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
