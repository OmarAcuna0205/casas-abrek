import type { StaticImageData } from "next/image";
import sinaiImage from "../../public/sinai.png";
import plenitudeImage from "../../public/plenitude.png";
import auroraImage from "../../public/aurora.png";
import armoniaImage from "../../public/armonia.png";

export type Project = {
  id: string;
  name: string;
  // Preventa, Entregada, En construccion, Terrenos...
  status: string;
  // ubicacion o dato corto que acompaña al estado
  detail: string;
  image: StaticImageData;
  alt: string;
  href: string;
  // true = abre WhatsApp o un sitio externo
  external?: boolean;
  // el destacado lleva la barra dorada
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "sinai",
    name: "Casa Sinaí",
    status: "Preventa",
    detail: "Rincón de las Bugambilias",
    image: sinaiImage,
    alt: "Fachada de Casa Sinaí, casa de una planta frente a parque en Rincón de las Bugambilias.",
    href: "/casa-sinai",
    featured: true,
  },
  {
    id: "plenitude",
    name: "Casa Plenitude",
    status: "Vendida",
    detail: "Condesa Rejón II",
    image: plenitudeImage,
    alt: "Fachada de Casa Plenitude, casa de una planta construida por Casas Abrek.",
    href: "/en-construccion",
  },
  {
    id: "aurora",
    name: "Casa Aurora",
    status: "Vendida",
    detail: "Monte Caleres",
    image: auroraImage,
    alt: "Fachada de Casa Aurora, casa de una planta construida por Casas Abrek en Monte Caleres.",
    href: "/en-construccion",
  },
  {
    id: "armonia",
    name: "Casa Armonía",
    status: "Vendida",
    detail: "Bosques del Valle II",
    image: armoniaImage,
    alt: "Fachada de Casa Armonía, casa de dos plantas construida por Casas Abrek en Bosques del Valle II.",
    href: "/en-construccion",
  },
];
