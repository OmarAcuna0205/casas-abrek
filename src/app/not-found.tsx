import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// la 404 de Next viene en ingles y sin estilos; esta usa la marca
export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="flex flex-1 flex-col items-center justify-center bg-accent px-6 pt-32 pb-20 text-center lg:pt-40 lg:pb-28">
                <p className="font-display text-8xl font-bold leading-none text-secondary lg:text-9xl">
                    404
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold text-primary lg:text-4xl">
                    Esta página no existe
                </h1>
                <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-primary/70 lg:text-base">
                    Puede que el link esté mal escrito o que la página ya no exista.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="bg-primary px-8 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:bg-secondary hover:text-primary"
                    >
                        Ir al inicio
                    </Link>
                    <Link
                        href="/casa-sinai"
                        className="border border-primary px-8 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-secondary hover:bg-secondary"
                    >
                        Ver Casa Sinaí
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
