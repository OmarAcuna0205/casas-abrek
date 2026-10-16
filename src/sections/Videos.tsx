"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { motion } from "motion/react";
import { videos, reelEmbedUrl, reelUrl } from "@/data/videos";

const ease = [0.25, 1, 0.35, 1] as const;

function ReelEmbed({ id, title }: { id: string; title: string }) {
    // el src va hasta que monta: asi el SiteLoader ya esta escuchando su load.
    // Sin lazy, en movil empezaban a cargar hasta llegar con el scroll
    const frame = useRef<HTMLIFrameElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        frame.current?.setAttribute("src", reelEmbedUrl(id));
    }, [id]);

    return (
        <div className="relative aspect-9/17 overflow-hidden bg-primary">
            {/* mientras Instagram termina de cargar */}
            <div
                aria-hidden
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    loaded ? "opacity-0" : "opacity-100"
                }`}
            >
                <span className="size-8 animate-spin rounded-full border-2 border-accent/20 border-t-secondary" />
            </div>

            <iframe
                ref={frame}
                data-site-loader
                title={title}
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                onLoad={(e) => e.currentTarget.src && setLoaded(true)}
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}

export default function Videos() {
    // abre la conexion a Instagram desde el HTML, antes de que monten los iframes
    preconnect("https://www.instagram.com");

    return (
        <section
            id="videos"
            aria-labelledby="videos-titulo"
            className="scroll-mt-20 overflow-x-clip bg-accent"
        >
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <motion.h2
                        id="videos-titulo"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, ease }}
                        className="shrink-0 font-display text-3xl font-bold leading-tight text-black sm:text-4xl lg:whitespace-nowrap xl:text-5xl"
                    >
                        Lo que nadie te dice sobre{" "}
                        <span className="text-secondary">Construir</span>
                    </motion.h2>
                </div>

                <ul className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-12">
                    {videos.map((video, index) => (
                        <motion.li
                            key={video.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.12,
                                ease,
                            }}
                            className="group"
                        >
                            <h3 className="font-display text-lg font-bold text-primary transition-colors duration-300 group-hover:text-secondary">
                                <a
                                    href={reelUrl(video.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {video.title}
                                </a>
                            </h3>

                            <p className="mt-1 mb-4 max-w-xs font-body text-sm leading-relaxed text-primary/60">
                                {video.description}
                            </p>

                            {/* el embed de Instagram no es 9:16: encima del video
                                lleva el encabezado y debajo likes y comentarios */}
                            <ReelEmbed id={video.id} title={video.title} />
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
