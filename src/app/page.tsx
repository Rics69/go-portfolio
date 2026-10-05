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
        <Advantages />
      </main>
    </>
  );
}
