"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    WhatsappLogoIcon,
} from "@phosphor-icons/react";
import Dropdown from "@/components/Dropdown";
import {
    buildMessage,
    questions,
    schedules,
    type Answers,
} from "@/data/quiz";
import { whatsappLink } from "@/lib/whatsapp";
import sinaiImage from "../../../public/sinai.jpg";

const ease = [0.25, 1, 0.35, 1] as const;

// despues de las preguntas van los datos y al final el agradecimiento
const DATA_STEP = questions.length;
const THANKS_STEP = questions.length + 1;

// el avance se guarda por pestaña: si va al sitio y regresa con "atras", sigue
// donde se quedo (en el agradecimiento) en vez de empezar de cero
const STORAGE_KEY = "abrek-descubre";

type Saved = {
    step: number;
    answers: Answers;
    name: string;
    schedule: string;
    consent: boolean;
};

const specs = [
    { label: "Terreno", value: "242.4 m²" },
    { label: "Fraccionamiento", value: "Rincón de las Bugambilias" },
    {
        label: "Enganche de lanzamiento",
        hint: "Ya incluye el apartado de $50,000",
        value: "$510,000",
    },
];

// al avanzar el paso entra por la derecha y al regresar por la izquierda.
// transform y no x para que vaya por GPU
const slide = {
    enter: (direction: number) => ({
        opacity: 0,
        transform: `translateX(${direction * 24}px)`,
    }),
    center: { opacity: 1, transform: "translateX(0px)" },
    exit: (direction: number) => ({
        opacity: 0,
        transform: `translateX(${direction * -24}px)`,
    }),
};

// en el agradecimiento cada parte entra despues del boton de WhatsApp
const reveal = (delay: number) => ({
    initial: { opacity: 0, transform: "translateY(14px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 0.6, delay, ease },
});

// text-base en movil: con menos de 16px iOS hace zoom al escribir
const inputClass =
    "w-full border-b border-primary/20 bg-transparent pb-3 font-body text-base tracking-wide text-primary transition-colors placeholder:uppercase placeholder:tracking-widest placeholder:text-primary/60 focus:border-secondary focus:outline-none aria-invalid:border-primary lg:text-sm";

const smallLabel =
    "font-body text-[10px] font-semibold uppercase tracking-[0.25em]";

// salida al sitio: mucha gente llega aqui directo desde Instagram. Logo, flecha y
// texto son un solo link, asi funciona igual si picas el logo o las palabras
function BackToSite({ tone }: { tone: "light" | "dark" }) {
    const light = tone === "light";

    return (
        <Link
            href="/"
            className={`group flex w-fit flex-wrap items-center gap-x-5 gap-y-2 ${light ? "text-accent/80" : "text-primary/70"}`}
        >
            <Image
                src={light ? "/logo-claro.png" : "/logo.png"}
                alt="Casas Abrek"
                width={1606}
                height={589}
                sizes="(min-width: 1024px) 112px, 88px"
                loading="eager"
                className="h-auto w-22 lg:w-28"
            />
            <span
                className={`flex items-center gap-2 transition-colors duration-300 group-hover:text-secondary ${smallLabel}`}
            >
                <ArrowLeftIcon
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                Volver al sitio web
            </span>
        </Link>
    );
}

function SinaiPanel() {
    return (
        <motion.aside
            initial={{ opacity: 0, transform: "translateX(-20px)" }}
            animate={{ opacity: 1, transform: "translateX(0px)" }}
            transition={{ duration: 0.9, ease }}
            className="hidden min-h-0 flex-col px-8 py-10 text-accent lg:flex xl:px-10"
        >
            <BackToSite tone="light" />

            <p className="mt-10 font-display text-5xl font-bold leading-none">
                Casa Sinaí
            </p>

            <div className="relative mt-8 min-h-40 flex-1 overflow-hidden">
                <Image
                    src={sinaiImage}
                    alt="Fachada de Casa Sinaí, casa de una planta frente a parque"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, 0px"
                    className="object-cover"
                />
            </div>

            <dl className="mt-8">
                {specs.map((spec) => (
                    <div
                        key={spec.label}
                        className="flex items-center justify-between gap-4 border-t border-accent/15 py-3"
                    >
                        <dt className="font-body text-xs text-accent/70">
                            {spec.label}
                            {spec.hint && (
                                <span className="mt-0.5 block text-[10px] text-accent/50">
                                    {spec.hint}
                                </span>
                            )}
                        </dt>
                        <dd className="text-right font-body text-xs font-semibold">
                            {spec.value}
                        </dd>
                    </div>
                ))}
                <div className="flex items-center justify-between gap-4 border-t border-accent/15 pt-3">
                    <dt className="font-body text-xs text-accent/70">Precio</dt>
                    <dd className="font-display text-3xl font-bold text-secondary">
                        $5.1 M MXN
                    </dd>
                </div>
            </dl>
        </motion.aside>
    );
}

export default function Quiz() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [answers, setAnswers] = useState<Answers>({});
    const [name, setName] = useState("");
    const [schedule, setSchedule] = useState("");
    const [consent, setConsent] = useState(false);
    const [invalid, setInvalid] = useState<string[]>([]);
    // al cambiar de paso el foco pasa al nuevo titulo (lectores de pantalla y teclado)
    const moved = useRef(false);
    // cambia la key de las animaciones para que lo restaurado aparezca directo,
    // sin pasar por la transicion desde la pregunta 1
    const [restored, setRestored] = useState(false);

    // layout effect: se restaura antes de pintar, asi no se alcanza a ver la pregunta 1
    useLayoutEffect(() => {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return;
            }

            const saved = JSON.parse(raw) as Saved;
            if (typeof saved.step !== "number" || saved.step === 0) {
                return;
            }

            // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage solo existe en el navegador; el servidor siempre pinta la pregunta 1
            setStep(saved.step);
            setAnswers(saved.answers ?? {});
            setName(saved.name ?? "");
            setSchedule(saved.schedule ?? "");
            setConsent(Boolean(saved.consent));
            setRestored(true);
        } catch {
            // sin sessionStorage (modo privado, bloqueado) solo empieza de cero
        }
    }, []);

    useEffect(() => {
        try {
            const saved: Saved = { step, answers, name, schedule, consent };
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        } catch {
            // sin sessionStorage no se guarda el avance, el cuestionario funciona igual
        }
    }, [step, answers, name, schedule, consent]);

    const go = (next: number) => {
        moved.current = true;
        setDirection(next > step ? 1 : -1);
        setStep(next);
    };

    const choose = (questionId: string, optionId: string) => {
        setAnswers((current) => ({ ...current, [questionId]: optionId }));
        go(step + 1);
    };

    const clearInvalid = (field: string) => {
        setInvalid((current) => current.filter((item) => item !== field));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const missing = [
            !name.trim() && "nombre",
            !schedule && "horario",
            !consent && "aviso",
        ].filter((field): field is string => Boolean(field));
        setInvalid(missing);

        if (missing.length === 0) {
            go(THANKS_STEP);
        }
    };

    // useCallback: con una funcion nueva en cada render, React volvia a llamar el ref
    // con cada letra que se escribia y el foco se iba del campo de nombre al titulo.
    // Estable, solo corre cuando el titulo del paso aparece
    const focusOnMount = useCallback((element: HTMLHeadingElement | null) => {
        if (element && moved.current) {
            element.focus({ preventScroll: true });
        }
    }, []);

    const question = questions[step];
    const thanks = step === THANKS_STEP;

    return (
        <main className="flex h-dvh bg-primary p-3 lg:p-5">
            <div className="grid min-h-0 w-full grid-rows-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <SinaiPanel />

                {/* si la pantalla es baja, se hace scroll dentro del panel y no en la pagina */}
                <section className="flex min-h-0 flex-col overflow-y-auto bg-accent px-5 py-7 sm:px-8 lg:px-12 lg:py-10 xl:px-16">
                    <div className="mx-auto w-full max-w-3xl">
                        {/* en movil no hay panel de Casa Sinai: la salida va aqui */}
                        <div className="mb-6 lg:hidden">
                            <BackToSite tone="dark" />
                        </div>

                        <AnimatePresence key={`encabezado-${restored}`} mode="wait" initial={false}>
                            <motion.div
                                key={thanks ? "gracias" : "preguntas"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease }}
                                className={thanks ? "text-center" : ""}
                            >
                                <h1 className="font-display text-2xl font-bold leading-[1.05] text-black sm:text-4xl xl:text-5xl">
                                    {thanks ? (
                                        "Gracias por tu tiempo"
                                    ) : (
                                        <>
                                            Descubre si{" "}
                                            <span className="text-secondary">Casa Sinaí</span>{" "}
                                            es para ti
                                        </>
                                    )}
                                </h1>
                                <p className={`mt-3 max-w-lg font-body text-sm leading-relaxed text-primary/70 lg:text-base ${thanks ? "mx-auto" : ""}`}>
                                    {thanks
                                        ? "Haznos llegar tus respuestas por WhatsApp. El mensaje ya va listo, solo dale enviar."
                                        : "Responde 6 preguntas y conoce si esta residencia se ajusta a lo que estás buscando. Te tomará menos de un minuto."}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {!thanks && (
                            <div className="mt-6 lg:mt-8">
                                <div className="flex items-center justify-between">
                                    <p className={`text-primary/70 ${smallLabel}`}>
                                        {question
                                            ? `Pregunta ${step + 1} de ${questions.length}`
                                            : "Último paso"}
                                    </p>
                                    {step > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => go(step - 1)}
                                            className={`flex cursor-pointer items-center gap-2 text-primary/70 transition-colors duration-300 hover:text-secondary ${smallLabel}`}
                                        >
                                            <ArrowLeftIcon size={14} aria-hidden="true" />
                                            Anterior
                                        </button>
                                    )}
                                </div>
                                <div className="mt-3 h-0.5 bg-primary/10">
                                    {/* scaleX en vez de width para que la barra vaya por GPU */}
                                    <div
                                        className="h-full origin-left bg-secondary transition-transform duration-500 ease-out"
                                        style={{ transform: `scaleX(${step / questions.length})` }}
                                    />
                                </div>
                            </div>
                        )}

                        <AnimatePresence key={`paso-${restored}`} mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={slide}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease }}
                                className="mt-7 lg:mt-9"
                            >
                                {question && (
                                    <>
                                        {question.note && (
                                            <p className="mb-3 whitespace-pre-line border-l-2 border-secondary pl-3 font-body text-[11px] leading-relaxed text-primary/80 lg:hidden">
                                                {/* los pedazos impares del split son lo que iba entre ** */}
                                                {question.note.split(/\*\*(.+?)\*\*/).map((part, index) =>
                                                    index % 2 === 1 ? (
                                                        <strong key={index} className="font-bold text-primary">
                                                            {part}
                                                        </strong>
                                                    ) : (
                                                        part
                                                    )
                                                )}
                                            </p>
                                        )}
                                        {/* pre-line respeta los \n de la pregunta solo en movil */}
                                        <h2
                                            ref={focusOnMount}
                                            id="pregunta"
                                            tabIndex={-1}
                                            className="whitespace-pre-line font-display text-lg font-bold leading-tight text-primary outline-none lg:whitespace-normal lg:text-2xl"
                                        >
                                            {question.title}
                                        </h2>
                                        <ul
                                            aria-labelledby="pregunta"
                                            className="mt-5 grid gap-2.5 lg:mt-6"
                                        >
                                            {question.options.map((option, index) => {
                                                const selected = answers[question.id] === option.id;

                                                return (
                                                    <li key={option.id}>
                                                        <button
                                                            type="button"
                                                            onClick={() => choose(question.id, option.id)}
                                                            aria-pressed={selected}
                                                            className={`group flex w-full cursor-pointer items-center gap-4 border bg-white px-4 py-3.5 text-left transition-colors duration-300 hover:border-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary lg:gap-5 lg:px-5 lg:py-4 ${selected ? "border-secondary" : "border-primary/15"}`}
                                                        >
                                                            <span className="w-3 shrink-0 font-display text-sm font-bold text-secondary">
                                                                {String.fromCharCode(65 + index)}
                                                            </span>
                                                            <span className="flex-1 font-body text-sm leading-snug text-black">
                                                                {option.label}
                                                            </span>
                                                            <ArrowRightIcon
                                                                size={22}
                                                                weight="light"
                                                                aria-hidden="true"
                                                                className="shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1"
                                                            />
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </>
                                )}

                                {step === DATA_STEP && (
                                    <form onSubmit={handleSubmit} noValidate className="grid gap-7">
                                        <h2 ref={focusOnMount} tabIndex={-1} className="sr-only">
                                            Tus datos
                                        </h2>

                                        <div>
                                            <label htmlFor="nombre" className="sr-only">
                                                Nombre completo
                                            </label>
                                            <input
                                                id="nombre"
                                                name="nombre"
                                                type="text"
                                                autoComplete="name"
                                                maxLength={80}
                                                placeholder="Nombre completo"
                                                value={name}
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                    clearInvalid("nombre");
                                                }}
                                                aria-invalid={invalid.includes("nombre")}
                                                className={inputClass}
                                            />
                                        </div>

                                        <Dropdown
                                            label="Horario preferido para recibir contacto"
                                            options={schedules}
                                            value={schedule}
                                            onChange={(value) => {
                                                setSchedule(value);
                                                clearInvalid("horario");
                                            }}
                                            invalid={invalid.includes("horario")}
                                        />

                                        <label className="flex cursor-pointer items-start gap-3 font-body text-[10px] leading-relaxed text-primary/80">
                                            <input
                                                type="checkbox"
                                                checked={consent}
                                                onChange={(event) => {
                                                    setConsent(event.target.checked);
                                                    clearInvalid("aviso");
                                                }}
                                                aria-invalid={invalid.includes("aviso")}
                                                className="mt-px h-3.5 w-3.5 shrink-0 cursor-pointer accent-secondary"
                                            />
                                            {/* un solo span: si no, el link queda como otra columna del flex */}
                                            <span>
                                                Acepto que Casas Abrek utilice estos datos para contactarme y enviarme información relacionada con Casa Sinaí.
                                                {/* en otra pestaña para no salirse del cuestionario */}
                                                <Link
                                                    href="/aviso-de-privacidad"
                                                    target="_blank"
                                                    className="mt-1 block w-fit text-primary/60 underline underline-offset-2 transition-colors duration-300 hover:text-secondary"
                                                >
                                                    Consulta el aviso de privacidad
                                                </Link>
                                            </span>
                                        </label>

                                        <div className="flex flex-col items-start gap-3">
                                            <button
                                                type="submit"
                                                className="inline-flex cursor-pointer items-center gap-3 bg-primary px-8 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:bg-secondary hover:text-primary"
                                            >
                                                Ver mi resultado
                                                <ArrowRightIcon size={16} aria-hidden="true" />
                                            </button>
                                            <p aria-live="polite" className="font-body text-xs text-primary">
                                                {invalid.length > 0 &&
                                                    "Escribe tu nombre, elige un horario y acepta el aviso para continuar."}
                                            </p>
                                        </div>
                                    </form>
                                )}

                                {thanks && (
                                    <div className="flex flex-col items-center gap-6 text-center">
                                        <h2 ref={focusOnMount} tabIndex={-1} className="sr-only">
                                            Envía tus respuestas
                                        </h2>

                                        <a
                                            href={whatsappLink(buildMessage(name.trim(), schedule, answers))}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-primary px-8 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:bg-secondary hover:text-primary"
                                        >
                                            Enviar por WhatsApp
                                            <WhatsappLogoIcon size={18} weight="fill" aria-hidden="true" />
                                        </a>

                                        {/* despues de enviar, que conozcan el sitio: esta parte tiene que destacar */}
                                        <motion.span
                                            aria-hidden="true"
                                            initial={{ transform: "scaleX(0)" }}
                                            animate={{ transform: "scaleX(1)" }}
                                            transition={{ duration: 0.8, delay: 0.25, ease }}
                                            className="mt-2 block h-px w-16 bg-secondary"
                                        />

                                        <motion.p
                                            {...reveal(0.35)}
                                            className="max-w-sm font-body text-sm leading-relaxed text-primary/80 lg:text-base"
                                        >
                                            Tras enviar tus respuestas, visita nuestro sitio web
                                            para conocer más acerca de{" "}
                                            <span className="font-semibold text-secondary">Casa Sinaí</span>{" "}
                                            y <span className="font-semibold text-secondary">Casas Abrek</span>.
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, transform: "scale(0.85)" }}
                                            animate={{ opacity: 1, transform: "scale(1)" }}
                                            transition={{ delay: 0.55, type: "spring", stiffness: 260, damping: 12 }}
                                        >
                                            <Link
                                                href="/casa-sinai"
                                                className="group relative inline-flex items-center gap-4 overflow-hidden bg-secondary px-10 py-4 font-display text-base font-bold uppercase tracking-[0.2em] text-primary shadow-lg shadow-secondary/40 transition-colors duration-300 hover:bg-primary hover:text-accent lg:px-12 lg:py-5 lg:text-lg"
                                            >
                                                {/* destello que cruza el boton cada pocos segundos; la pausa va
                                                    en los keyframes porque repeatDelay no se acelera por GPU */}
                                                <motion.span
                                                    aria-hidden="true"
                                                    initial={{ transform: "translateX(-150%) skewX(-20deg)" }}
                                                    animate={{
                                                        transform: [
                                                            "translateX(-150%) skewX(-20deg)",
                                                            "translateX(350%) skewX(-20deg)",
                                                            "translateX(350%) skewX(-20deg)",
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        times: [0, 0.35, 1],
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 1.2,
                                                    }}
                                                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-accent/60 to-transparent"
                                                />
                                                <span className="relative">Ver Casa Sinaí</span>
                                                <motion.span
                                                    aria-hidden="true"
                                                    animate={{
                                                        transform: ["translateX(0px)", "translateX(6px)", "translateX(0px)"],
                                                    }}
                                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                                    className="relative"
                                                >
                                                    <ArrowRightIcon size={20} weight="bold" />
                                                </motion.span>
                                            </Link>
                                        </motion.div>

                                        <motion.div {...reveal(0.75)}>
                                            <Link
                                                href="/#construir"
                                                className={`flex items-center gap-2 text-primary transition-colors duration-300 hover:text-secondary ${smallLabel}`}
                                            >
                                                Construir en mi terreno
                                                <ArrowRightIcon size={14} aria-hidden="true" />
                                            </Link>
                                        </motion.div>

                                        {/* hasta abajo: regresa a la primera pregunta y lo que ya contesto sigue marcado */}
                                        <motion.button
                                            {...reveal(0.9)}
                                            type="button"
                                            onClick={() => go(0)}
                                            className={`mt-4 flex cursor-pointer items-center gap-2 text-primary/60 transition-colors duration-300 hover:text-secondary ${smallLabel}`}
                                        >
                                            <ArrowLeftIcon size={14} aria-hidden="true" />
                                            Cambiar mis respuestas
                                        </motion.button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>
            </div>
        </main>
    );
}
