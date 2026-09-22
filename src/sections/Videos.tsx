"use client";

import { motion } from "motion/react";
import { videos, reelEmbedUrl, reelUrl } from "@/data/videos";

const ease = [0.25, 1, 0.35, 1] as const;

export default function Videos() {
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
                            <div className="relative aspect-9/17 overflow-hidden bg-primary">
                                <iframe
                                    src={reelEmbedUrl(video.id)}
                                    title={video.title}
                                    loading="lazy"
                                    scrolling="no"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute inset-0 h-full w-full"
                                />
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
