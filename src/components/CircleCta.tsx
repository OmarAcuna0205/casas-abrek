"use client";

import Link from "next/link";
import { motion, type TargetAndTransition, type Transition } from "motion/react";
import {
    ArrowDownIcon,
    ArrowRightIcon,
    QuestionMarkIcon,
    type Icon,
} from "@phosphor-icons/react";

const MotionLink = motion.create(Link);

// el circulo que lleva al cuestionario de Casa Sinaí (inicio y /casa-sinai)
export const quizCta = {
    text: "Descubre si Casa Sinaí es para ti · Responde el formulario ·",
    label: "Descubre si Casa Sinaí es para ti, responde el formulario",
    href: "/descubre",
    icon: QuestionMarkIcon,
    iconSize: 46,
};

type Loop = { animate: TargetAndTransition; transition: Transition };

// late 1.5s y descansa 0.25s
const pulseMotion: Loop = {
    animate: { transform: ["scale(1)", "scale(1.12)", "scale(1)", "scale(1)"] },
    transition: {
        duration: 1.75,
        times: [0, 0.214, 0.857, 1],
        repeat: Infinity,
        ease: "easeOut",
    },
};

// brinca 3 veces, cada vez un poco menos, y descansa unos 2s, como diciendo "clickeame"
const bounceMotion: Loop = {
    animate: {
        transform: [
            "translateY(0px)",
            "translateY(-16px)",
            "translateY(0px)",
            "translateY(-12px)",
            "translateY(0px)",
            "translateY(-7px)",
            "translateY(0px)",
            "translateY(0px)",
        ],
    },
    transition: {
        duration: 3.5,
        times: [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 1],
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// circulo con texto que gira; por defecto lleva al formulario de contacto.
// giro, pulso y brinco con transform para que corran por GPU: como se repiten sin
// fin, en el hilo principal le quitaban fluidez al scroll de la pagina. Las pausas
// van en los keyframes porque repeatDelay no se puede acelerar por GPU
export default function CircleCta({
    text,
    label,
    pathId,
    href = "#contacto",
    icon,
    iconSize = 30,
    pulse = false,
    bounce = false,
    tone = "light",
}: {
    text: string;
    label: string;
    // "#contacto" baja en la misma pagina; una ruta lleva a otra pagina
    href?: string;
    // si no se pasa, la flecha indica si baja en la pagina o si cambia de pagina
    icon?: Icon;
    iconSize?: number;
    // id del trazo del texto; cada circulo de la pagina necesita el suyo
    pathId: string;
    // pulse y bounce no se combinan: los dos mueven el transform del circulo
    pulse?: boolean;
    bounce?: boolean;
    tone?: "light" | "dark";
}) {
    const palette = tone === "dark"
        ? "border-primary text-primary hover:border-secondary hover:bg-secondary/20"
        : "border-secondary/80 text-accent hover:border-secondary hover:bg-secondary/25";

    const Glyph = icon ?? (href.startsWith("#") ? ArrowDownIcon : ArrowRightIcon);
    const loop = pulse ? pulseMotion : bounce ? bounceMotion : null;

    return (
        <MotionLink
            href={href}
            aria-label={label}
            animate={loop?.animate}
            transition={loop?.transition}
            className={`relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 lg:h-40 lg:w-40 ${palette}`}
        >
            <motion.span
                animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
            >
                <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                    <defs>
                        <path
                            id={pathId}
                            d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
                            fill="none"
                        />
                    </defs>
                    <text className="fill-current font-body text-[6.5px] font-medium uppercase">
                        <textPath href={`#${pathId}`} startOffset="0%" textLength="254" lengthAdjust="spacing">
                            {text}
                        </textPath>
                    </text>
                </svg>
            </motion.span>
            <Glyph size={iconSize} weight="light" aria-hidden="true" />
        </MotionLink>
    );
}
