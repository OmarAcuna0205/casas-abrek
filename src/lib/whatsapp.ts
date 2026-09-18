import { site } from "@/data/site";

export function whatsappLink(message: string) {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const quoteLink = whatsappLink(
    "Hola, me gustaría cotizar la construcción de mi casa."
);

export const buildLink = whatsappLink(
    "Hola, tengo un terreno y quiero construir mi casa. ¿Me pueden dar información?"
);
