"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

interface Command {
  input: string;
  output: string | React.ReactElement;
}

export const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string | React.ReactElement> = {
    help: () => (
      <div className="space-y-1">
        <div className="text-green-400 font-semibold">Available commands:</div>
        <div className="ml-2 space-y-0.5 text-gray-300 text-xs sm:text-sm">
          <div><span className="text-cyan-300">help</span> - Show this help message</div>
          <div><span className="text-cyan-300">about</span> - Learn about me</div>
          <div><span className="text-cyan-300">skills</span> - List my technical skills</div>
          <div><span className="text-cyan-300">projects</span> - View my projects</div>
          <div><span className="text-cyan-300">education</span> - Show my education</div>
          <div><span className="text-cyan-300">contact</span> - Get contact information</div>
          <div><span className="text-cyan-300">whoami</span> - Display user info</div>
          <div><span className="text-cyan-300">ls</span> - List directory contents</div>
          <div><span className="text-cyan-300">pwd</span> - Print working directory</div>
          <div><span className="text-cyan-300">clear</span> - Clear terminal screen</div>
          <div><span className="text-cyan-300">neofetch</span> - Display system information</div>
          <div><span className="text-cyan-300">github</span> - Open GitHub profile</div>
          <div><span className="text-cyan-300">linkedin</span> - Open LinkedIn profile</div>
          <div><span className="text-cyan-300">resume</span> - Download resume</div>
        </div>
      </div>
    ),
    about: () => (
      <div className="space-y-2 text-gray-300 text-xs sm:text-sm">
        <div className="text-green-400 font-semibold">About Pranav Nigade:</div>
        <div className="leading-relaxed">
          MCA student specializing in Full Stack Development with a strong
          interest in Cloud Computing and DevOps automation. Passionate about
          building scalable web applications and exploring cloud-native architectures.
        </div>
      </div>
    ),
    skills: () => (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold text-xs sm:text-sm">Technical Skills:</div>
        <div className="ml-2 space-y-1 text-gray-300 text-xs sm:text-sm">
          <div><span className="text-cyan-300">Languages:</span> JavaScript, TypeScript, Python</div>
          <div><span className="text-cyan-300">Frontend:</span> React, Next.js, HTML, CSS, Tailwind</div>
          <div><span className="text-cyan-300">Backend:</span> FastAPI, Node.js, Express, REST APIs</div>
          <div><span className="text-cyan-300">Database:</span> PostgreSQL, MongoDB, Supabase</div>
          <div><span className="text-cyan-300">DevOps:</span> Docker, CI/CD, Azure, AWS, Vercel</div>
        </div>
      </div>
    ),
    projects: () => (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold text-xs sm:text-sm">Featured Projects:</div>
        <div className="ml-2 space-y-2 text-gray-300 text-xs sm:text-sm">
          <div>
            <div className="text-cyan-300 font-semibold">1. Clearon</div>
            <div className="ml-2 text-gray-400">RAG Knowledge Management Platform</div>
          </div>
          <div>
            <div className="text-cyan-300 font-semibold">2. Drawzzl</div>
            <div className="ml-2 text-gray-400">Real-time multiplayer drawing game</div>
          </div>
          <div>
            <div className="text-cyan-300 font-semibold">3. DrawV</div>
            <div className="ml-2 text-gray-400">Tournament Management Platform</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">Tip: Type 'github' to see more</div>
      </div>
    ),
    education: () => (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold text-xs sm:text-sm">Education:</div>
        <div className="ml-2 space-y-2 text-gray-300 text-xs sm:text-sm">
          <div>
            <div className="text-cyan-300 font-semibold">MCA (2024-2026)</div>
            <div className="ml-2 text-gray-400">MIT World Peace University, Pune</div>
          </div>
          <div>
            <div className="text-cyan-300 font-semibold">BCA (2021-2024)</div>
            <div className="ml-2 text-gray-400">MIT WPU, Pune • CGPA: 8.93</div>
          </div>
        </div>
      </div>
    ),
    contact: () => (
      <div className="space-y-2">
        <div className="text-green-400 font-semibold text-xs sm:text-sm">Contact Information:</div>
        <div className="ml-2 space-y-1 text-gray-300 text-xs sm:text-sm">
          <div className="break-all"><span className="text-cyan-300">Email:</span> pranavv.nigade@gmail.com</div>
          <div className="break-all"><span className="text-cyan-300">GitHub:</span> github.com/pranavnigade123</div>
          <div className="break-all"><span className="text-cyan-300">LinkedIn:</span> linkedin.com/in/pranav-nigade</div>
          <div><span className="text-cyan-300">Location:</span> Pune, India</div>
        </div>
      </div>
    ),
    whoami: () => "pranav",
    ls: () => (
      <div className="font-mono text-gray-300 text-xs sm:text-sm flex flex-wrap gap-2">
        <span className="text-blue-400">about/</span>
        <span className="text-blue-400">projects/</span>
        <span className="text-blue-400">skills/</span>
        <span className="text-blue-400">contact/</span>
        <span className="text-green-400">README.md</span>
        <span className="text-green-400">resume.pdf</span>
      </div>
    ),
    pwd: () => "/home/pranav/portfolio",
    clear: () => {
      setHistory([]);
      return "";
    },
    neofetch: () => (
      <div className="space-y-1 font-mono text-xs sm:text-sm">
        <div className="text-green-400 font-bold">pranav@portfolio</div>
        <div className="text-gray-600">-----------------</div>
        <div><span className="text-cyan-300">Name:</span> Pranav Nigade</div>
        <div><span className="text-cyan-300">Role:</span> Full Stack Developer</div>
        <div><span className="text-cyan-300">Education:</span> MCA Student</div>
        <div><span className="text-cyan-300">Location:</span> Pune, India</div>
        <div><span className="text-cyan-300">Shell:</span> bash 5.1.16</div>
        <div><span className="text-cyan-300">Uptime:</span> Building 24/7</div>
        <div className="break-all"><span className="text-cyan-300">Stack:</span> React, Next.js, FastAPI, Docker</div>
      </div>
    ),
    github: () => {
      window.open("https://github.com/pranavnigade123", "_blank");
      return "Opening GitHub profile...";
    },
    linkedin: () => {
      window.open("https://www.linkedin.com/in/pranav-nigade", "_blank");
      return "Opening LinkedIn profile...";
    },
    resume: () => {
      window.open("/Pranav-Nigade-Resume.pdf", "_blank");
      return "Opening resume...";
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "") return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: string | React.ReactElement;

    if (commands[trimmedCmd]) {
      output = commands[trimmedCmd]();
    } else {
      output = (
        <div className="text-red-400 text-xs sm:text-sm">
          Command not found: {trimmedCmd}. Type 'help' for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { input: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current && history.length > 0) {
      // Only auto-scroll when a new command is added
      const lastCommand = history[history.length - 1];
      if (lastCommand) {
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, 50);
      }
    }
  }, [history.length]); // Only trigger on history length change, not content

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-black shadow-lg shadow-green-500/50 transition-all hover:scale-110 hover:shadow-green-500/70"
          aria-label="Open Terminal"
        >
          <Terminal className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: isMinimized ? 0 : 1, 
              y: isMinimized ? 100 : 0,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 flex flex-col ${
              isFullscreen 
                ? "inset-4 sm:inset-8" 
                : "bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-full sm:max-w-2xl"
            }`}
            style={{ 
              height: isMinimized ? "0px" : isFullscreen ? "calc(100vh - 4rem)" : "min(600px, calc(100vh - 8rem))",
              display: isMinimized ? "none" : "flex"
            }}
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-lg sm:rounded-xl border border-green-500/30 bg-slate-900/98 shadow-2xl shadow-green-500/20 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-green-500/30 bg-slate-900/90 px-3 py-2 sm:px-4 sm:py-3 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500"
                      aria-label="Close"
                    />
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500/80 transition-colors hover:bg-yellow-500"
                      aria-label="Minimize"
                    />
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500/80 transition-colors hover:bg-green-500"
                      aria-label="Fullscreen"
                    />
                  </div>
                  <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-xs text-green-400 truncate">
                    pranav@portfolio:~$
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-gray-400 transition-colors hover:text-green-400 p-1"
                    aria-label="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 transition-colors hover:text-red-400 p-1"
                    aria-label="Close Terminal"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>

              <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 font-mono text-xs sm:text-sm scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-slate-800/50 hover:scrollbar-thumb-green-500/70"
                onClick={() => inputRef.current?.focus()}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(34, 197, 94, 0.5) rgba(30, 41, 59, 0.5)',
                  minHeight: 0,
                  maxHeight: '100%'
                }}
              >
                <div className="mb-3 sm:mb-4 space-y-1 text-gray-300">
                  <div className="text-green-400 font-semibold">Welcome to Pranav's Interactive Terminal!</div>
                  <div className="text-gray-400 text-xs">Type 'help' to see available commands.</div>
                </div>

                {history.map((cmd, idx) => (
                  <div key={idx} className="mb-2 sm:mb-3">
                    <div className="flex items-start gap-1 sm:gap-2 text-green-400 break-all">
                      <span className="shrink-0">pranav@portfolio:~$</span>
                      <span className="text-white break-all">{cmd.input}</span>
                    </div>
                    <div className="mt-1 break-words">{cmd.output}</div>
                  </div>
                ))}

                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-green-400 shrink-0">pranav@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white outline-none min-w-0"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
