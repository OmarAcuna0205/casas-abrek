"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { QuotesIcon } from "@phosphor-icons/react";
import josueImage from "../../public/josue.jpg";
import alejandroImage from "../../public/alejandro.jpg";

const ease = [0.25, 1, 0.35, 1] as const;

type Member = {
    name: string;
    role: string;
    image: StaticImageData;
    alt: string;
};

const team: Member[] = [
    {
        name: "Josué Prieto",
        role: "Ingeniero",
        image: josueImage,
        alt: "Josué Prieto, ingeniero de Casas Abrek.",
    },
    {
        name: "Alejandro Prieto",
        role: "Arquitecto",
        image: alejandroImage,
        alt: "Alejandro Prieto, arquitecto de Casas Abrek.",
    },
];

const phases = [
    {
        title: "Asesoría",
        text: "Conocemos tu terreno, lo que necesitas y tu presupuesto.",
    },
    {
        title: "Proyecto",
        text: "Diseño, cálculo estructural y presupuesto detallado.",
    },
    {
        title: "Obra supervisada",
        text: "Planeamos y revisamos cada etapa antes de avanzar, para evitar errores, retrabajos y fugas.",
    },
    {
        title: "Entrega de llaves",
        text: "Tu casa terminada, lista para vivirla.",
    },
];

// entra despacio desde la izquierda
function Label({ children, delay = 0 }: { children: string; delay?: number }) {
    return (
        <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, delay, ease }}
            className="flex items-center gap-4 font-display text-sm font-semibold uppercase tracking-[0.25em] text-black"
        >
            <span aria-hidden="true" className="h-px w-10 bg-secondary" />
            {children}
        </motion.p>
    );
}

export default function About() {
    return (
        <section
            id="nosotros"
            aria-labelledby="nosotros-titulo"
            className="scroll-mt-12 overflow-x-clip bg-accent"
        >
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
                {/* mismo encabezado que las demas secciones */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <motion.h2
                        id="nosotros-titulo"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, ease }}
                        className="shrink-0 font-display text-4xl font-bold leading-tight text-black sm:text-5xl xl:text-6xl"
                    >
                        Sobre <span className="text-secondary">Casas Abrek</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, delay: 0.4, ease }}
                        className="font-body text-sm font-medium leading-relaxed text-primary/70 lg:text-base xl:whitespace-nowrap"
                    >
                        Acompañamos a cada familia del terreno vacío hasta la
                        casa lista para vivir.
                    </motion.p>
                </div>

                <div className="mt-12 lg:mt-16">
                    <Label>Nuestro equipo</Label>

                    {/* las dos fotos aparecen juntas */}
                    <motion.ul
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.1, delay: 0.25, ease }}
                        className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6"
                    >
                        {team.map((member) => (
                            <li key={member.name} className="group">
                                <div className="relative aspect-3/4 overflow-hidden bg-primary/5">
                                    <Image
                                        src={member.image}
                                        alt={member.alt}
                                        fill
                                        sizes="(min-width: 640px) 336px, 100vw"
                                        placeholder="blur"
                                        draggable={false}
                                        className="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                                    />
                                </div>

                                <p className="mt-4 font-display text-lg font-bold text-primary lg:text-xl">
                                    {member.name}
                                </p>
                                <p className="font-display text-sm font-semibold uppercase tracking-widest text-secondary">
                                    {member.role}
                                </p>
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <div className="mt-12 lg:mt-16">
                    <Label>Cómo trabajamos</Label>

                    <ol className="mt-6 grid gap-6 md:grid-cols-4 md:gap-0">
                        {phases.map((phase, index) => (
                            <motion.li
                                key={phase.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 1,
                                    delay: index * 0.18,
                                    ease,
                                }}
                                className="border-t border-primary/15 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-5 md:first:border-l-0 md:first:pl-0"
                            >
                                <h3 className="font-display text-base font-bold text-secondary lg:text-lg">
                                    {phase.title}
                                </h3>
                                <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-black">
                                    {phase.text}
                                </p>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.1, ease }}
                    className="mt-12 bg-secondary px-6 py-5 font-body text-sm text-primary lg:mt-16 lg:px-10 lg:text-base lg:whitespace-nowrap"
                >
                    <span className="font-bold">Financiamiento.</span> Te
                    orientamos para obtener crédito hipotecario con la
                    institución de tu preferencia.
                </motion.p>

                <motion.figure
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, delay: 0.25, ease }}
                    className="mt-10 lg:mt-12"
                >
                    <QuotesIcon
                        size={48}
                        weight="fill"
                        aria-hidden="true"
                        className="mx-auto text-secondary"
                    />

                    {/* las palabras clave van en dorado y con la serif; un poco
                        mas grandes porque la Playfair se ve chica junto a Montserrat */}
                    <blockquote className="mt-4 text-center font-body text-xl font-medium italic leading-snug text-primary lg:text-3xl">
                        Si tienes un terreno y estás pensando en{" "}
                        <span className="font-quote text-[1.15em] text-secondary">
                            construir tu casa
                        </span>
                        , te acompaño{" "}
                        <span className="font-quote text-[1.15em] text-secondary">
                            paso a paso
                        </span>{" "}
                        para hacerlo{" "}
                        <span className="font-quote text-[1.15em] text-secondary">
                            bien desde el inicio
                        </span>
                        .
                    </blockquote>

                    <figcaption className="mt-6 text-right font-display text-sm font-bold text-primary lg:text-base">
                        — Josué Prieto
                    </figcaption>
                </motion.figure>
            </div>
        </section>
    );
}
