import type { Metadata } from "next";
import { Oswald, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteLoaderProvider } from "@/components/SiteLoader";

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
  title: "Casas Abrek | Diseño y construcción de casas en Chihuahua",
  description:
    "Diseño y construcción de casas en Chihuahua. Construimos tu casa en tu terreno y hoy tenemos en preventa Casa Sinaí, de una planta y frente a parque.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
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
