"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useInView } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ease = [0.25, 1, 0.35, 1] as const;

export type GalleryImage = {
    image: StaticImageData;
    alt: string;
    // la foto del hero: en movil el hero la recorta, aqui se ve completa
    mobileOnly?: boolean;
    // para igualarla a las demas; si no, se usa la proporcion de la foto
    ratio?: number;
};

// en desktop van en fila: las que se ven entran juntas y escalonadas al llegar
// a la seccion, las de la derecha ya estan listas cuando deslizas. En movil van
// apiladas y cada una se anima al llegar a ella.
// transform y no y para que la animacion vaya por GPU y no trabe el scroll
function GalleryCard({
    item,
    index,
    isDesktop,
    listInView,
}: {
    item: GalleryImage;
    index: number;
    isDesktop: boolean;
    listInView: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const show = isDesktop ? listInView : inView;

    // cada foto con su proporcion: las verticales no se recortan y en desktop
    // todas miden lo mismo de alto
    const ratio = item.ratio ?? item.image.width / item.image.height;

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, transform: "translateY(24px)" }}
            animate={show ? { opacity: 1, transform: "translateY(0px)" } : undefined}
            transition={{ duration: 0.7, delay: isDesktop ? index * 0.08 : 0, ease }}
            style={{ "--ratio": ratio } as React.CSSProperties}
            className={`relative aspect-(--ratio) shrink-0 overflow-hidden lg:w-[min(calc(100vw-5rem),calc((100dvh-15rem)*var(--ratio)))] ${item.mobileOnly ? "lg:hidden" : ""}`}
        >
            <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) min(70vw, 58rem), 100vw"
                className="object-cover"
            />
        </motion.li>
    );
}

// sin scroll-snap: al terminar el deslizamiento con trackpad el snap jalaba la
// fila para alinearla y se sentia como un tiron. overscroll-x-contain evita que
// al llegar al final el gesto de deslizar se vuelva "atras" en el navegador.
// overflow-y-hidden: con overflow-x-auto el navegador tambien deja scroll en Y, y
// como las fotos entran desde 24px abajo, la fila se quedaba con el scroll vertical
// y la pagina se sentia trabada. Asi el scroll vertical siempre pasa a la pagina
export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const listRef = useRef<HTMLUListElement>(null);
    const listInView = useInView(listRef, { once: true, amount: 0.12 });

    return (
        <ul
            ref={listRef}
            className="mt-8 flex flex-col gap-5 px-6 lg:mt-10 lg:flex-row lg:gap-6 lg:overflow-x-auto lg:overflow-y-hidden lg:overscroll-x-contain lg:px-10 lg:pb-5 lg:pr-10 lg:scroll-smooth lg:[scrollbar-width:thin]"
        >
            {images.map((item, index) => (
                <GalleryCard
                    key={item.image.src}
                    item={item}
                    index={index}
                    isDesktop={isDesktop}
                    listInView={listInView}
                />
            ))}
        </ul>
    );
}
