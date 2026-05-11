import type { EntradaRegistro } from "./tipos";

/**
 * Lista única de templates disponíveis no app. Para adicionar um novo
 * template, crie a pasta `src/templates/<id>/` com seu componente e
 * meta, e adicione a entrada aqui — nenhum outro arquivo precisa mudar.
 */
export const templates: readonly EntradaRegistro[] = [
  // Preenchido pelos próximos commits, conforme cada template é criado.
] as const;

export function obterTemplate(id: string): EntradaRegistro | undefined {
  return templates.find((t) => t.meta.id === id);
}

export function obterTemplatePadrao(): EntradaRegistro | undefined {
  return templates[0];
}
