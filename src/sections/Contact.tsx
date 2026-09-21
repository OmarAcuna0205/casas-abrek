"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    EnvelopeSimpleIcon,
    FacebookLogoIcon,
    InstagramLogoIcon,
    TiktokLogoIcon,
    WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { site } from "@/data/site";
import { quoteLink } from "@/lib/whatsapp";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ease = [0.25, 1, 0.35, 1] as const;

// cuando el envio este conectado, cambiar a true y el boton se habilita
const FORM_ENABLED = false;

const fields = [
    {
        name: "nombre",
        label: "Nombre",
        type: "text",
        autoComplete: "name",
        maxLength: 60,
    },
    {
        name: "correo",
        label: "Correo electrónico",
        type: "email",
        autoComplete: "email",
        maxLength: 100,
    },
    {
        name: "telefono",
        label: "Teléfono",
        type: "tel",
        autoComplete: "tel",
        maxLength: 20,
    },
] as const;

const MENSAJE_MAX = 86;

type FieldName = (typeof fields)[number]["name"] | "mensaje";

const emptyValues: Record<FieldName, string> = {
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
};

const socials = [
    { label: "Instagram", href: site.instagram, Icon: InstagramLogoIcon },
    { label: "Facebook", href: site.facebook, Icon: FacebookLogoIcon },
    { label: "TikTok", href: site.tiktok, Icon: TiktokLogoIcon },
].filter((social) => social.href);

// transform y no y: motion solo acelera transform y opacity por GPU; con y la
// animacion corre en el hilo principal y se traba si se hace scroll en movil
const block = (delay: number) => ({
    hidden: { opacity: 0, transform: "translateY(24px)" },
    show: {
        opacity: 1,
        transform: "translateY(0px)",
        transition: { duration: 1, delay, ease },
    },
});

// en desktop las tres partes van lado a lado y entran escalonadas de izquierda
// a derecha; en movil van apiladas y cada una se anima al llegar a ella
const desktopQuery = "(min-width: 1024px)";

const inputClass =
    "w-full border-b border-primary/20 bg-transparent pb-3 font-body text-sm tracking-widest text-primary transition-colors placeholder:uppercase placeholder:text-primary/60 focus:border-secondary focus:outline-none aria-invalid:border-primary";

export default function Contact() {
    const isDesktop = useMediaQuery(desktopQuery);
    const [values, setValues] = useState(emptyValues);
    const [invalid, setInvalid] = useState<FieldName[]>([]);
    const [feedback, setFeedback] = useState<{
        ok: boolean;
        text: string;
    } | null>(null);

    const update = (name: FieldName, value: string) => {
        setValues((current) => ({ ...current, [name]: value }));
        setInvalid((current) => current.filter((field) => field !== name));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const empty = (Object.keys(values) as FieldName[]).filter(
            (name) => !values[name].trim()
        );
        setInvalid(empty);

        if (empty.length > 0) {
            setFeedback({ ok: false, text: "Completa todos los campos." });
            return;
        }

        // TODO: conectar el envio (API route, Web3Forms...) antes de habilitar
        setValues(emptyValues);
        setFeedback({ ok: true, text: "¡Gracias! Te contactamos pronto." });
    };

    return (
        <section
            id="contacto"
            aria-labelledby="contacto-titulo"
            className="scroll-mt-12 overflow-x-clip bg-accent"
        >
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <motion.h2
                        id="contacto-titulo"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, ease }}
                        className="shrink-0 font-display text-4xl font-bold leading-tight text-black sm:text-5xl xl:text-6xl"
                    >
                        Construyendo tus{" "}
                        <span className="text-secondary">Sueños</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.9, delay: 0.4, ease }}
                        className="font-body text-sm font-medium leading-relaxed text-primary/70 lg:whitespace-nowrap lg:text-base"
                    >
                        Cuéntanos qué quieres construir y te ayudamos a empezar.
                    </motion.p>
                </div>

                <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-3">
                    <motion.form
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={block(0)}
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-col gap-6 border border-primary/15 bg-primary/2 p-6 md:p-8 lg:col-span-2"
                    >
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="sr-only">
                                    {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    autoComplete={field.autoComplete}
                                    maxLength={field.maxLength}
                                    placeholder={field.label}
                                    value={values[field.name]}
                                    onChange={(event) =>
                                        update(field.name, event.target.value)
                                    }
                                    aria-invalid={invalid.includes(field.name)}
                                    className={inputClass}
                                />
                            </div>
                        ))}

                        <div>
                            <label htmlFor="mensaje" className="sr-only">
                                Déjanos un mensaje
                            </label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                rows={2}
                                maxLength={MENSAJE_MAX}
                                placeholder="Déjanos un mensaje"
                                value={values.mensaje}
                                onChange={(event) =>
                                    update("mensaje", event.target.value)
                                }
                                aria-invalid={invalid.includes("mensaje")}
                                className={`${inputClass} resize-none`}
                            />
                            <p className="mt-1 text-right font-body text-xs text-primary/50">
                                {values.mensaje.length} / {MENSAJE_MAX}
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 text-center">
                            <button
                                type="submit"
                                disabled={!FORM_ENABLED}
                                className="inline-flex w-fit items-center gap-3 border border-primary px-8 py-3 font-body text-xs uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-secondary hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-primary disabled:hover:bg-transparent"
                            >
                                {FORM_ENABLED ? "Enviar" : "En construcción"}
                                <EnvelopeSimpleIcon size={16} weight="light" />
                            </button>

                            <div aria-live="polite">
                                {feedback && (
                                    <p
                                        className={`font-body text-xs uppercase tracking-widest ${feedback.ok ? "text-secondary" : "text-primary"
                                            }`}
                                    >
                                        {feedback.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.form>

                    <div className="flex flex-col justify-center gap-8">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={block(isDesktop ? 0.18 : 0)}
                            className="flex flex-col bg-primary px-8 py-8 md:px-10"
                        >
                            <h3 className="font-display text-3xl font-bold text-accent">
                                Cotiza tu casa
                            </h3>

                            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-accent/80 lg:text-base">
                                Escríbenos por WhatsApp y platicamos de tu
                                terreno, tu presupuesto y lo que necesitas.
                            </p>

                            <p className="mt-4 font-display text-lg font-semibold tracking-wider text-secondary">
                                {site.phoneLabel}
                            </p>

                            <a
                                href={quoteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex w-fit items-center gap-3 border border-accent px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-primary"
                            >
                                Mandar WhatsApp
                                <WhatsappLogoIcon size={16} weight="fill" />
                            </a>
                        </motion.div>

                        <motion.ul
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={block(isDesktop ? 0.36 : 0)}
                            className="flex justify-center gap-6"
                        >
                            {socials.map(({ label, href, Icon }) => (
                                <li key={label}>
                                    <motion.a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        whileHover={{ y: -4, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 18,
                                        }}
                                        className="flex h-16 w-16 items-center justify-center rounded-full border border-primary text-primary transition-colors duration-300 hover:bg-primary hover:text-accent"
                                    >
                                        <Icon size={28} weight="bold" />
                                    </motion.a>
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
