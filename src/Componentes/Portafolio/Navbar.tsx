import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "@/Lib/gsap";

const links = [
  { label: "Sobre mí",    href: "#about",      jp: "について" },
  { label: "Proyectos",   href: "#projects",   jp: "作品" },
  { label: "Habilidades", href: "#skills",     jp: "技術" },
  { label: "IA",          href: "#ia",         jp: "知能" },
  { label: "Contacto",    href: "#contact",    jp: "連絡" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP: entrada del navbar con stagger en links ── */
  useEffect(() => {
    const nav = navRef.current;
    const linksEl = linksRef.current;
    if (!nav || !linksEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(nav, { y: -40, opacity: 0, duration: 0.5, ease: "power3.out" })
        .from(
          linksEl.querySelectorAll(".gsap-nav-link"),
          { opacity: 0, y: -12, stagger: 0.07, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.15"
        )
        .from(".gsap-nav-signal div", { scaleY: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" }, "-=0.2");
    });

    return () => ctx.revert();
  }, []);

  /* ── GSAP: magnetic hover effect en links ── */
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.08, duration: 0.25, ease: "power2.out" });
    gsap.to(e.currentTarget.querySelector(".gsap-nav-underline"), {
      width: "100%", duration: 0.25, ease: "power2.out",
    });
    gsap.to(e.currentTarget.querySelector(".gsap-nav-jp"), {
      opacity: 0.5, y: 0, duration: 0.2, ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out" });
    gsap.to(e.currentTarget.querySelector(".gsap-nav-underline"), {
      width: "0%", duration: 0.25, ease: "power2.out",
    });
    gsap.to(e.currentTarget.querySelector(".gsap-nav-jp"), {
      opacity: 0, y: 4, duration: 0.2, ease: "power2.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-sky-400/20 shadow-[0_1px_20px_rgba(56,189,248,0.08)]"
          : "bg-transparent"
      }`}
    >
      {/* Logo con estilo HUD */}
      <a href="#" className="flex items-center gap-2 group">
        <motion.div
          className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <span className="font-bold text-lg tracking-tight" style={{ color: "white" }}>
          JPAG<span className="text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]">.</span>
        </span>
        <span className="text-[9px] font-mono text-sky-400/40 tracking-widest group-hover:text-sky-400/70 transition-colors">
          v2.0
        </span>
      </a>

      {/* Nav links con GSAP hover */}
      <div ref={linksRef} className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="gsap-nav-link relative text-sm group"
            style={{ color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="gsap-nav-jp text-[8px] font-mono absolute -top-3.5 left-0 tracking-widest"
              style={{ color: "#38bdf8", opacity: 0, transform: "translateY(4px)" }}
            >
              {link.jp}
            </span>
            {link.label}
            <span
              className="gsap-nav-underline absolute -bottom-1 left-0 h-px bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_4px_rgba(56,189,248,0.7)]"
              style={{ width: 0 }}
            />
          </a>
        ))}
      </div>

      {/* Indicador de señal HUD */}
      <div className="gsap-nav-signal flex items-center gap-1.5">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className="bg-sky-400 rounded-sm"
            style={{ width: 2.5, height: 6 + bar * 2.5, transformOrigin: "bottom" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: bar * 0.15 }}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;