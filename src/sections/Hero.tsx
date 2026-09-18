"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import heroImage from "../../public/hero.png";
import { buildLink } from "@/lib/whatsapp";

const ease = [0.25, 1, 0.35, 1] as const;

// cae desde arriba
const drop = (delay: number) => ({
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
});

export default function Hero() {
    return (
        <section
            id="inicio"
            className="relative h-dvh w-full overflow-hidden bg-primary"
        >
            <motion.div
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2, ease }}
                className="absolute inset-0 will-change-transform"
            >
                <Image
                    src={heroImage}
                    alt="Casa residencial construida por Casas Abrek en Chihuahua"
                    fill
                    sizes="100vw"
                    priority
                    placeholder="blur"
                    draggable={false}
                    className="pointer-events-none select-none object-cover object-[70%_30%] md:object-[center_30%]"
                />
            </motion.div>

            {/* gradiente suave para que el texto se despegue de la foto */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/60 via-primary/25 via-35% to-transparent to-65%" />

            <div className="relative z-10 flex h-full items-end">
                <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-8 lg:px-10 lg:pb-12">
                    <div className="max-w-2xl">
                        <motion.div {...drop(0.4)} className="w-fit">
                            <p className="font-body text-[9px] uppercase tracking-[0.22em] text-accent lg:text-xs lg:tracking-[0.35em]">
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
                                construimos
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
                            className="mt-4 max-w-md font-body text-base font-normal leading-relaxed text-accent/90 lg:text-lg"
                        >
                            Construimos tu casa en tu terreno, a partir de tu
                            presupuesto y con acompañamiento en cada etapa.
                            Conoce nuestros proyectos en Chihuahua.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 1.4, ease }}
                        >
                            <Link
                                href="/#proyectos"
                                className="group mt-6 inline-flex items-center gap-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:text-secondary lg:text-base"
                            >
                                Ver proyectos
                                <span className="flex items-center transition-transform duration-300 group-hover:translate-x-2">
                                    <span className="h-px w-12 bg-current lg:w-16" />
                                    <ArrowRightIcon
                                        size={18}
                                        weight="light"
                                        className="-ml-2.5"
                                    />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.a
                href={buildLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 1.7,
                    type: "spring",
                    stiffness: 260,
                    damping: 8,
                }}
                className="absolute right-6 bottom-8 z-10 hidden h-28 w-28 md:flex items-center justify-center rounded-full border border-accent/40 backdrop-blur-xs transition-colors duration-300 hover:bg-secondary/30 lg:right-10 lg:bottom-12 lg:h-40 lg:w-40"
            >
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0"
                >
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                        <defs>
                            <path
                                id="hero-badge"
                                d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
                                fill="none"
                            />
                        </defs>
                        <text className="fill-accent font-body text-[7px] font-medium uppercase">
                            <textPath
                                href="#hero-badge"
                                startOffset="0%"
                                textLength="254"
                                lengthAdjust="spacing"
                            >
                                Quiero construir mi casa · Contáctanos por
                                WhatsApp ·
                            </textPath>
                        </text>
                    </svg>
                </motion.span>

                <WhatsappLogoIcon
                    size={40}
                    weight="fill"
                    className="text-accent lg:hidden"
                />
                <WhatsappLogoIcon
                    size={56}
                    weight="fill"
                    className="hidden text-accent lg:block"
                />
            </motion.a>
        </section>
    );
}
