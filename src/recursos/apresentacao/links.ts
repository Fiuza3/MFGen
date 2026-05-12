// Mensagem pré-preenchida no WhatsApp para o CTA da landing.
const MENSAGEM_WHATSAPP = encodeURIComponent(
  "Oi Marcus! Vi o MFgen e quero um site no estilo da minha empresa.",
);

const TELEFONE_WHATSAPP = "5531972379038";

export const links = {
  github: {
    rotulo: "GitHub",
    handle: "fiuza3",
    href: "https://github.com/fiuza3",
  },
  linkedin: {
    rotulo: "LinkedIn",
    handle: "devfiuza",
    href: "https://www.linkedin.com/in/devfiuza",
  },
  email: {
    rotulo: "E-mail",
    handle: "devfiuza@gmail.com",
    href: "mailto:devfiuza@gmail.com",
  },
  whatsapp: {
    rotulo: "WhatsApp",
    handle: "(31) 97237-9038",
    href: `https://wa.me/${TELEFONE_WHATSAPP}?text=${MENSAGEM_WHATSAPP}`,
  },
} as const;
