import type { Metadata } from "next";
import Quiz from "@/sections/quiz/Quiz";

export const metadata: Metadata = {
    title: "¿Casa Sinaí es para ti? | Casas Abrek",
    description:
        "Responde 6 preguntas en menos de un minuto y descubre si Casa Sinaí se ajusta a lo que buscas.",
    alternates: { canonical: "/descubre" },
};

export default function Descubre() {
    return <Quiz />;
}
