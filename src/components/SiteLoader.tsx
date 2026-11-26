"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.25, 1, 0.35, 1] as const;

// nunca se queda mas de esto aunque algo no termine de cargar
const MAX_WAIT = 4000;
const MAX_PROJECT_WAIT = 8000;
// para que no parpadee cuando todo ya estaba en cache
const MIN_SHOW = 700;

const ReadyContext = createContext(false);

// true cuando el loader ya se fue; las animaciones de entrada esperan a esto
export function useSiteReady() {
    return useContext(ReadyContext);
}

export function SiteLoaderProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const waitForProjectImages = pathname === "/casa-sinai";
    const [previousPath, setPreviousPath] = useState(pathname);
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);

    if (pathname !== previousPath) {
        setPreviousPath(pathname);
        if (waitForProjectImages) {
            setProgress(0);
            setReady(false);
        }
    }

    useEffect(() => {
        if (ready) return;

        const start = performance.now();
        // En Casa Sinaí se esperan también las fotos fuera de pantalla, pero no
        // las variantes de galería y planos ocultas por el tamaño de la ventana.
        const images = Array.from(document.images).filter((img) =>
            waitForProjectImages ? img.getClientRects().length > 0 : img.loading !== "lazy"
        );
        // iframes marcados para esperarlos (reels de Instagram). Les ponen el src
        // en su propio efecto, en este mismo commit, asi su load no se nos escapa
        const frames = Array.from(
            document.querySelectorAll<HTMLIFrameElement>("iframe[data-site-loader]")
        );
        const total = images.length + frames.length + 1; // + las fuentes
        let loaded = 0;
        let finished = false;
        let minimum: number | undefined;
        let done: number | undefined;
        const listeners = new AbortController();

        const finish = () => {
            if (finished) return;
            finished = true;
            setProgress(1);
            // deja que la barra se vea llena un instante antes de irse
            done = window.setTimeout(() => setReady(true), 350);
        };

        const tick = () => {
            if (finished) return;
            loaded += 1;
            if (loaded < total) {
                setProgress(loaded / total);
                return;
            }

            minimum = window.setTimeout(finish, Math.max(0, MIN_SHOW - (performance.now() - start)));
        };

        for (const img of images) {
            if (waitForProjectImages && img.loading === "lazy") {
                img.loading = "eager";
            }
            img.decode().then(tick, tick);
        }

        for (const frame of frames) {
            const loadedFrame = () => {
                frame.removeEventListener("load", loadedFrame);
                frame.removeEventListener("error", loadedFrame);
                tick();
            };
            frame.addEventListener("load", loadedFrame, { signal: listeners.signal });
            frame.addEventListener("error", loadedFrame, { signal: listeners.signal });
        }

        document.fonts.ready.then(tick, tick);

        const fallback = window.setTimeout(finish, waitForProjectImages ? MAX_PROJECT_WAIT : MAX_WAIT);

        return () => {
            finished = true;
            listeners.abort();
            window.clearTimeout(minimum);
            window.clearTimeout(done);
            window.clearTimeout(fallback);
        };
    }, [pathname, ready, waitForProjectImages]);

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
                            // se ve de 176-224px: sin sizes Next bajaba la version de 1920px
                            sizes="(min-width: 1024px) 224px, 176px"
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
