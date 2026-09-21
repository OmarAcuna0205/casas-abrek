import type { Metadata } from "next";
import ProjectPage, { type ProjectPageData } from "@/components/ProjectPage";
import auroraImage from "../../../public/aurora.jpg";
import imageOne from "../../../public/aurora1.jpg";
import imageTwo from "../../../public/aurora2.jpg";
import imageThree from "../../../public/aurora3.jpg";
import imageFour from "../../../public/aurora4.jpg";
import imageFive from "../../../public/aurora5.jpg";
import imageSix from "../../../public/aurora6.jpg";
import imageSeven from "../../../public/aurora7.jpg";
import imageEight from "../../../public/aurora8.jpg";
import imageNine from "../../../public/aurora9.jpg";
import imageTen from "../../../public/aurora10.jpg";

export const metadata: Metadata = {
    title: "Casa Aurora | Casas Abrek",
    description:
        "Casa de una planta en Monte Caleres, Chihuahua, construida por Casas Abrek. Conoce sus espacios y cotiza la tuya.",
};

const aurora: ProjectPageData = {
    name: "Casa Aurora",
    hero: {
        image: auroraImage,
        alt: "Fachada de Casa Aurora, casa de una planta en Monte Caleres",
        position: "64% 40%",
    },
    images: [
        { image: imageOne, alt: "Sala de Casa Aurora con muro de molduras y ventanal con vista a la sierra" },
        { image: imageTwo, alt: "Sala y comedor de Casa Aurora abiertos a la cocina con isla" },
        { image: imageThree, alt: "Cocina de Casa Aurora con isla y gabinetes de madera en dos tonos" },
        { image: imageFour, alt: "Baño de Casa Aurora con regadera en azulejo oscuro y lavabo sobre mueble de madera" },
        { image: imageFive, alt: "Recámara de Casa Aurora con piso de madera y dos ventanas verticales" },
        { image: imageSix, alt: "Recámara de Casa Aurora con clóset de madera de piso a techo" },
        { image: imageSeven, alt: "Recámara principal de Casa Aurora con vestidor y puerta corrediza al patio" },
        { image: imageEight, alt: "Lavabo de Casa Aurora frente a un muro oscuro, con el baño al fondo" },
        { image: imageNine, alt: "Baño de Casa Aurora con azulejo blanco ondulado y regadera en tono oscuro" },
        { image: imageTen, alt: "Patio trasero de Casa Aurora con andador de concreto" },
    ],
    details: [
        { label: "Ubicación", value: "Monte Caleres, Chihuahua" },
        { label: "Estatus", value: "Vendida" },
        { label: "Tipología", value: "Casa de una planta" },
    ],
    concept:
        "Una casa de una planta con fachada de piedra y madera, sala, comedor y cocina abiertos, y ventanales con vista a la sierra.",
};

export default function CasaAurora() {
    return <ProjectPage project={aurora} />;
}
