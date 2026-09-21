import type { Metadata } from "next";

// la pagina es "use client" y no puede exportar metadata; por eso va aqui
export const metadata: Metadata = {
    title: "Casa Sinaí | Preventa en Rincón de las Bugambilias, Chihuahua",
    description:
        "Casa de una planta frente a parque, con doble altura y 152 m² de construcción. Precio de preventa: $5,100,000 MXN. Solicita la presentación.",
    alternates: { canonical: "/casa-sinai" },
};

export default function CasaSinaiLayout({ children }: LayoutProps<"/casa-sinai">) {
    return children;
}
