import { AnuncioOlx } from "./anuncio-olx/AnuncioOlx";
import { metaAnuncioOlx } from "./anuncio-olx/meta";
import { CarrosselCapa } from "./carrossel-capa/CarrosselCapa";
import { metaCarrosselCapa } from "./carrossel-capa/meta";
import { CodeBlock } from "./code-block/CodeBlock";
import { metaCodeBlock } from "./code-block/meta";
import { CommitCard } from "./commit/CommitCard";
import { metaCommit } from "./commit/meta";
import { PostInstagram } from "./post-instagram/PostInstagram";
import { metaPostInstagram } from "./post-instagram/meta";
import { StoryReels } from "./story-reels/StoryReels";
import { metaStoryReels } from "./story-reels/meta";
import { Tag } from "./tag/Tag";
import { metaTag } from "./tag/meta";
import { Terminal } from "./terminal/Terminal";
import { metaTerminal } from "./terminal/meta";
import type { EntradaRegistro } from "./tipos";

// Único ponto que conhece o conjunto de templates disponíveis.
// Adicionar um novo template é só uma linha aqui.
export const templates: readonly EntradaRegistro[] = [
  { meta: metaPostInstagram, Componente: PostInstagram },
  { meta: metaStoryReels, Componente: StoryReels },
  { meta: metaAnuncioOlx, Componente: AnuncioOlx },
  { meta: metaCarrosselCapa, Componente: CarrosselCapa },
  { meta: metaTerminal, Componente: Terminal },
  { meta: metaCommit, Componente: CommitCard },
  { meta: metaTag, Componente: Tag },
  { meta: metaCodeBlock, Componente: CodeBlock },
] as const;

export function obterTemplate(id: string): EntradaRegistro | undefined {
  return templates.find((t) => t.meta.id === id);
}

export function obterTemplatePadrao(): EntradaRegistro | undefined {
  return templates[0];
}
