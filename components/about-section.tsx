"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import {
    Terminal,
    Cloud,
    Server,
    Code2,
    Cpu,
    ExternalLink,
    Award,
    GraduationCap,
    School,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const skills = [
    {
        category: "Programming",
        icon: Code2,
        items: ["JavaScript", "TypeScript", "Python"],
        color: "from-violet-500 to-purple-600",
        borderColor: "border-violet-500/30",
    },
    {
        category: "Frontend",
        icon: Server,
        items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
        color: "from-blue-500 to-green-600",
        borderColor: "border-blue-500/30",
    },
    {
        category: "Backend",
        icon: Cloud,
        items: ["FastAPI", "Node.js", "Express", "REST APIs", "WebSockets"],
        color: "from-green-500 to-emerald-600",
        borderColor: "border-green-500/30",
    },
    {
        category: "Database & Cloud",
        icon: Cpu,
        items: ["PostgreSQL", "MongoDB", "Supabase", "Docker", "Azure", "AWS"],
        color: "from-green-500 to-red-600",
        borderColor: "border-green-500/30",
    },
];

const experience = [
    {
        year: "2024-2026",
        title: "Master of Computer Application",
        description: "MIT World Peace University, Pune • Expected 2026",
        icon: GraduationCap,
    },
    {
        year: "2021-2024",
        title: "Bachelor of Computer Application",
        description: "MIT World Peace University, Pune • CGPA: 8.93",
        icon: School,
    },
];

const certifications = [
    {
        name: "AWS Cloud Solutions Architect Specialization",
        issuer: "Coursera",
        date: "Feb 2026",
        image: "/certs/aws-architect.png",
        verifyLink: "https://www.coursera.org/account/accomplishments/professional-cert/Y8G810Y23ZVM",
        color: "from-green-500 to-yellow-500",
    },
    {
        name: "AWS Cloud Technical Essentials",
        issuer: "Coursera",
        date: "Jan 2026",
        image: "/certs/aws-essentials.png",
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/LCRK82FDD9A8",
        color: "from-blue-500 to-green-600",
    },
    {
        name: "Back End Domination",
        issuer: "Certificate Provider",
        date: "Jun 2025",
        image: "/certs/backend-domination.png",
        verifyLink: "https://drive.google.com/file/d/1LeUQp_neFoCEUvzo2O0qNdP-PUvSPCyQ/view",
        color: "from-green-500 to-emerald-600",
    },
];

function FloatingIcon3D({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
}

function Scene3D() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingIcon3D position={[-1, 0.5, 0]} />
            <FloatingIcon3D position={[1, -0.5, 0]} />
            <FloatingIcon3D position={[0, 0, 0.5]} />
        </>
    );
}

export const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedCert, setSelectedCert] = React.useState<typeof certifications[0] | null>(null);

    // Close modal on ESC key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedCert]);

    return (
        <section
            id="about"
            ref={ref}
            className="relative min-h-screen w-full overflow-hidden py-20 md:py-32"
        >
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
                        $ cat about.md
                    </div>
                    <h2 className="mb-4 font-mono text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        <span className="text-green-400">&gt;</span> About Me
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-400">
                        A passionate developer who loves building scalable systems and exploring new technologies
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-1 lg:gap-16">


                    {/* Right: Bio & Experience */}
                    <div className="space-y-8">
                        {/* Bio Terminal */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="rounded-lg border border-green-500/30 bg-[#1a1a1a] shadow-xl shadow-green-500/10"
                        >
                            <div className="flex items-center gap-2 border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="ml-2 font-mono text-xs text-green-400">bio.sh</span>
                            </div>
                            <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
                                <p className="mb-4">
                                    <span className="text-green-400">$</span> <span className="text-green-300">echo</span>{" "}
                                    <span className="text-yellow-300">&quot;Hello, World!&quot;</span>
                                </p>
                                <p className="mb-4">
                                    I&apos;m Pranav Nigade, an MCA student specializing in Full Stack Development with a strong interest in
                                    Cloud Computing and DevOps automation. I&apos;m passionate about building scalable web applications, improving
                                    deployment workflows, and exploring cloud-native architectures.
                                </p>
                               
                                <p>
                                    <span className="text-green-400">$</span> <span className="text-green-300">cat</span>{" "}
                                    <span className="text-yellow-300">motto.txt</span>
                                    <br />
                                    <span className="text-gray-400">&gt; &quot;Build it right, automate it, scale it.&quot;</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Experience Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="space-y-4"
                        >
                            <h3 className="mb-4 font-mono text-xl font-bold text-white">
                                <span className="text-green-400">#</span> Journey
                            </h3>
                            {experience.map(({ year, title, description, icon: Icon }, idx) => (
                                <motion.div
                                    key={year}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                                    className="group flex gap-4 rounded-lg border border-green-500/20 bg-[#1a1a1a]/80 p-4 backdrop-blur transition-all hover:border-green-500/40 hover:bg-[#1a1a1a]"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/10 text-green-400">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-1 flex items-center justify-between gap-2">
                                            <span className="font-semibold text-white">{title}</span>
                                            <span className="shrink-0 font-mono text-xs text-green-400">{year}</span>
                                        </div>
                                        <p className="text-sm text-gray-400">{description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Certifications Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="space-y-4 mt-8"
                        >
                            <h3 className="mb-4 font-mono text-xl font-bold text-white">
                                <span className="text-green-400">#</span> Certifications
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {certifications.map((cert, idx) => (
                                    <motion.div
                                        key={cert.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                                        className="group relative overflow-hidden rounded-lg border border-green-500/20 bg-[#1a1a1a]/80 backdrop-blur transition-all hover:border-green-500/40 hover:bg-[#1a1a1a]"
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                                        {/* Certificate Image */}
                                        <div
                                            className="relative h-52 overflow-hidden bg-slate-800/50 cursor-pointer"
                                            onClick={() => setSelectedCert(cert)}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Award className={`h-16 w-16 bg-gradient-to-br ${cert.color} bg-clip-text text-transparent opacity-20`} />
                                            </div>
                                            <Image
                                                src={cert.image}
                                                alt={cert.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {/* Click indicator */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                                                <div className="opacity-0 transition-opacity group-hover:opacity-100 rounded-full bg-white/10 backdrop-blur-sm p-3">
                                                    <ExternalLink className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-4">
                                            <div className="mb-2 flex items-start justify-between gap-2">
                                                <h4 className="font-mono text-sm font-bold leading-tight text-white">
                                                    {cert.name}
                                                </h4>
                                                <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 font-mono text-xs text-green-400">
                                                    {cert.date}
                                                </span>
                                            </div>
                                            <p className="mb-3 font-mono text-xs text-gray-400">{cert.issuer}</p>

                                            {/* Verify Link */}
                                            <Link
                                                href={cert.verifyLink}
                                                target="_blank"
                                                className="inline-flex items-center gap-1 font-mono text-xs text-green-400 transition-colors hover:text-green-300"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Verify Certificate
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Skills Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-20"
                >
                    <h3 className="mb-8 text-center font-mono text-2xl font-bold text-white md:text-3xl">
                        <span className="text-green-400">$</span> ls -la ~/skills/
                    </h3>

                    {/* Terminal-style Skills Display */}
                    <div className="mx-auto max-w-5xl rounded-xl border border-green-500/30 bg-[#1a1a1a] shadow-2xl shadow-green-500/10">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="ml-2 font-mono text-xs text-green-400">skills.sh</span>
                            </div>
                            <div className="hidden font-mono text-xs text-gray-500 sm:block">
                                drwxr-xr-x 4 pranav pranav 4096
                            </div>
                        </div>

                        {/* Skills Content */}
                        <div className="grid gap-0 md:grid-cols-2">
                            {skills.map(({ category, icon: Icon, items, color }, idx) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                                    className={`group border-green-500/20 p-6 transition-all hover:bg-slate-800/40 ${idx % 2 === 0 ? 'md:border-r' : ''
                                        } ${idx < 2 ? 'border-b' : ''}`}
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-mono text-sm font-bold text-white">{category}</h4>
                                            <p className="font-mono text-xs text-gray-500">
                                                <span className="text-green-400">$</span> cat {category.toLowerCase().replace(/\s+/g, '_')}.txt
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {items.map((item, itemIdx) => (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.8 + idx * 0.1 + itemIdx * 0.05, duration: 0.3 }}
                                                className="flex items-center gap-2 font-mono text-xs"
                                            >
                                                <span className="text-green-400">▸</span>
                                                <span className="text-green-300">[{itemIdx + 1}]</span>
                                                <span className="text-gray-300">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Terminal Footer */}
                        <div className="border-t border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                            <p className="font-mono text-xs text-gray-500">
                                <span className="text-green-400">$</span> echo "Total: {skills.reduce((acc, s) => acc + s.items.length, 0)} technologies mastered"
                                <br />
                                <span className="text-green-300">&gt; Total: {skills.reduce((acc, s) => acc + s.items.length, 0)} technologies mastered</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Certificate Modal */}
            {selectedCert && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedCert(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-h-[90vh] max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:rotate-90"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Certificate container */}
                        <div className="overflow-hidden rounded-xl border border-green-500/30 bg-[#1a1a1a] shadow-2xl shadow-green-500/20">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="ml-2 font-mono text-xs text-green-400">certificate_viewer.sh</span>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative bg-slate-800/50">
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <Image
                                        src={selectedCert.image}
                                        alt={selectedCert.name}
                                        fill
                                        className="object-contain"
                                        quality={100}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hint text */}
                        <p className="mt-4 text-center font-mono text-xs text-gray-500">
                            Click outside or press ESC to close
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};











