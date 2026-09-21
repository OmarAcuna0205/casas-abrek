"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircleCta, { quizCta } from "@/components/CircleCta";
import ProjectGallery, { type GalleryImage } from "@/components/ProjectGallery";
import Contact from "@/sections/Contact";
import sinaiImage from "../../../public/sinai.jpg";
import planoImage from "../../../public/planos.jpg";
import planoDesktopImage from "../../../public/planosDesktop.jpg";
import renderOne from "../../../public/render1.jpg";
import renderTwo from "../../../public/render2.jpg";
import renderThree from "../../../public/render3.jpg";
import renderFour from "../../../public/render4.jpg";
import renderFive from "../../../public/render5.jpg";
import renderSix from "../../../public/render6.jpg";

const ease = [0.25, 1, 0.35, 1] as const;

const renders: GalleryImage[] = [
    {
        image: sinaiImage,
        alt: "Fachada principal de Casa Sinaí",
        mobileOnly: true,
        // la foto es panoramica; en 4:3 queda del tamaño de los renders
        ratio: 4 / 3,
    },
    { image: renderOne, alt: "Render exterior de Casa Sinaí" },
    { image: renderTwo, alt: "Render de la fachada de Casa Sinaí" },
    { image: renderThree, alt: "Render de los espacios interiores de Casa Sinaí" },
    { image: renderFour, alt: "Render de Casa Sinaí" },
    { image: renderFive, alt: "Render de la terraza de Casa Sinaí" },
    { image: renderSix, alt: "Render nocturno de Casa Sinaí" },
];

// ancho entre alto de cada plano: el de movil es vertical y el de desktop horizontal
const planoRatio = planoImage.width / planoImage.height;
const planoDesktopRatio = planoDesktopImage.width / planoDesktopImage.height;

const details = [
    { label: "Ubicación", value: "Rincón de las Bugambilias, Chihuahua" },
    { label: "Estatus", value: "Preventa" },
    { label: "Tipología", value: "Casa de una planta" },
];

export default function CasaSinai() {
    return (
        <>
            <Navbar />
            <main className="overflow-x-clip bg-accent pt-18 lg:pt-19">
                <section aria-labelledby="sinai-titulo" className="relative h-[calc(100dvh-72px)] min-h-144 lg:h-[calc(100dvh-76px)]">
                    <Image
                        src={sinaiImage}
                        alt="Fachada de Casa Sinaí, casa de una planta frente a parque"
                        fill
                        preload
                        placeholder="blur"
                        sizes="100vw"
                        className="object-cover object-[62%_center]"
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
                            id="sinai-titulo"
                            className="font-display text-[clamp(4.5rem,13vw,13rem)] font-medium uppercase leading-[1.05] tracking-tight sm:leading-[0.82] text-accent lg:text-[clamp(5.5rem,10vw,10rem)]"
                        >
                            {/* en movil va en dos lineas, como las demas casas
                                (Armonía y Aurora brincan solas por ser mas largas) */}
                            Casa{" "}
                            <br className="sm:hidden" />
                            Sinaí
                        </h1>
                    </motion.div>

                    {/* aqui si va en movil: el titulo en dos lineas deja espacio a la derecha.
                        Mismo margen de abajo que el titulo */}
                    <div className="absolute right-6 bottom-8 lg:right-10 lg:bottom-12">
                        <CircleCta {...quizCta} pathId="sinai-hero-cta" bounce />
                    </div>
                </section>

                <section id="renders" aria-labelledby="renders-titulo" className="scroll-mt-20 pt-12 pb-10 lg:pt-14 lg:pb-12">
                    <div className="px-6 lg:px-10">
                        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <h2 id="renders-titulo" className="font-display text-5xl font-bold uppercase leading-none text-primary sm:text-6xl">Renders</h2>
                            <p className="hidden items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-primary/60 lg:flex">
                                Desliza para explorar
                                <ArrowRightIcon size={16} weight="light" aria-hidden="true" />
                            </p>
                        </div>
                    </div>

                    <ProjectGallery images={renders} />
                </section>

                <section id="planos" aria-labelledby="planos-titulo" className="scroll-mt-18 bg-primary px-6 py-12 text-accent lg:scroll-mt-19 lg:px-10 lg:py-14">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <h2 id="planos-titulo" className="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">Planos</h2>
                            <p className="font-body text-sm leading-relaxed text-accent/70 lg:whitespace-nowrap">
                                Conoce la planta arquitectónica y la relación de la casa con su entorno.
                            </p>
                        </div>

                        {/* dos versiones del plano: vertical en movil y horizontal en desktop.
                            A cada caja se le fija el ancho (sale del alto maximo y la proporcion)
                            y el alto sale solo, asi nunca se deforma. Van en variables porque
                            Tailwind no detecta clases con calc(...*variable). La oculta no se
                            descarga porque es lazy */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, ease }}
                            className="mt-8 lg:mt-10"
                        >
                            {/* movil: hasta el 70% del alto de la pantalla */}
                            <div
                                style={{
                                    "--w": planoImage.width,
                                    "--h": planoImage.height,
                                    "--ancho": `min(100%, calc(70dvh * ${planoRatio}))`,
                                } as React.CSSProperties}
                                className="relative mx-auto aspect-[var(--w)/var(--h)] w-(--ancho) overflow-hidden lg:hidden"
                            >
                                <Image
                                    src={planoImage}
                                    alt="Plano arquitectónico de Casa Sinaí"
                                    fill
                                    placeholder="blur"
                                    sizes="(min-width: 1024px) 0px, 300px"
                                    className="object-contain transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>

                            {/* desktop: casi del alto de la pantalla, sin pasarse del ancho */}
                            <div
                                style={{
                                    "--w": planoDesktopImage.width,
                                    "--h": planoDesktopImage.height,
                                    "--ancho": `min(100%, calc((100dvh - 8rem) * ${planoDesktopRatio}))`,
                                } as React.CSSProperties}
                                className="relative mx-auto hidden aspect-[var(--w)/var(--h)] w-(--ancho) overflow-hidden lg:block"
                            >
                                <Image
                                    src={planoDesktopImage}
                                    alt="Plano arquitectónico de Casa Sinaí"
                                    fill
                                    placeholder="blur"
                                    sizes="(min-width: 1024px) 1100px, 0px"
                                    className="object-contain transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section aria-labelledby="ficha-titulo" className="px-6 py-16 lg:px-10 lg:py-24">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.35fr_0.75fr] lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, ease }}
                        >
                            <h2 id="ficha-titulo" className="font-display text-5xl font-bold uppercase leading-none text-primary">Casa Sinaí</h2>
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
                                Una casa pensada para vivir con calma: espacios abiertos, luz natural y una conexión cotidiana con el parque.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, delay: 0.24, ease }}
                            className="flex flex-col items-center gap-4 text-center lg:pt-8"
                        >
                            <a
                                href="/PLANTA%20ARQUITECTONICA.pdf"
                                download
                                className="inline-flex items-center gap-3 border border-primary px-6 py-4 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:border-secondary hover:bg-secondary"
                            >
                                Descargar documentación
                                <DownloadSimpleIcon size={18} weight="light" />
                            </a>
                            <div className="mt-6">
                                <CircleCta {...quizCta} pathId="sinai-details-cta" pulse tone="dark" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Contact />
            </main>
            <Footer />
        </>
    );
}
