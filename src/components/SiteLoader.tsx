"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.25, 1, 0.35, 1] as const;

// nunca se queda mas de esto aunque algo no termine de cargar
const MAX_WAIT = 4000;
// para que no parpadee cuando todo ya estaba en cache
const MIN_SHOW = 700;

const ReadyContext = createContext(false);

// true cuando el loader ya se fue; las animaciones de entrada esperan a esto
export function useSiteReady() {
    return useContext(ReadyContext);
}

export function SiteLoaderProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const start = performance.now();
        // solo cuentan las imagenes que se cargan de entrada (hero, logos);
        // las lazy de mas abajo cargarian hasta hacer scroll
        const images = Array.from(document.images).filter(
            (img) => img.loading !== "lazy"
        );
        const total = images.length + 1; // + las fuentes
        let loaded = 0;

        const tick = () => {
            loaded += 1;
            setProgress(Math.min(loaded / total, 1));
        };

        images.forEach((img) => {
            if (img.complete) {
                tick();
                return;
            }
            img.addEventListener("load", tick, { once: true });
            img.addEventListener("error", tick, { once: true });
        });

        document.fonts.ready.then(tick);

        const fallback = setTimeout(() => setProgress(1), MAX_WAIT);

        const check = setInterval(() => {
            if (loaded >= total && performance.now() - start >= MIN_SHOW) {
                setProgress(1);
            }
        }, 100);

        return () => {
            clearTimeout(fallback);
            clearInterval(check);
        };
    }, []);

    useEffect(() => {
        if (progress < 1) {
            return;
        }
        // deja que la barra se vea llena un instante antes de irse
        const done = setTimeout(() => setReady(true), 350);
        return () => clearTimeout(done);
    }, [progress]);

    useEffect(() => {
        document.documentElement.style.overflow = ready ? "" : "hidden";
    }, [ready]);

    return (
        <ReadyContext.Provider value={ready}>
            <AnimatePresence>
                {!ready && (
                    <motion.div
                        id="site-loader"
                        key="loader"
                        role="status"
                        aria-label="Cargando"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-accent"
                    >
                        <Image
                            src="/logo.png"
                            alt="Casas Abrek"
                            width={1606}
                            height={589}
                            loading="eager"
                            className="h-auto w-44 lg:w-56"
                        />

                        <div className="h-0.5 w-44 overflow-hidden bg-primary/10 lg:w-56">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: progress }}
                                transition={{ duration: 0.4, ease }}
                                className="h-full origin-left bg-secondary"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {children}
        </ReadyContext.Provider>
    );
}
