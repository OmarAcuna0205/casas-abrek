"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HardHatIcon, HammerIcon, WrenchIcon } from "@phosphor-icons/react";

const ease = [0.25, 1, 0.35, 1] as const;

export default function UnderConstruction() {
    return (
        <section className="flex min-h-dvh items-center justify-center bg-accent px-6 py-32 text-primary">
            <div className="max-w-xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                    className="flex items-end justify-center gap-5 text-secondary"
                >
                    <HammerIcon size={34} weight="light" />
                    <HardHatIcon size={64} weight="light" />
                    <WrenchIcon size={34} weight="light" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease }}
                    className="mt-8 font-display text-4xl font-bold leading-tight sm:text-5xl"
                >
                    Página en construcción
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease }}
                    className="mt-4 font-body leading-relaxed text-primary/70"
                >
                    Estamos preparando esta página. Lamentamos las molestias.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45, ease }}
                    className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Link
                        href="/"
                        className="font-body text-xs uppercase tracking-[0.2em] text-primary/70 transition-colors duration-300 hover:text-secondary"
                    >
                        Volver al inicio
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
