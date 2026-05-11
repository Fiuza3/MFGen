import type { MetadadosTemplate } from "../tipos";

export const metaCommit: MetadadosTemplate = {
  id: "commit",
  nome: "Commit",
  descricao: "Linha de commit log com hash, branch e mensagem",
  camposUsados: ["tag", "titulo", "subtitulo"],
};
