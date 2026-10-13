import { ApiSection } from "@/components/api/api-section";
import { Cases } from "@/components/cases/cases";
import { ConsoleGreeting } from "@/components/console-greeting";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero/hero";
import { Nav } from "@/components/nav";
import { ScrollProgress } from "@/components/scroll-progress";
import { Advantages } from "@/components/sections/advantages";
import { Experience } from "@/components/sections/experience";
import { Metrics } from "@/components/sections/metrics";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ConsoleGreeting />
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <ApiSection />
        <Advantages />
        <Cases />
        <Experience />
        <Stack />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
