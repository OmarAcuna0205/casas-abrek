import type { Metadata } from "next";
import { Oswald, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteLoaderProvider } from "@/components/SiteLoader";
import { site } from "@/data/site";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// solo para citas
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
});

export const metadata: Metadata = {
  // base para las URLs absolutas (vista previa al compartir, canonical, sitemap)
  metadataBase: new URL(site.url),
  title: "Casas Abrek | Diseño y construcción de casas en Chihuahua",
  description:
    "Diseño y construcción de casas en Chihuahua. Construimos tu casa en tu terreno y hoy tenemos en preventa Casa Sinaí, de una planta y frente a parque.",
  // sin title ni url aqui: las paginas lo heredarian y al compartir todas saldrian
  // como la home. WhatsApp y Facebook usan el <title> y la description de cada una.
  // La imagen sale del opengraph-image.jpg de cada carpeta
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${oswald.variable} ${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* sin JavaScript el loader nunca se quitaria */}
        <noscript>
          <style>{"#site-loader{display:none}"}</style>
        </noscript>
        <SiteLoaderProvider>{children}</SiteLoaderProvider>
      </body>
    </html>
  );
}
