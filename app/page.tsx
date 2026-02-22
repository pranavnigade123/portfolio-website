"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { BootSequence } from "@/components/boot-sequence";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-x-hidden">
      {/* Global gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-slate-950 via-30% to-black" />
      
      {/* Global grid pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <BootSequence />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      <FloatingNav onTerminalClick={() => setIsTerminalOpen(true)} />
      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </main>
  );
}
