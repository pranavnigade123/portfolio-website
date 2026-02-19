"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, Mail, Terminal } from "lucide-react";
import Link from "next/link";

export const FloatingNav = ({ 
  className,
  onTerminalClick 
}: { 
  className?: string;
  onTerminalClick?: () => void;
}) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Check from bottom to top to prioritize lower sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(
          section === "home" ? "hero" : section
        );
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />,
      command: "cd ~",
      id: "home",
      colors: {
        bg: "bg-blue-500/15",
        border: "border-blue-400/40",
        shadow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        hoverBorder: "hover:border-blue-400/30",
        hoverShadow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
        text: "text-blue-400",
        hoverText: "text-blue-300",
        glow: "bg-blue-500/20",
        glowHover: "bg-blue-400/10",
        indicator: "bg-blue-400",
        indicatorShadow: "shadow-[0_0_10px_rgba(59,130,246,0.8)]",
        tooltipText: "text-blue-300",
        tooltipPrompt: "text-blue-500/60",
        tooltipBorder: "border-blue-500/30",
      },
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4 sm:h-5 sm:w-5" />,
      command: "whoami",
      id: "about",
      colors: {
        bg: "bg-purple-500/15",
        border: "border-purple-400/40",
        shadow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
        hoverBorder: "hover:border-purple-400/30",
        hoverShadow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]",
        text: "text-purple-400",
        hoverText: "text-purple-300",
        glow: "bg-purple-500/20",
        glowHover: "bg-purple-400/10",
        indicator: "bg-purple-400",
        indicatorShadow: "shadow-[0_0_10px_rgba(168,85,247,0.8)]",
        tooltipText: "text-purple-300",
        tooltipPrompt: "text-purple-500/60",
        tooltipBorder: "border-purple-500/30",
      },
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />,
      command: "ls -la",
      id: "projects",
      colors: {
        bg: "bg-green-500/15",
        border: "border-green-400/40",
        shadow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
        hoverBorder: "hover:border-green-400/30",
        hoverShadow: "hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]",
        text: "text-green-400",
        hoverText: "text-green-300",
        glow: "bg-green-500/20",
        glowHover: "bg-green-400/10",
        indicator: "bg-green-400",
        indicatorShadow: "shadow-[0_0_10px_rgba(34,211,238,0.8)]",
        tooltipText: "text-green-300",
        tooltipPrompt: "text-green-500/60",
        tooltipBorder: "border-green-500/30",
      },
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5" />,
      command: "echo hello",
      id: "contact",
      colors: {
        bg: "bg-green-500/15",
        border: "border-green-400/40",
        shadow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
        hoverBorder: "hover:border-green-400/30",
        hoverShadow: "hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]",
        text: "text-green-400",
        hoverText: "text-green-300",
        glow: "bg-green-500/20",
        glowHover: "bg-green-400/10",
        indicator: "bg-green-400",
        indicatorShadow: "shadow-[0_0_10px_rgba(34,197,94,0.8)]",
        tooltipText: "text-green-300",
        tooltipPrompt: "text-green-500/60",
        tooltipBorder: "border-green-500/30",
      },
    },
    {
      name: "Terminal",
      link: "#",
      icon: <Terminal className="h-4 w-4 sm:h-5 sm:w-5" />,
      command: "./terminal",
      id: "terminal",
      isTerminal: true,
      colors: {
        bg: "bg-emerald-500/15",
        border: "border-emerald-400/40",
        shadow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
        hoverBorder: "hover:border-emerald-400/30",
        hoverShadow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]",
        text: "text-emerald-400",
        hoverText: "text-emerald-300",
        glow: "bg-emerald-500/20",
        glowHover: "bg-emerald-400/10",
        indicator: "bg-emerald-400",
        indicatorShadow: "shadow-[0_0_10px_rgba(16,185,129,0.8)]",
        tooltipText: "text-emerald-300",
        tooltipPrompt: "text-emerald-500/60",
        tooltipBorder: "border-emerald-500/30",
      },
    },
  ];

  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className={cn(
        "fixed bottom-4 sm:bottom-8 inset-x-0 mx-auto z-50 flex justify-center px-4",
        className
      )}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_50px_rgba(59,130,246,0.25)] transition-all duration-500"
      >
        {/* Aurora gradient backdrop */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-blue-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Refined grid pattern */}
        <div
          className="absolute inset-0 rounded-3xl opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {navItems.map((navItem, idx) => (
          <IconContainer
            mouseX={mouseX}
            key={idx}
            isActive={activeSection === navItem.id}
            isMobile={isMobile}
            onTerminalClick={navItem.isTerminal ? onTerminalClick : undefined}
            {...navItem}
          />
        ))}
      </motion.div>
    </div>
  );
};

function IconContainer({
  mouseX,
  icon,
  link,
  command,
  isActive,
  isMobile,
  colors,
  isTerminal,
  onTerminalClick,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  icon: React.ReactNode;
  link: string;
  command: string;
  isActive: boolean;
  isMobile?: boolean;
  isTerminal?: boolean;
  onTerminalClick?: () => void;
  colors: {
    bg: string;
    border: string;
    shadow: string;
    hoverBorder: string;
    hoverShadow: string;
    text: string;
    hoverText: string;
    glow: string;
    glowHover: string;
    indicator: string;
    indicatorShadow: string;
    tooltipText: string;
    tooltipPrompt: string;
    tooltipBorder: string;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isTerminal && onTerminalClick) {
      e.preventDefault();
      onTerminalClick();
    }
  };

  const content = (
      <motion.div
        ref={ref}
        style={isMobile ? {} : { width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative transition-all duration-300 border",
          isMobile ? "w-11 h-11 sm:w-12 sm:h-12" : "",
          isActive
            ? `${colors.bg} ${colors.border} ${colors.shadow}`
            : `bg-white/5 border-white/10 hover:bg-white/10 ${colors.hoverBorder} ${colors.hoverShadow}`,
          isTerminal ? "cursor-pointer" : ""
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: 5, x: "-50%", scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute -top-12 sm:-top-14 left-1/2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/90 text-[10px] sm:text-xs rounded-xl border whitespace-nowrap backdrop-blur-xl font-mono shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
                colors.tooltipText,
                colors.tooltipBorder
              )}
            >
              <div className="flex items-center gap-2">
                <span className={colors.tooltipPrompt}>$</span>
                <span className={colors.tooltipText}>{command}</span>
              </div>
              {/* Tooltip arrow */}
              <div
                className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/90 border-r border-b",
                  colors.tooltipBorder
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={cn(
            "relative z-10 transition-all duration-300",
            isActive
              ? colors.text
              : hovered
              ? colors.hoverText
              : "text-neutral-400"
          )}
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>

        {/* Elegant glow ring */}
        {(hovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn(
              "absolute inset-0 rounded-full blur-lg",
              isActive ? colors.glow : colors.glowHover
            )}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Active indicator line */}
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className={cn(
              "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full",
              colors.indicator,
              colors.indicatorShadow
            )}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
  );

  return isTerminal ? (
    <div>{content}</div>
  ) : (
    <Link href={link}>{content}</Link>
  );
}



