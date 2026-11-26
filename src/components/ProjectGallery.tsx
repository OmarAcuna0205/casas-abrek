"use client";

import { useRef } from "react";
import Image, { type ImageProps, type StaticImageData } from "next/image";
import { motion, useInView } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ease = [0.25, 1, 0.35, 1] as const;

export type GalleryImage = {
    image: StaticImageData;
    alt: string;
    // la foto del hero: en movil el hero la recorta, aqui se ve completa
    mobileOnly?: boolean;
    // qué parte de la foto se ve cuando la galería la recorta, ej. "center 70%"
    position?: string;
};

// en desktop van en fila: las que se ven entran juntas y escalonadas al llegar
// a la seccion, las de la derecha ya estan listas cuando deslizas. En movil van
// apiladas y cada una se anima al llegar a ella.
// transform y no y para que la animacion vaya por GPU y no trabe el scroll
function GalleryCard({
    item,
    aspectRatio,
    placeholder,
    index,
    isDesktop,
    listInView,
}: {
    item: GalleryImage;
    aspectRatio?: number;
    placeholder: ImageProps["placeholder"];
    index: number;
    isDesktop: boolean;
    listInView: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const show = isDesktop ? listInView : inView;

    const ratio = aspectRatio ?? item.image.width / item.image.height;
    const desktopWidth = `min(calc(100vw - 5rem), calc((100dvh - 15rem) * ${ratio}))`;

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, transform: "translateY(24px)" }}
            animate={show ? { opacity: 1, transform: "translateY(0px)" } : undefined}
            transition={{ duration: 0.7, delay: isDesktop ? index * 0.08 : 0, ease }}
            style={{ "--ratio": ratio, "--gallery-card-width": desktopWidth } as React.CSSProperties}
            className={`relative aspect-(--ratio) shrink-0 overflow-hidden lg:w-(--gallery-card-width) ${item.mobileOnly ? "lg:hidden" : ""}`}
        >
            <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder={placeholder}
                sizes={`(min-width: 1024px) ${desktopWidth}, calc(100vw - 3rem)`}
                style={{ objectPosition: item.position }}
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
export default function ProjectGallery({ images, aspectRatio, placeholder = "blur" }: {
    images: GalleryImage[];
    aspectRatio?: number;
    placeholder?: ImageProps["placeholder"];
}) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const listRef = useRef<HTMLUListElement>(null);
    const listInView = useInView(listRef, { once: true, amount: 0.12 });

    return (
        <ul
            ref={listRef}
            className="mt-8 flex flex-col gap-5 px-6 lg:mt-10 lg:flex-row lg:gap-6 lg:overflow-x-auto lg:overflow-y-hidden lg:overscroll-x-contain lg:px-10 lg:pb-5 lg:pr-10 lg:scroll-smooth lg:scrollbar-thin"
        >
            {images.map((item, index) => (
                <GalleryCard
                    key={item.image.src}
                    item={item}
                    aspectRatio={aspectRatio}
                    placeholder={placeholder}
                    index={index}
                    isDesktop={isDesktop}
                    listInView={listInView}
                />
            ))}
        </ul>
    );
}
