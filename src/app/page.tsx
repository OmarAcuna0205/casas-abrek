import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import BuildVsBuy from "@/sections/BuildVsBuy";
import Videos from "@/sections/Videos";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

// title y description vienen del layout raiz
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
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
