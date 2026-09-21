import type { Metadata } from "next";
import ProjectPage, { type ProjectPageData } from "@/components/ProjectPage";
import armoniaImage from "../../../public/armonia.jpg";
import imageOne from "../../../public/armonia1.jpg";
import imageTwo from "../../../public/armonia2.jpg";
import imageThree from "../../../public/armonia3.jpg";
import imageFour from "../../../public/armonia4.jpg";
import imageFive from "../../../public/armonia5.jpg";

export const metadata: Metadata = {
    title: "Casa Armonía | Casas Abrek",
    description:
        "Casa de dos plantas en Bosques del Valle II, Chihuahua, construida por Casas Abrek. Conoce sus espacios y cotiza la tuya.",
};

const armonia: ProjectPageData = {
    name: "Casa Armonía",
    hero: {
        image: armoniaImage,
        alt: "Fachada de Casa Armonía, casa de dos plantas en Bosques del Valle II",
        position: "64% 25%",
    },
    images: [
        { image: imageOne, alt: "Sala de doble altura de Casa Armonía, con chimenea y comedor" },
        { image: imageTwo, alt: "Cocina de Casa Armonía con cubierta de granito y gabinetes en dos tonos" },
        { image: imageThree, alt: "Escalera flotante sobre muro de ladrillo y desnivel hacia la estancia de Casa Armonía" },
        { image: imageFour, alt: "Estancia de doble altura con muro de ladrillo aparente en Casa Armonía" },
        { image: imageFive, alt: "Comedor y sala de Casa Armonía con ventanales hacia el exterior" },
    ],
    details: [
        { label: "Ubicación", value: "Bosques del Valle II, Chihuahua" },
        { label: "Estatus", value: "Vendida" },
        { label: "Tipología", value: "Casa de dos plantas" },
    ],
    concept:
        "Una casa de dos plantas con dobles alturas, muros de ladrillo aparente y ventanales que llenan de luz la sala y el comedor.",
};

export default function CasaArmonia() {
    return <ProjectPage project={armonia} />;
}
