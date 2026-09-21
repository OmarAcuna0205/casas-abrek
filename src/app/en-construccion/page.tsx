import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import UnderConstruction from "@/sections/UnderConstruction";

export const metadata: Metadata = {
    title: "Página en construcción | Casas Abrek",
    description:
        "Estamos preparando esta página. Mientras tanto, escríbenos por WhatsApp para recibir información.",
    // es una pagina temporal, no conviene que Google la indexe
    robots: { index: false, follow: true },
};

export default function EnConstruccion() {
    return (
        <>
            <Navbar />
            <main>
                <UnderConstruction />
            </main>
        </>
    );
}
