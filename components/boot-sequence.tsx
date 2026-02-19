"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootMessage {
  status: "ok" | "loading" | "info";
  message: string;
  delay: number;
}

const bootMessages: BootMessage[] = [
  { status: "loading", message: "Initializing system...", delay: 0 },
  { status: "ok", message: "Starting portfolio services...", delay: 400 },
  { status: "ok", message: "Loading Pranav Nigade profile...", delay: 800 },
  { status: "ok", message: "Mounting projects directory...", delay: 1200 },
  { status: "ok", message: "Initializing contact form...", delay: 1600 },
  { status: "ok", message: "Loading interactive terminal...", delay: 2000 },
  { status: "ok", message: "Configuring network interfaces...", delay: 2400 },
  { status: "info", message: "Welcome to Pranav's Portfolio v1.0", delay: 2800 },
];

export const BootSequence = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Check if user has seen boot sequence before
    const hasSeenBoot = sessionStorage.getItem("hasSeenBoot");
    
    if (hasSeenBoot) {
      setIsBooting(false);
      return;
    }

    // Show messages one by one
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
      }, msg.delay);
    });

    // Show welcome message
    setTimeout(() => {
      setShowWelcome(true);
      setCanSkip(true); // Allow skipping after welcome message appears
    }, 3200);
  }, []);

  useEffect(() => {
    if (!canSkip) return;

    const handleSkip = () => {
      setIsBooting(false);
      sessionStorage.setItem("hasSeenBoot", "true");
    };

    // Handle keyboard
    const handleKeyPress = (e: KeyboardEvent) => {
      handleSkip();
    };

    // Handle touch/click
    const handleClick = () => {
      handleSkip();
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, [canSkip]);

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      >
        <div className="w-full max-w-3xl px-6">
          {/* Boot Messages */}
          <div className="space-y-2 font-mono text-sm sm:text-base">
            {bootMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  visibleMessages.includes(index)
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-start gap-3"
              >
                {/* Status Indicator */}
                {msg.status === "ok" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="shrink-0 text-green-400"
                  >
                    [<span className="font-bold">  OK  </span>]
                  </motion.span>
                )}
                {msg.status === "loading" && (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="shrink-0 text-yellow-400"
                  >
                    [<span className="font-bold"> LOAD </span>]
                  </motion.span>
                )}
                {msg.status === "info" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="shrink-0 text-cyan-400"
                  >
                    [<span className="font-bold"> INFO </span>]
                  </motion.span>
                )}

                {/* Message with typing effect */}
                <motion.span
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {msg.message}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Welcome Message */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-4"
                >
                  <div className="text-4xl sm:text-6xl font-bold font-mono">
                    <motion.span
                      className="inline-block text-green-400"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      &gt;
                    </motion.span>
                    <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      _
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <p className="font-mono text-sm text-gray-400">
                    <span className="hidden sm:inline">System ready. Press any key to continue...</span>
                    <span className="sm:hidden">System ready. Tap anywhere to continue...</span>
                  </p>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex justify-center gap-1"
                  >
                    <div className="h-1 w-1 rounded-full bg-green-400" />
                    <div className="h-1 w-1 rounded-full bg-green-400" />
                    <div className="h-1 w-1 rounded-full bg-green-400" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500"
              />
            </div>
          </motion.div>

          {/* Scanline Effect */}
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"
            style={{ height: "100px" }}
          />
        </div>

        {/* CRT Screen Effect */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
      </motion.div>
    </AnimatePresence>
  );
};
