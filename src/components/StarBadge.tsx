"use client";

import { motion, useReducedMotion } from "motion/react";

// estrella de 12 picos, como sticker de oferta.
// El tamaño y el texto se controlan desde className.
const starburst = `polygon(${Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * i) / 12;
    const radius = i % 2 === 0 ? 50 : 40;
    const x = (50 + radius * Math.cos(angle)).toFixed(1);
    const y = (50 + radius * Math.sin(angle)).toFixed(1);
    return `${x}% ${y}%`;
}).join(", ")})`;

export default function StarBadge({
    label,
    className = "",
    pulse = false,
    hoverScale = false,
}: {
    label: string;
    className?: string;
    // late constantemente: crece de golpe y se encoge despacio
    pulse?: boolean;
    // crece cuando se hace hover sobre el grupo que la contiene
    hoverScale?: boolean;
}) {
    const reduceMotion = useReducedMotion();
    const beating = pulse && !reduceMotion;

    return (
        // la estrella late aparte del texto: si se escala la letra, se ve temblorosa
        <span
            aria-hidden="true"
            className={`flex shrink-0 items-center justify-center transition-transform duration-300 ${className}`}
        >
            <motion.span
                style={{ clipPath: starburst }}
                animate={beating ? { scale: [1, 1.22, 1] } : undefined}
                transition={
                    beating
                        ? {
                            duration: 1.4,
                            times: [0, 0.25, 1],
                            repeat: Infinity,
                            repeatDelay: 0.3,
                            ease: "easeOut",
                        }
                        : undefined
                }
                className={`absolute inset-0 -rotate-12 transform-gpu bg-secondary transition-transform duration-300 will-change-transform ${hoverScale ? "group-hover:scale-110" : ""
                    }`}
            />

            <span className="relative -rotate-12 pt-px text-center font-body font-bold uppercase leading-tight tracking-normal whitespace-pre-line text-primary">
                {label}
            </span>
        </span>
    );
}
