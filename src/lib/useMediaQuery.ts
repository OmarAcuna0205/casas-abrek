import { useSyncExternalStore } from "react";

// en el servidor no hay ventana: se asume movil y se corrige al hidratar
export function useMediaQuery(query: string) {
    return useSyncExternalStore(
        (onChange) => {
            const list = window.matchMedia(query);
            list.addEventListener("change", onChange);
            return () => list.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches,
        () => false
    );
}
