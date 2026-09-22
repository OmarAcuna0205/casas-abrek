"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import comprarImage from "../../public/comprar.jpg";
import construirImage from "../../public/construir.jpg";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ease = [0.25, 1, 0.35, 1] as const;

const rise = (delay: number) => ({
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } },
});

// en desktop los paneles van lado a lado y "Construir" entra despues de "Comprar";
// en movil van apilados, cada uno se anima al llegar a el y no necesita esperar
const desktopQuery = "(min-width: 768px)";

const comprar = [
    "Pagas un precio cerrado",
    "Pagas por cosas que no necesitas",
    "Es difícil modificarla o ampliarla",
    "Terminas pagando más por menos",
];

const construir = [
    "Empiezas desde tu presupuesto",
    "Decides qué sí y qué no",
    "Puedes ampliarla después",
    "Mejor relación costo-beneficio",
];

type PanelProps = {
    title: string;
    items: string[];
    image: StaticImageData;
    featured?: boolean;
    delay: number;
    className?: string;
};

function Panel({
    title,
    items,
    image,
    featured = false,
    delay,
    className = "",
}: PanelProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className={`group relative overflow-hidden py-12 lg:py-15 ${className}`}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 1.08, filter: "grayscale(0)" },
                    show: {
                        opacity: 1,
                        scale: 1,
                        // comprar: el color se va apagando despues de aparecer
                        filter: featured ? "grayscale(0)" : "grayscale(1)",
                        transition: {
                            duration: 1.6,
                            delay,
                            ease,
                            filter: {
                                duration: 2,
                                delay: delay + 0.8,
                                ease: "easeInOut",
                            },
                        },
                    },
                }}
                className="absolute inset-0"
            >
                <Image
                    src={image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder="blur"
                    draggable={false}
                    className={`pointer-events-none select-none object-cover transition-transform duration-1000 ease-out ${featured
                        ? "scale-105 md:scale-100 md:group-hover:scale-105"
                        : "md:scale-105 md:group-hover:scale-100"
                        }`}
                />
            </motion.div>

            {/* hover: construir se ilumina, comprar se apaga. En movil no hay hover, asi que se queda fijo en ese estado */}
            <div
                className={`absolute inset-0 transition-colors duration-700 ${featured
                    ? "bg-primary/65 md:bg-primary/80 md:group-hover:bg-primary/65"
                    : "bg-black/80 md:bg-black/70 md:group-hover:bg-black/80"
                    }`}
            />

            <div className="relative max-w-md">
                <motion.h3
                    variants={rise(delay + 0.2)}
                    className={`font-display text-lg font-semibold uppercase tracking-wide lg:text-xl ${featured ? "text-secondary" : "text-accent"
                        }`}
                >
                    {title}
                </motion.h3>

                <motion.span
                    variants={{
                        hidden: { scaleX: 0 },
                        show: {
                            scaleX: 1,
                            transition: { duration: 0.9, delay: delay + 0.3, ease },
                        },
                    }}
                    className="mt-5 block h-px origin-left bg-accent/15"
                />

                <ol>
                    {items.map((item, index) => (
                        <motion.li
                            key={item}
                            variants={rise(delay + 0.4 + index * 0.1)}
                            className="flex items-baseline gap-4 border-b border-accent/10 py-3 last:border-b-0"
                        >
                            <span
                                aria-hidden="true"
                                className={`font-display text-xs font-semibold ${featured ? "text-secondary" : "text-accent"
                                    }`}
                            >
                                0{index + 1}
                            </span>
                            <span
                                className="font-body text-sm font-medium text-accent lg:text-base"
                            >
                                {item}
                            </span>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </motion.div>
    );
}

export default function BuildVsBuy() {
    const isDesktop = useMediaQuery(desktopQuery);

    return (
        <section
            id="construir"
            aria-labelledby="construir-titulo"
            className="scroll-mt-20 overflow-x-clip bg-accent"
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10 lg:py-16">
                <motion.h2
                    id="construir-titulo"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, ease }}
                    className="shrink-0 font-display text-4xl font-bold leading-tight text-primary sm:text-5xl xl:text-6xl"
                >
                    <span className="text-black">¿</span>Comprar{" "}
                    <span className="text-black">o</span>{" "}
                    <span className="text-secondary">Construir</span>
                    <span className="text-black">?</span>
                </motion.h2>
            </div>

            <div className="grid md:grid-cols-2">
                <Panel
                    title="Comprar una casa hecha"
                    items={comprar}
                    image={comprarImage}
                    delay={0}
                    className="px-6 sm:px-10 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
                />
                <Panel
                    title="Construir con Abrek"
                    items={construir}
                    image={construirImage}
                    featured
                    delay={isDesktop ? 0.25 : 0}
                    className="border-t border-secondary px-6 sm:px-10 md:border-t-0 md:border-l lg:px-16"
                />
            </div>
        </section>
    );
}
