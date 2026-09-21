import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import BuildVsBuy from "@/sections/BuildVsBuy";
import Videos from "@/sections/Videos";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import { site } from "@/data/site";

// title y description vienen del layout raiz
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// datos estructurados: le dicen a Google que el sitio es de Casas Abrek, que es
// una constructora en Chihuahua y cuales son sus redes, para que ligue el nombre
// con la pagina. WebSite hace que en los resultados salga "Casas Abrek" y no la URL
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#sitio`,
      name: site.name,
      alternateName: "Abrek",
      url: site.url,
      inLanguage: "es-MX",
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${site.url}/#negocio`,
      name: site.name,
      description:
        "Diseño y construcción de casas en Chihuahua. Construimos tu casa en tu terreno y desarrollamos casas de una planta frente a parque.",
      url: site.url,
      logo: `${site.url}/logo.png`,
      image: `${site.url}/opengraph-image.jpg`,
      telephone: site.phoneLabel,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chihuahua",
        addressRegion: "Chihuahua",
        addressCountry: "MX",
      },
      areaServed: "Chihuahua",
      sameAs: [site.instagram, site.facebook, site.tiktok],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // "<" escapado como recomienda Next para que el JSON no pueda romper el HTML
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <BuildVsBuy />
        <Videos />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
