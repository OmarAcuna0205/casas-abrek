"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { quoteLink } from "@/lib/whatsapp";

const links = [
    { label: "Por qué construir", href: "/#construir" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Casa Sinaí", href: "/casa-sinai", badge: true },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Contacto", href: "/#contacto" },
];

// estrella de 12 picos, como sticker de oferta
const starburst = `polygon(${Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * i) / 12;
    const radius = i % 2 === 0 ? 50 : 40;
    const x = (50 + radius * Math.cos(angle)).toFixed(1);
    const y = (50 + radius * Math.sin(angle)).toFixed(1);
    return `${x}% ${y}%`;
}).join(", ")})`;

// va dentro del link de Casa Sinai; crece cuando se hace hover sobre el link
function PreventaBadge({ small = false }: { small?: boolean }) {
    const size = small
        ? "-my-2.5 h-12 w-12 text-[6px]"
        : "-my-3 h-14 w-14 text-[7px]";

    return (
        <span
            aria-hidden="true"
            style={{ clipPath: starburst }}
            className={`${size} flex shrink-0 -rotate-12 items-center justify-center bg-secondary pt-px font-body font-bold uppercase leading-none tracking-normal text-primary backface-hidden transform-gpu transition-transform duration-300 will-change-transform group-hover:scale-105`}
        >
            Preventa
        </span>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        document.documentElement.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-colors duration-500 ${scrolled ? "bg-primary" : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10 lg:py-4">
                <Link href="/" aria-label="Casas Abrek, ir al inicio">
                    <motion.span
                        whileHover={{ y: -4 }}
                        transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 14,
                        }}
                        className="relative block"
                    >
                        <Image
                            src="/logo.png"
                            alt="Casas Abrek — Diseño y construcción"
                            width={1606}
                            height={589}
                            loading="eager"
                            className={`h-auto w-28 transition-opacity duration-500 lg:w-36 ${scrolled ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <Image
                            src="/logo-claro.png"
                            alt=""
                            aria-hidden="true"
                            width={1606}
                            height={589}
                            loading="eager"
                            className={`absolute inset-0 h-auto w-28 transition-opacity duration-500 lg:w-36 ${scrolled ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </motion.span>
                </Link>

                <div className="hidden items-center gap-10 md:flex">
                    <ul className="flex items-center gap-8">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="group flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:text-secondary"
                                >
                                    {link.label}
                                    {link.badge && (
                                        <>
                                            <span className="sr-only">
                                                (preventa)
                                            </span>
                                            <PreventaBadge />
                                        </>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={quoteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-accent px-7 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-accent"
                    >
                        Cotizar
                    </a>
                </div>

                <button
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menú"
                    className="cursor-pointer text-accent md:hidden"
                >
                    <ListIcon size={28} weight="light" />
                </button>
            </nav>

            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-primary/60 md:hidden"
                />
            )}

            <div
                className={`fixed top-0 right-0 bottom-0 z-50 flex w-72 flex-col bg-primary px-8 py-20 transition-transform duration-500 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="absolute top-6 right-6 cursor-pointer text-accent"
                >
                    <XIcon size={26} weight="light" />
                </button>

                <motion.ul
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0.2,
                            },
                        },
                    }}
                    animate={menuOpen ? "show" : "hidden"}
                    className="flex flex-col gap-6"
                >
                    {links.map((link) => (
                        <motion.li
                            key={link.href}
                            variants={{
                                hidden: { opacity: 0, x: 20 },
                                show: {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.45,
                                        ease: [0.25, 1, 0.35, 1],
                                    },
                                },
                            }}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="group inline-flex items-center gap-1.5 font-body text-sm uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:text-secondary"
                            >
                                {link.label}
                                {link.badge && (
                                    <>
                                        <span className="sr-only">
                                            (preventa)
                                        </span>
                                        <PreventaBadge small />
                                    </>
                                )}
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>

                <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="mt-10 border border-accent px-7 py-3 text-center font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-accent"
                >
                    Cotizar
                </a>
            </div>
        </header>
    );
}
