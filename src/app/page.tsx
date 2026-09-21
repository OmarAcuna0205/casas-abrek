import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import BuildVsBuy from "@/sections/BuildVsBuy";
import Videos from "@/sections/Videos";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuildVsBuy />
        <Videos />
        <Projects />
      </main>
    </>
  );
}
