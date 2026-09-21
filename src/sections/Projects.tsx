"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import StarBadge from "@/components/StarBadge";
import { projects, type Project } from "@/data/projects";

const ease = [0.25, 1, 0.35, 1] as const;

function Card({ project }: { project: Project }) {
    // el texto chico: sobre la barra dorada va cafe, sobre la cafe va crema
    const soft = `font-display font-semibold uppercase tracking-widest transition-colors duration-500 ${project.featured
        ? "text-primary/70 md:text-accent/70 md:group-hover:text-primary/70"
        : "text-accent/70"
        }`;

    const content = (
        <>
            <div className="relative aspect-7/5 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder="blur"
                    draggable={false}
                    className="select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* solo la preventa lleva estrella, y se sale de la foto */}
            {project.featured && (
                <>
                    <span className="md:hidden">
                        <StarBadge
                            label="Preventa"
                            pulse
                            className="absolute -top-4 -right-3 z-10 h-20 w-20 text-[8px]"
                        />
                    </span>
                    <span className="hidden md:block">
                        <StarBadge
                            label={"Precio\nexclusivo"}
                            pulse
                            className="absolute -top-6 -right-5 z-10 h-26 w-26 text-[10px]"
                        />
                    </span>
                    <span className="sr-only">Precio exclusivo de preventa</span>
                </>
            )}

            {/* en movil la barra va debajo de la foto, siempre con color;
                desde md se encima y sube al hacer hover */}
            <div className="relative overflow-hidden md:absolute md:inset-x-0 md:bottom-0">
                <span
                    aria-hidden="true"
                    className={`absolute inset-0 transition-transform duration-500 ease-out md:translate-y-full md:group-hover:translate-y-0 ${project.featured ? "bg-secondary" : "bg-primary"
                        }`}
                />

                <div className="relative flex items-end justify-between gap-4 px-6 py-5">
                    <div>
                        <h3
                            className={`font-display text-xl font-bold transition-colors duration-500 lg:text-2xl ${project.featured
                                ? "text-primary md:text-accent md:group-hover:text-primary"
                                : "text-accent"
                                }`}
                        >
                            {project.name}
                            {" "}
                            — {project.status}
                        </h3>

                        <p className={`${soft} mt-1 text-[11px]`}>
                            {project.detail}
                        </p>
                    </div>

                    <ArrowRightIcon
                        size={22}
                        weight="light"
                        className={`mb-1 shrink-0 transition-all duration-500 group-hover:translate-x-1 ${project.featured
                            ? "text-primary md:text-accent md:group-hover:text-primary"
                            : "text-accent"
                            }`}
                    />
                </div>
            </div>
        </>
    );

    const className = "group relative block";

    return project.external ? (
        <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {content}
        </a>
    ) : (
        <Link href={project.href} className={className}>
            {content}
        </Link>
    );
}

export default function Projects() {
    return (
        <section
            id="proyectos"
            aria-labelledby="proyectos-titulo"
            className="scroll-mt-20 overflow-x-clip bg-accent"
        >
            <div className="mx-auto max-w-7xl px-6 pt-6 pb-10 lg:px-10 lg:pt-8 lg:pb-12">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <motion.h2
                        id="proyectos-titulo"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, ease }}
                        className="shrink-0 font-display text-4xl font-bold leading-tight text-black sm:text-5xl xl:text-6xl"
                    >
                        Nuestros <span className="text-secondary">Proyectos</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, delay: 0.4, ease }}
                        className="font-body text-sm font-medium leading-relaxed text-primary/70 lg:whitespace-nowrap lg:text-base"
                    >
                        Casas diseñadas y construidas por Abrek en Chihuahua.
                    </motion.p>
                </div>

                <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8">
                    {projects.map((project, index) => (
                        <motion.li
                            key={project.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.7,
                                // el retraso se reinicia en cada fila, si no las
                                // de abajo esperan de mas
                                delay: (index % 2) * 0.1,
                                ease,
                            }}
                        >
                            <Card project={project} />
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
