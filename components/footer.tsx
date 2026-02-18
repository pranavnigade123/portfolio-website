"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Terminal,
    Download,
    Github,
    Linkedin,
    Twitter,
    Mail,
    Heart,
    Coffee,
    Zap,
    Code2,
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    const [uptime, setUptime] = useState(0);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            setUptime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const quickLinks = [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/pranavnigade123", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/pranav-nigade", label: "LinkedIn" },
        { icon: Mail, href: "mailto:pranavv.nigade@gmail.com", label: "Email" },
    ];

    return (
        <footer className="relative w-full border-t border-green-500/30 bg-black pb-25">
            {/* Terminal-style footer */}
            <div className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10 md:py-12">
                {/* Top Section - Terminal Window */}
                <div className="mb-8 rounded-xl border border-green-500/30 bg-[#1a1a1a] shadow-2xl shadow-green-500/10">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="font-mono text-xs text-green-400">footer.sh</span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="grid gap-6 p-6 md:grid-cols-3">
                        {/* System Info */}
                        <div className="space-y-3">
                            <div className="font-mono text-sm text-green-400">$ cat /etc/info</div>
                            <div className="space-y-2 font-mono text-xs text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-300">&gt;</span>
                                    <span>Built with Next.js & ❤️</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-300">&gt;</span>
                                    <span>Powered by caffeine <Coffee className="inline h-3 w-3" /></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-300">&gt;</span>
                                    <span>© {currentYear} All rights reserved</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-3">
                            <div className="font-mono text-sm text-green-400">$ ls /navigation</div>
                            <div className="grid grid-cols-2 gap-2">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="font-mono text-xs text-gray-400 transition-colors hover:text-green-400"
                                    >
                                        <span className="text-green-400">▸</span> {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Resume Download */}
                        <div className="space-y-3">
                            <div className="font-mono text-sm text-green-400">$ ./download_resume</div>
                            <Link
                                href="/Pranav-Nigade-Resume.pdf"
                                download
                                className="group flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 font-mono text-sm text-green-400 transition-all hover:border-green-500/50 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20"
                            >
                                <Download className="h-4 w-4" />
                                <span>Resume.pdf</span>
                                <span className="ml-auto text-xs text-gray-500">PDF</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                aria-label={social.label}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/20 bg-[#1a1a1a]/60 text-gray-400 transition-all hover:border-green-500/40 hover:bg-[#1a1a1a] hover:text-green-400"
                            >
                                <social.icon className="h-4 w-4" />
                            </Link>
                        ))}
                    </div>

                    {/* Terminal Command */}
                    <div className="font-mono text-xs text-gray-500">
                        <span className="text-green-400">$</span> echo "Thanks for visiting! 🚀"
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                            className="ml-1 inline-block h-4 w-2 bg-green-400"
                        />
                    </div>

                    {/* Made with love */}
                    <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
                        <span>Crafted with</span>
                        <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                        <span>and</span>
                        <Code2 className="h-3 w-3 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Animated background gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent" />
        </footer>
    );
};






