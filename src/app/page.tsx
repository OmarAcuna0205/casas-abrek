import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import BuildVsBuy from "@/sections/BuildVsBuy";
import Videos from "@/sections/Videos";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuildVsBuy />
        <Videos />
      </main>
    </>
  );
}
