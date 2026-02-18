"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import {
    Terminal,
    Github,
    ExternalLink,
    Code2,
    Server,
    Database,
    Cloud,
    Cpu,
    Zap,
    Lock,
    Globe,
} from "lucide-react";
import Link from "next/link";

// Actual projects
const projects = [
    {
        id: 1,
        title: "DrawV",
        description: "Full-stack SSR Tournament Management Platform with RESTful APIs, dynamic tournament creation, automated team/solo registrations, and public utilities like map-veto and coin-toss simulators.",
        command: "$ npm run build",
        tech: ["Next.js 15", "Node.js", "MongoDB Atlas", "NextAuth.js", "TypeScript", "Tailwind CSS"],
        category: "Full-Stack",
        icon: Server,
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        github: "https://github.com/pranavnigade123/drawv",
        demo: "https://www.drawfive.in",
        status: "Production",
        year: "2025",
        metrics: { load: "<1.5s", uptime: "99.5%", players: "160+" },
        highlights: ["SSR Platform", "Tournament Management", "Live Event Ready"],
    },
    {
        id: 2,
        title: "Drawzzl",
        description: "Real-time multiplayer drawing game supporting 8+ concurrent users with <100ms WebSocket latency and 50+ simultaneous game rooms. Deployed on Azure Container Apps with auto-scaling.",
        command: "$ npm start",
        tech: ["React", "Next.js", "Node.js", "TypeScript", "Socket.IO", "MongoDB", "Docker"],
        category: "Full-Stack",
        icon: Code2,
        gradient: "from-purple-500 via-pink-500 to-red-500",
        github: "https://github.com/pranavnigade123/drawzzl-frontend",
        demo: "https://drawzzl-frontend-two.vercel.app/",
        status: "Production",
        year: "2024",
        metrics: { uptime: "99.9%", latency: "<100ms", users: "8+" },
        highlights: ["Real-time Multiplayer", "Auto-scaling", "JWT Authentication"],
    },
    {
        id: 3,
        title: "Clearon",
        description: "Production-grade RAG Knowledge Management Platform enabling semantic search and intelligent document processing across PDF, CSV, and web data sources. Integrated Azure OpenAI with PostgreSQL vector storage.",
        command: "$ npm run dev",
        tech: ["Next.js", "FastAPI", "Azure OpenAI", "PostgreSQL", "pgvector", "Docker"],
        category: "Full-Stack",
        icon: Zap,
        gradient: "from-blue-500 via-green-500 to-teal-500",
        github: "https://github.com/pranavnigade123/clearon",
        demo: "https://github.com/pranavnigade123/clearon",
        status: "Production",
        year: "2024-2026",
        metrics: { performance: "97%↑", memory: "75%↓", startup: "85%↓" },
        highlights: ["RAG Platform", "Vector Search", "Azure OpenAI Integration"],
    },
];

function FloatingOrb({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Sphere ref={meshRef} args={[0.8, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

function ProjectCard3D() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingOrb position={[0, 0, 0]} color="#10b981" />
        </>
    );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full"
        >


            {/* Main card */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] shadow-2xl">
                {/* Terminal Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="font-mono text-xs text-green-400">project_{project.id}.sh</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-800/50 px-2 py-0.5 font-mono text-xs text-gray-400">
                            {project.year}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${project.status === "Production" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* 3D Canvas Background */}
                <div className="absolute right-0 top-0 h-32 w-32 opacity-20 sm:h-48 sm:w-48 sm:opacity-30">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                        <ProjectCard3D />
                    </Canvas>
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col p-4 sm:p-6">
                    {/* Icon, Title & Category */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex flex-1 items-start gap-3">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg sm:h-14 sm:w-14`}>
                                <project.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                                {/* Title */}
                                <h3 className="mb-1 font-mono text-base font-bold leading-tight text-white transition-colors group-hover:text-green-400 sm:text-lg">
                                    {project.title}
                                </h3>
                                {/* Command */}
                                <div className="font-mono text-xs text-green-300">
                                    <span className="text-green-400">$</span> {project.command}
                                </div>
                            </div>
                        </div>
                        <span className="shrink-0 rounded-lg border border-green-500/30 bg-green-500/10 px-2 py-1 font-mono text-xs text-green-400 sm:px-3">
                            {project.category}
                        </span>
                    </div>


                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">
                        {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg border border-green-500/20 bg-slate-800/30 p-3">
                        {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="font-mono text-sm font-bold text-green-400 sm:text-base">{value}</div>
                                <div className="text-xs capitalize text-gray-500">{key}</div>
                            </div>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div className="mb-4 space-y-1.5">
                        {project.highlights.map((highlight, idx) => (
                            <motion.div
                                key={highlight}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex items-center gap-2 text-xs text-gray-400"
                            >
                                <span className="text-green-400">✓</span>
                                {highlight}
                            </motion.div>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-green-500/20 bg-slate-800/50 px-2 py-1 font-mono text-xs text-gray-300 transition-colors hover:border-green-500/40 hover:text-green-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex gap-2 sm:gap-3">
                        <Link
                            href={project.github}
                            target="_blank"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 font-mono text-sm text-green-400 transition-all hover:border-green-500/50 hover:bg-green-500/20 sm:px-4"
                        >
                            <Github className="h-4 w-4" />
                            <span className="hidden sm:inline">Code</span>
                        </Link>
                        <Link
                            href={project.demo}
                            target="_blank"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-2 font-mono text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-green-500/50 sm:px-4"
                        >
                            <ExternalLink className="h-4 w-4" />
                            <span className="hidden sm:inline">Demo</span>
                        </Link>
                    </div>
                </div>

                {/* Hover overlay effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5"
                />
            </div>
        </motion.div>
    );
}

export const ProjectsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="projects"
            ref={ref}
            className="relative min-h-screen w-full overflow-hidden bg-black py-20 md:py-32"
        >
            {/* Animated grid background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5"
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 font-mono text-xs text-green-400">
                        <Terminal className="h-3 w-3" />
                        $ ls -la ~/projects/
                    </div>
                    <h2 className="mb-4 font-mono text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        <span className="text-green-400">&gt;</span> Featured Projects
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-400">
                        A showcase of production-ready applications built with modern technologies
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* View More CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="https://github.com/pranavnigade123"
                        target="_blank"
                        className="group inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-8 py-3 font-mono text-sm font-semibold text-green-400 backdrop-blur transition-all hover:border-green-500/50 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20"
                    >
                        <Github className="h-5 w-5" />
                        View All Projects on GitHub
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};









