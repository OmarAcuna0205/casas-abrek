"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";

const ease = [0.25, 1, 0.35, 1] as const;

// select hecho a mano: el nativo no se puede estilizar. Sigue el patron de
// "select-only combobox": el foco se queda en el boton y las flechas mueven la
// opcion activa; Enter elige y Escape cierra
export default function Dropdown({
    label,
    options,
    value,
    onChange,
    invalid = false,
}: {
    // se lee como placeholder mientras no hay nada elegido
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    invalid?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    // cerrar al tocar fuera
    useEffect(() => {
        if (!open) {
            return;
        }

        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const openList = () => {
        setActive(Math.max(0, options.indexOf(value)));
        setOpen(true);
    };

    const select = (option: string) => {
        onChange(option);
        setOpen(false);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!open) {
            if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
                event.preventDefault();
                openList();
            }
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((current) => Math.min(current + 1, options.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((current) => Math.max(current - 1, 0));
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            select(options[active]);
        } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Tab") {
            setOpen(false);
        }
    };

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                role="combobox"
                aria-label={label}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open ? `${listId}-${active}` : undefined}
                aria-invalid={invalid}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={onKeyDown}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 border-b pb-3 text-left font-body text-base tracking-wide transition-colors focus:border-secondary focus:outline-none lg:text-sm ${invalid ? "border-primary" : "border-primary/20"} ${value ? "text-primary" : "uppercase tracking-widest text-primary/60"}`}
            >
                {value || label}
                <CaretDownIcon
                    size={16}
                    aria-hidden="true"
                    className={`shrink-0 text-primary/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        id={listId}
                        role="listbox"
                        aria-label={label}
                        initial={{ opacity: 0, transform: "translateY(-6px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, transform: "translateY(-6px)" }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute inset-x-0 top-full z-20 mt-2 border border-primary/15 bg-white py-1 shadow-lg shadow-primary/10"
                    >
                        {options.map((option, index) => {
                            const selected = option === value;

                            return (
                                <li
                                    key={option}
                                    id={`${listId}-${index}`}
                                    role="option"
                                    aria-selected={selected}
                                    // mousedown sin foco: si no, el boton pierde el foco antes del clic
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => select(option)}
                                    onMouseEnter={() => setActive(index)}
                                    className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 font-body text-sm text-black transition-colors ${index === active ? "bg-secondary/15" : ""}`}
                                >
                                    {option}
                                    {selected && (
                                        <CheckIcon
                                            size={16}
                                            aria-hidden="true"
                                            className="shrink-0 text-secondary"
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
