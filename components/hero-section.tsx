"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Cloud, Server, Code2, Database, GitBranch } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import type { Points as ThreePoints } from "three";

type StarBackgroundProps = React.ComponentProps<typeof Points>;

function StarBackground(props: StarBackgroundProps) {
  const ref = useRef<ThreePoints | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#10b981"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const terminalCommands = [
  "$ whoami",
  "> Full-Stack Developer",
  "$ cat Degree.txt",
  "> MCA Student",
  "$ uptime",
  "> Building scalable web applications...",
];

const techStack = [
  { icon: Terminal, label: "Linux", color: "text-green-400" },
  { icon: Cloud, label: "Cloud", color: "text-sky-400" },
  { icon: Server, label: "DevOps", color: "text-blue-400" },
  { icon: Code2, label: "Scripting", color: "text-green-500" },
  { icon: GitBranch, label: "Git", color: "text-teal-400" },
];

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black py-20" id="hero">
      {/* Matrix-style background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarBackground />
        </Canvas>
      </div>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#10b981" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 font-mono text-xs text-green-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Pranav Nigade
        </motion.div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 mt-4"
          >
            {/* Terminal Header */}
            <div className="rounded-t-lg border border-green-500/30 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] shadow-2xl shadow-green-500/20">
              <div className="flex items-center gap-2 border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 font-mono text-xs text-green-400">pranav@portfolio:~$</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                {terminalCommands.map((cmd, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 + 0.5, duration: 0.4 }}
                    className={cmd.startsWith("$") || cmd.startsWith(">") ? "" : "ml-2"}
                  >
                    <span className={cmd.startsWith("$") ? "text-green-400" : cmd.startsWith(">") ? "text-gray-300" : "text-gray-400"}>
                      {cmd}
                    </span>
                    {idx === terminalCommands.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="ml-1 inline-block h-4 w-2 bg-green-400"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {techStack.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="group flex items-center gap-2 rounded-lg border border-green-500/20 bg-[#1a1a1a]/80 px-3 py-2.5 backdrop-blur transition-all hover:border-green-500/40 hover:bg-[#1a1a1a]"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  <span className="text-xs font-medium text-gray-300">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="pt-0 mt-0 mb-6 font-mono text-5xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="text-green-400">$</span>Full Stack{" "}
              <span className="bg-gradient-to-r from-green-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl"
            >
              MCA student specializing in{" "}
              <span className="font-semibold text-green-400">Full Stack Development</span> with a strong interest in{" "}
              <span className="font-semibold text-sky-400">Cloud Computing</span> and{" "}
              <span className="font-semibold text-blue-400">DevOps automation</span>.
              Passionate about building scalable web applications, improving deployment workflows, and exploring cloud native architectures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 font-mono text-sm font-semibold text-black shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50"
              >
                <Terminal className="h-4 w-4" />
                View Projects
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-8 py-3 font-mono text-sm font-semibold text-green-400 backdrop-blur transition-all hover:border-green-500/50 hover:bg-green-500/20"
              >
                <Code2 className="h-4 w-4" />
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="pointer-events-none absolute bottom-32 left-1/2 -translate-x-1/2 font-mono text-xs text-green-500/50 md:bottom-16"
      >
        ↓
      </motion.div>
    </section>
  );
};









