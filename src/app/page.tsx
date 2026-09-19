import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import BuildVsBuy from "@/sections/BuildVsBuy";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuildVsBuy />
      </main>
    </>
  );
}
