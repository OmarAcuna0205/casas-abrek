import type { Metadata } from "next";
import ProjectPage, { type ProjectPageData } from "@/components/ProjectPage";
import plenitudeImage from "../../../public/plenitude.jpg";
import imageOne from "../../../public/plenitude1.jpg";
import imageTwo from "../../../public/plenitude2.jpg";
import imageThree from "../../../public/plenitude3.jpg";

export const metadata: Metadata = {
    title: "Casa Plenitude | Casas Abrek",
    description:
        "Casa de una planta frente a parque en Condesa Rejón II, Chihuahua, construida por Casas Abrek. Conoce sus espacios y cotiza la tuya.",
};

const plenitude: ProjectPageData = {
    name: "Casa Plenitude",
    hero: {
        image: plenitudeImage,
        alt: "Fachada de Casa Plenitude, casa de una planta en Condesa Rejón II",
        position: "15% 55%",
    },
    images: [
        { image: imageOne, alt: "Cocina de Casa Plenitude con gabinetes de madera, cubierta de granito negro e isla con base de listones" },
        { image: imageTwo, alt: "Pasillo de Casa Plenitude con muros de molduras, piso tipo mármol y puertas de madera" },
        { image: imageThree, alt: "Acceso de Casa Plenitude con puerta de listones negros, pérgola y muro de piedra" },
    ],
    details: [
        { label: "Ubicación", value: "Condesa Rejón II, Chihuahua" },
        { label: "Estatus", value: "Vendida" },
        { label: "Tipología", value: "Casa de una planta" },
    ],
    concept:
        "Una casa de una planta frente a parque, con cocina en madera y granito, muros de molduras y una fachada que combina piedra, listones y pérgola.",
};

export default function CasaPlenitude() {
    return <ProjectPage project={plenitude} />;
}
