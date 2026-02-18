"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    Terminal,
    Send,
    CheckCircle,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

export const ContactSection = () => {
    const ref = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Replace these with your EmailJS credentials
            const result = await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
                formRef.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
            );

            if (result.text === "OK") {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setSubmitStatus("idle"), 5000);
            }
        } catch (error) {
            console.error("Email send failed:", error);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus("idle"), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black py-20 md:py-32"
        >
            {/* Grid background */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

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
                        $ cat contact.txt
                    </div>
                    <h2 className="mb-4 font-mono text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        <span className="text-green-400">&gt;</span> Get In Touch
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-400">
                        Have a project in mind or want to collaborate? Drop me a message!
                    </p>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-1 lg:gap-12">
                    {/* Contact Form - Terminal Style */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="rounded-xl border border-green-500/30 bg-[#1a1a1a] shadow-2xl shadow-green-500/10">
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between border-b border-green-500/30 bg-[#1a1a1a] px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="font-mono text-xs text-green-400">contact_form.sh</span>
                                </div>
                                <span className="font-mono text-xs text-gray-500">~/messages/new</span>
                            </div>

                            {/* Form */}
                            <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="font-mono text-xs text-green-300 mb-4">
                                    <span className="text-green-400">$</span> ./send_message --to pranav
                                </div>

                                {/* Name Input */}
                                <div>
                                    <label className="mb-2 block font-mono text-sm text-gray-400">
                                        <span className="text-green-400">--name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        required
                                        autoComplete="name"
                                        suppressHydrationWarning
                                        className="w-full rounded-lg border border-green-500/30 bg-slate-800/50 px-4 py-3 font-mono text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="mb-2 block font-mono text-sm text-gray-400">
                                        <span className="text-green-400">--email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        required
                                        autoComplete="email"
                                        suppressHydrationWarning
                                        className="w-full rounded-lg border border-green-500/30 bg-slate-800/50 px-4 py-3 font-mono text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                                    />
                                </div>

                                {/* Message Input */}
                                <div>
                                    <label className="mb-2 block font-mono text-sm text-gray-400">
                                        <span className="text-green-400">--message</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Your message here..."
                                        required
                                        rows={5}
                                        autoComplete="off"
                                        suppressHydrationWarning
                                        className="w-full resize-none rounded-lg border border-green-500/30 bg-slate-800/50 px-4 py-3 font-mono text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    suppressHydrationWarning
                                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-mono text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Send Message
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </>
                                    )}
                                </button>

                                {/* Success/Error Messages */}
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 font-mono text-sm text-green-400"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Message sent successfully! I'll get back to you soon.
                                    </motion.div>
                                )}

                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Failed to send message. Please try again or email directly.
                                    </motion.div>
                                )}

                                <p className="font-mono text-xs text-gray-500 text-center">
                                    <span className="text-green-300">&gt;</span> Message will be encrypted and sent securely
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};






