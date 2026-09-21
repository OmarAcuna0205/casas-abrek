"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircleCta from "@/components/CircleCta";
import ProjectGallery, { type GalleryImage } from "@/components/ProjectGallery";
import Contact from "@/sections/Contact";

const ease = [0.25, 1, 0.35, 1] as const;

export type ProjectPageData = {
    name: string;
    hero: {
        image: StaticImageData;
        alt: string;
        // la parte de la foto que queda a la vista cuando el hero la recorta
        position: string;
    };
    images: GalleryImage[];
    details: { label: string; value: string }[];
    concept: string;
};

// plantilla de los proyectos que solo llevan fotos (Armonía, Aurora...).
// Casa Sinaí tiene su propia pagina porque lleva renders, planos y documentos
export default function ProjectPage({ project }: { project: ProjectPageData }) {
    const { name, hero, images, details, concept } = project;

    // en movil el hero recorta la fachada: va completa al inicio de las imagenes
    const gallery: GalleryImage[] = [
        { image: hero.image, alt: hero.alt, mobileOnly: true },
        ...images,
    ];

    // ya estan vendidas: el circulo invita a construir una parecida
    const cta = {
        text: `¿Te gusta ${name}? · Construimos la tuya en tu terreno ·`,
        label: `¿Te gusta ${name}? Construimos la tuya en tu terreno, escríbenos`,
    };

    return (
        <>
            <Navbar />
            <main className="overflow-x-clip bg-accent pt-18 lg:pt-19">
                <section aria-labelledby="proyecto-titulo" className="relative h-[calc(100dvh-72px)] min-h-144 lg:h-[calc(100dvh-76px)]">
                    <Image
                        src={hero.image}
                        alt={hero.alt}
                        fill
                        preload
                        placeholder="blur"
                        sizes="100vw"
                        style={{ objectPosition: hero.position }}
                        className="object-cover"
                    />
                    {/* gradiente disimulado: solo lo necesario para que se lean el titulo y el circulo */}
                    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-primary/55 via-primary/20 via-25% to-transparent to-50%" />
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease }}
                        className="absolute inset-x-0 bottom-0 px-6 pb-8 lg:px-10 lg:pb-12"
                    >
                        <h1
                            id="proyecto-titulo"
                            className="font-display text-[clamp(4.5rem,13vw,13rem)] font-medium uppercase leading-[1.05] tracking-tight sm:leading-[0.82] text-accent lg:text-[clamp(5.5rem,10vw,10rem)]"
                        >
                            {name}
                        </h1>
                    </motion.div>

                    <div className="absolute right-10 bottom-12 hidden lg:block">
                        <CircleCta {...cta} pathId="hero-cta" />
                    </div>
                </section>

                <section id="imagenes" aria-labelledby="imagenes-titulo" className="scroll-mt-20 pt-12 pb-10 lg:pt-14 lg:pb-12">
                    <div className="px-6 lg:px-10">
                        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <h2 id="imagenes-titulo" className="font-display text-5xl font-bold uppercase leading-none text-primary sm:text-6xl">Imágenes</h2>
                            <p className="hidden items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-primary/60 lg:flex">
                                Desliza para explorar
                                <ArrowRightIcon size={16} weight="light" aria-hidden="true" />
                            </p>
                        </div>
                    </div>

                    <ProjectGallery images={gallery} />
                </section>

                <section aria-labelledby="ficha-titulo" className="px-6 py-16 lg:px-10 lg:py-24">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.35fr_0.75fr] lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, ease }}
                        >
                            <h2 id="ficha-titulo" className="font-display text-5xl font-bold uppercase leading-none text-primary">{name}</h2>
                            <dl className="mt-8 grid gap-6">
                                {details.map((detail) => (
                                    <div key={detail.label}>
                                        <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/55">{detail.label}</dt>
                                        <dd className="mt-1 font-body text-sm leading-relaxed text-primary">{detail.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, delay: 0.12, ease }}
                            className="lg:pt-8"
                        >
                            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary">Concepto</p>
                            <p className="mt-3 max-w-xl font-body text-lg font-normal leading-relaxed text-primary/80 lg:text-xl">
                                {concept}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, delay: 0.24, ease }}
                            className="flex flex-col items-center text-center lg:pt-8"
                        >
                            <CircleCta {...cta} pathId="ficha-cta" pulse tone="dark" />
                        </motion.div>
                    </div>
                </section>

                <Contact />
            </main>
            <Footer />
        </>
    );
}
