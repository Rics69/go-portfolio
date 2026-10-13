import { ApiSection } from "@/components/api/api-section";
import { Cases } from "@/components/cases/cases";
import { Hero } from "@/components/hero/hero";
import { Nav } from "@/components/nav";
import { Advantages } from "@/components/sections/advantages";
import { Experience } from "@/components/sections/experience";
import { Metrics } from "@/components/sections/metrics";
import { Stack } from "@/components/sections/stack";

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
        <Experience />
        <Stack />
      </main>
    </>
  );
}
