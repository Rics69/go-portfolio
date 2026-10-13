import { ApiSection } from "@/components/api/api-section";
import { Cases } from "@/components/cases/cases";
import { Hero } from "@/components/hero/hero";
import { Nav } from "@/components/nav";
import { Advantages } from "@/components/sections/advantages";
import { Metrics } from "@/components/sections/metrics";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <ApiSection />
        <Advantages />
        <Cases />
      </main>
    </>
  );
}
