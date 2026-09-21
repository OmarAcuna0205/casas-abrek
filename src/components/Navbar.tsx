"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import StarBadge from "@/components/StarBadge";
import { quoteLink } from "@/lib/whatsapp";

const links = [
    { label: "Por qué construir", href: "/#construir" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Casa Sinaí", href: "/casa-sinai", badge: true },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Contacto", href: "/#contacto" },
];

// va dentro del link de Casa Sinai; crece cuando se hace hover sobre el link
function PreventaBadge({ small = false }: { small?: boolean }) {
    return (
        <StarBadge
            label="Preventa"
            hoverScale
            className={`relative ${small
                ? "-my-2.5 h-12 w-12 text-[6px]"
                : "-my-3 h-14 w-14 text-[7px]"
                }`}
        />
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // en el inicio la navbar empieza transparente sobre el hero; en las demas
    // paginas siempre lleva fondo, si no el texto crema se pierde
    const solid = scrolled || pathname !== "/";

    // Si la seccion esta en la pagina actual, hacemos el scroll nosotros:
    // Next no vuelve a bajar si el hash ya es el mismo, y con el menu abierto
    // el scroll de la pagina esta bloqueado. Si no, Next navega normal.
    const goTo = (
        event: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        setMenuOpen(false);
        document.documentElement.style.overflow = "";

        const [path, hash] = href.split("#");

        if ((path || "/") !== pathname) {
            return;
        }

        const target = hash ? document.getElementById(hash) : null;

        if (hash && !target) {
            return;
        }

        event.preventDefault();

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            history.replaceState(null, "", `#${hash}`);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", path || "/");
        }
    };

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
            className={`fixed top-0 z-50 w-full transition-colors duration-500 ${solid ? "bg-primary" : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10 lg:py-4">
                <Link
                    href="/"
                    onClick={(event) => goTo(event, "/")}
                    aria-label="Casas Abrek, ir al inicio"
                >
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
                            // se ve de 112-144px: sin sizes Next bajaba la version de 1920px
                            sizes="(min-width: 1024px) 144px, 112px"
                            loading="eager"
                            className={`h-auto w-28 transition-opacity duration-500 lg:w-36 ${solid ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <Image
                            src="/logo-claro.png"
                            alt=""
                            aria-hidden="true"
                            width={1606}
                            height={589}
                            // se ve de 112-144px: sin sizes Next bajaba la version de 1920px
                            sizes="(min-width: 1024px) 144px, 112px"
                            loading="eager"
                            className={`absolute inset-0 h-auto w-28 transition-opacity duration-500 lg:w-36 ${solid ? "opacity-100" : "opacity-0"
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
                                    onClick={(event) => goTo(event, link.href)}
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

            {/* el contenedor recorta el drawer cuando esta cerrado; si no, al estar
                fuera de pantalla la pagina se puede deslizar a los lados */}
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden md:hidden">
                <div
                    className={`pointer-events-auto absolute top-0 right-0 bottom-0 flex w-72 flex-col bg-primary px-8 py-20 transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
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
                                onClick={(event) => goTo(event, link.href)}
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
            </div>
        </header>
    );
}
