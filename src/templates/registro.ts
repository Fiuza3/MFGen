import { CommitCard } from "./commit/CommitCard";
import { metaCommit } from "./commit/meta";
import { Tag } from "./tag/Tag";
import { metaTag } from "./tag/meta";
import { Terminal } from "./terminal/Terminal";
import { metaTerminal } from "./terminal/meta";
import type { EntradaRegistro } from "./tipos";

/**
 * Lista única de templates disponíveis no app. Para adicionar um novo
 * template, crie a pasta `src/templates/<id>/` com seu componente e
 * meta, e adicione a entrada aqui — nenhum outro arquivo precisa mudar.
 */
export const templates: readonly EntradaRegistro[] = [
  { meta: metaTerminal, Componente: Terminal },
  { meta: metaCommit, Componente: CommitCard },
  { meta: metaTag, Componente: Tag },
] as const;

export function obterTemplate(id: string): EntradaRegistro | undefined {
  return templates.find((t) => t.meta.id === id);
}

export function obterTemplatePadrao(): EntradaRegistro | undefined {
  return templates[0];
}
