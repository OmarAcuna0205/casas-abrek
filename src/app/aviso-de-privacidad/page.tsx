import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
    title: "Aviso de privacidad | Casas Abrek",
    description:
        "Cómo Casas Abrek usa y protege los datos personales que compartes en el sitio y por WhatsApp.",
    alternates: { canonical: "/aviso-de-privacidad" },
};

// domicilio no hay uno como tal: son de Chihuahua (lo confirmo Omar)

const heading = "mt-10 font-display text-xl font-bold text-primary lg:text-2xl";
const paragraph = "mt-3 font-body text-sm leading-relaxed text-primary/80 lg:text-base";
const list = `${paragraph} list-disc space-y-1.5 pl-5`;

export default function AvisoDePrivacidad() {
    return (
        <>
            <Navbar />
            <main className="bg-accent px-6 pt-32 pb-16 lg:px-10 lg:pt-40 lg:pb-24">
                <article className="mx-auto max-w-3xl">
                    <h1 className="font-display text-5xl font-bold uppercase leading-none text-primary sm:text-6xl">
                        Aviso de privacidad
                    </h1>
                    <p className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-primary/60">
                        Última actualización: 21 de septiembre de 2026
                    </p>

                    <h2 className={heading}>Responsable</h2>
                    <p className={paragraph}>
                        Casas Abrek, representada por el Ing. Josué Prieto, con domicilio en
                        Chihuahua, Chihuahua, México, es responsable del tratamiento de los
                        datos personales que nos compartes, conforme a la Ley Federal de
                        Protección de Datos Personales en Posesión de los Particulares.
                    </p>

                    <h2 className={heading}>Qué datos recabamos</h2>
                    <ul className={list}>
                        <li>
                            En el cuestionario &ldquo;Descubre si Casa Sinaí es para ti&rdquo;: tu
                            nombre, el horario en que prefieres que te contactemos y tus
                            respuestas sobre lo que buscas, cuándo te gustaría comprar, tu
                            rango de presupuesto, la forma de compra y el enganche.
                        </li>
                        <li>
                            Cuando nos escribes por WhatsApp: tu número de teléfono y lo que
                            compartas en la conversación.
                        </li>
                        <li>
                            Si usas el formulario de contacto: tu nombre, correo, teléfono y
                            mensaje.
                        </li>
                    </ul>
                    <p className={paragraph}>
                        Tu rango de presupuesto y la forma de compra son datos patrimoniales.
                        Por eso te pedimos tu consentimiento expreso con la casilla del
                        cuestionario. No recabamos datos personales sensibles.
                    </p>

                    <h2 className={heading}>Para qué los usamos</h2>
                    <p className={paragraph}>Para atenderte, que es la finalidad principal:</p>
                    <ul className={list}>
                        <li>Contactarte en el horario que elegiste.</li>
                        <li>
                            Enviarte la información de Casa Sinaí: presentación, condiciones de
                            preventa, precio y disponibilidad.
                        </li>
                        <li>
                            Orientarte sobre la opción que mejor se ajusta a lo que buscas,
                            incluida la construcción de tu casa en tu terreno.
                        </li>
                        <li>Agendar visitas y dar seguimiento a tu solicitud.</li>
                    </ul>
                    <p className={paragraph}>
                        Además, podemos enviarte información de nuevos proyectos de Casas
                        Abrek. Si no quieres recibirla, dínoslo por WhatsApp; eso no cambia la
                        atención que te damos.
                    </p>

                    <h2 className={heading}>Cómo nos llegan tus datos</h2>
                    <p className={paragraph}>
                        El cuestionario no guarda tus respuestas en ningún servidor. Al
                        terminar, se abre WhatsApp con un mensaje ya escrito y tú decides si lo
                        envías. Mientras respondes, tu avance se guarda solo en tu navegador
                        para que no lo pierdas, y se borra al cerrar la pestaña. WhatsApp es un
                        servicio de Meta y se rige por sus propias políticas de privacidad.
                    </p>
                    <p className={paragraph}>
                        El formulario de contacto nos llega por correo a través de Web3Forms, un
                        servicio que solo se encarga de entregarnos tu mensaje.
                    </p>

                    <h2 className={heading}>Con quién los compartimos</h2>
                    <p className={paragraph}>
                        No vendemos ni compartimos tus datos con terceros, salvo en los casos en
                        que la ley lo permite o lo exige.
                    </p>

                    <h2 className={heading}>Tus derechos</h2>
                    <p className={paragraph}>
                        Puedes acceder a tus datos, corregirlos, pedir que los eliminemos u
                        oponerte a que los usemos (derechos ARCO), y también retirar tu
                        consentimiento. Para hacerlo, escríbenos por WhatsApp al{" "}
                        <a
                            href={`https://wa.me/${site.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-300 hover:text-secondary hover:decoration-secondary"
                        >
                            {site.phoneLabel}
                        </a>{" "}
                        o al correo{" "}
                        <a href={`mailto:${site.email}`} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-300 hover:text-secondary hover:decoration-secondary">
                            {site.email}
                        </a>
                        , con tu nombre, lo que necesitas y un medio para responderte. Te
                        contestamos en un plazo máximo de 20 días hábiles.
                    </p>

                    <h2 className={heading}>Cookies y contenido de terceros</h2>
                    <p className={paragraph}>
                        Este sitio no usa cookies propias de rastreo ni de publicidad. La
                        sección de videos muestra publicaciones de Instagram, que pueden usar
                        sus propias cookies conforme a las políticas de Meta.
                    </p>

                    <h2 className={heading}>Cambios a este aviso</h2>
                    <p className={paragraph}>
                        Si cambiamos este aviso, publicaremos la nueva versión en esta misma
                        página con su fecha de actualización.
                    </p>
                </article>
            </main>
            <Footer />
        </>
    );
}
