"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    TiktokLogoIcon,
} from "@phosphor-icons/react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const ease = [0.25, 1, 0.35, 1] as const;

const navigationLinks = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Por qué construir", href: "/#construir" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Contacto", href: "/#contacto" },
];

const socialLinks = [
    { label: "Instagram", href: site.instagram, Icon: InstagramLogoIcon },
    { label: "Facebook", href: site.facebook, Icon: FacebookLogoIcon },
    { label: "TikTok", href: site.tiktok, Icon: TiktokLogoIcon },
];

// las columnas entran escalonadas de izquierda a derecha
const column = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } },
});

const linkClass =
    "block whitespace-nowrap font-display text-sm text-accent transition-colors duration-300 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary";

const headingClass =
    "font-display text-xs font-semibold uppercase tracking-widest text-secondary";

export default function Footer() {
    return (
        <motion.footer
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="w-full bg-primary px-6 py-10 text-accent lg:px-10 lg:py-12"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:flex lg:flex-row-reverse lg:items-start lg:justify-between lg:gap-12">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 28 },
                            show: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.9, ease },
                            },
                        }}
                        className="mx-auto lg:mx-0 lg:self-center"
                    >
                        <Image
                            src="/logo-claro.png"
                            alt="Casas Abrek — Diseño y construcción"
                            width={1606}
                            height={589}
                            className="h-auto w-48 lg:w-64"
                        />
                    </motion.div>

                    <nav
                        aria-label="Navegación del pie de página"
                        className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-4 sm:gap-x-8 xl:gap-x-12"
                    >
                        <motion.div variants={column(0.15)} className="text-center">
                            <h2 className={headingClass}>Abrek</h2>
                            <ul className="mt-4 grid gap-y-2">
                                {navigationLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={linkClass}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={column(0.25)} className="text-center">
                            <h2 className={headingClass}>Proyectos</h2>
                            <ul className="mt-4 grid gap-y-2">
                                {projects.map((project) => (
                                    <li key={project.id}>
                                        <Link href={project.href} className={linkClass}>
                                            {project.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={column(0.35)} className="text-center">
                            <h2 className={headingClass}>Contáctanos</h2>
                            <ul className="mt-4 grid gap-y-2">
                                <li>
                                    <a
                                        href={`tel:+${site.whatsapp}`}
                                        className={linkClass}
                                    >
                                        {site.phoneLabel}
                                    </a>
                                </li>
                                {site.email && (
                                    <li>
                                        <a
                                            href={`mailto:${site.email}`}
                                            className={linkClass}
                                        >
                                            {site.email}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </motion.div>

                        <motion.div variants={column(0.45)} className="text-center">
                            <h2 className={headingClass}>Síguenos</h2>
                            <ul className="mt-4 flex flex-col items-center gap-2.5">
                                {socialLinks.map(({ label, href, Icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-accent text-accent transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-secondary"
                                        >
                                            <Icon size={17} weight="bold" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </nav>
                </div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.7, delay: 0.55, ease },
                        },
                    }}
                    // en desktop los lados miden lo mismo para que el aviso quede justo al centro
                    className="mt-10 flex flex-col gap-2 border-t border-accent/15 pt-6 text-center font-body text-xs text-accent/60 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6"
                >
                    <p className="sm:text-left">
                        © {new Date().getFullYear()} Casas Abrek. Todos los
                        derechos reservados.
                    </p>
                    <Link
                        href="/aviso-de-privacidad"
                        className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-secondary hover:decoration-secondary"
                    >
                        Aviso de privacidad
                    </Link>
                    <p className="sm:text-right">
                        Diseño web por{" "}
                        <a
                            href={site.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-secondary hover:decoration-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                        >
                            Omar Acuña
                        </a>
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
