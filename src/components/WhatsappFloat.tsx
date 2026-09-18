"use client";

import { motion } from "motion/react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { buildLink } from "@/lib/whatsapp";

// Boton flotante de WhatsApp, solo en movil. En desktop esta el circulo del hero.
export default function WhatsappFloat() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: 1.7,
                type: "spring",
                stiffness: 260,
                damping: 8,
            }}
            className="fixed right-5 bottom-5 z-30 md:hidden"
        >
            <a
                href={buildLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Quiero construir mi casa, contáctanos por WhatsApp"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-accent shadow-[0_8px_24px_rgba(56,12,3,0.35)] transition-transform duration-150 active:scale-90"
            >
                <WhatsappLogoIcon size={30} weight="fill" />
            </a>
        </motion.div>
    );
}
