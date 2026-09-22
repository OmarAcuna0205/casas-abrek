"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import heroImage from "../../public/hero.jpg";
import CircleCta, { quizCta } from "@/components/CircleCta";
import { useSiteReady } from "@/components/SiteLoader";

const ease = [0.25, 1, 0.35, 1] as const;

export default function Hero() {
    // todo espera a que se quite el loader, si no se anima detras de el
    const ready = useSiteReady();

    // cae desde arriba
    const drop = (delay: number) => ({
        initial: { opacity: 0, y: -40 },
        animate: ready ? { opacity: 1, y: 0 } : undefined,
        transition: { duration: 0.9, delay, ease },
    });

    return (
        <section
            id="inicio"
            className="relative h-dvh w-full overflow-hidden bg-primary"
        >
            <motion.div
                initial={{ opacity: 0, scale: 1.06 }}
                animate={ready ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 2.2, ease }}
                className="absolute inset-0 will-change-transform"
            >
                <Image
                    src={heroImage}
                    alt="Casa residencial construida por Casas Abrek en Chihuahua"
                    fill
                    sizes="100vw"
                    preload
                    placeholder="blur"
                    draggable={false}
                    className="pointer-events-none select-none object-cover object-[70%_30%] md:object-[center_30%]"
                />
            </motion.div>

            {/* gradiente suave para que el texto se despegue de la foto */}
            {/* movil: de abajo hacia arriba, porque ahi esta el texto */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/30 via-35% to-transparent to-65% md:hidden" />
            {/* desktop: de izquierda a derecha */}
            <div className="absolute inset-0 hidden bg-linear-to-r from-primary/50 via-primary/20 via-35% to-transparent to-60% md:block" />
            {/* y de derecha a izquierda, para que se lea el circulo del cuestionario */}
            <div className="absolute inset-0 hidden bg-linear-to-l from-primary/50 via-primary/15 via-20% to-transparent to-45% md:block" />

            <div className="relative z-10 flex h-full items-end">
                <div className="w-full px-6 pt-24 pb-8 lg:px-10 lg:pb-12">
                    <div className="max-w-2xl">
                        <motion.div {...drop(0.4)} className="w-fit">
                            <p className="font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-accent lg:text-xs lg:font-light lg:tracking-[0.35em]">
                                Diseño y construcción en Chihuahua
                            </p>
                            <span className="mt-2 block h-0.5 w-full bg-secondary lg:w-96" />
                        </motion.div>

                        <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,6.5rem)] font-medium uppercase leading-[1.1] tracking-tight text-accent">
                            <motion.span {...drop(0.6)} className="block">
                                Pon el terreno,
                            </motion.span>
                            <motion.span {...drop(0.75)} className="block">
                                y nosotros
                            </motion.span>
                            <motion.span
                                {...drop(0.9)}
                                className="relative block w-fit font-body font-medium normal-case italic text-secondary"
                            >
                                Construimos
                                {/* trazo provisional, se cambia cuando llegue la imagen */}
                                <svg
                                    viewBox="0 0 300 20"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                    className="absolute -bottom-2 left-0 h-5 w-full text-primary"
                                >
                                    <path
                                        d="M4 12 C 55 6, 105 14, 160 9 S 255 7, 296 11"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </motion.span>
                        </h1>

                        <motion.p
                            {...drop(1.15)}
                            className="mt-4 hidden max-w-md font-body text-base font-normal leading-relaxed text-accent/90 md:block lg:text-lg"
                        >
                            Construimos tu casa en tu terreno, con método,
                            supervisión y transparencia. ¿Aún no tienes terreno?
                            Conoce nuestras casas en preventa.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={ready ? { opacity: 1, x: 0 } : undefined}
                            transition={{ duration: 0.9, delay: 1.4, ease }}
                        >
                            <Link
                                href="/#proyectos"
                                className="group mt-6 inline-flex items-center gap-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:text-secondary lg:text-base"
                            >
                                Ver proyectos
                                <svg
                                    viewBox="0 0 64 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    className="h-3 w-12 transition-transform duration-300 group-hover:translate-x-2 lg:w-16"
                                >
                                    <path
                                        d="M1 6 H62 M56 1 L62 6 L56 11"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* el mismo circulo de Casa Sinaí: lleva al cuestionario */}
            <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={ready ? { opacity: 1, scale: 1 } : undefined}
                transition={{
                    delay: 1.7,
                    type: "spring",
                    stiffness: 260,
                    damping: 8,
                }}
                className="absolute right-6 bottom-8 z-10 hidden md:block lg:right-10 lg:bottom-12"
            >
                <CircleCta {...quizCta} pathId="hero-cta" bounce />
            </motion.div>
        </section>
    );
}
