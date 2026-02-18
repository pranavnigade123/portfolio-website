import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { BootSequence } from "@/components/boot-sequence";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen flex flex-col items-center justify-between overflow-x-hidden">
      <BootSequence />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      <FloatingNav />
      <InteractiveTerminal />
    </main>
  );
}
