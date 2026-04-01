import { motion } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, Zap } from "lucide-react";
import { gsap, ScrollTrigger } from "@/Lib/gsap";

/* Floating particles around CTA */
const ContactParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.span
        key={i}
        className="absolute rounded-full"
        style={{
          width: i % 3 === 0 ? 4 : 2,
          height: i % 3 === 0 ? 4 : 2,
          background: i % 2 === 0 ? "#38bdf8" : "#67e8f9",
          left: `${10 + i * 9}%`,
          top: `${20 + (i % 5) * 14}%`,
          filter: "blur(1px)",
          boxShadow: "0 0 6px #38bdf8",
        }}
        animate={{
          y: [0, -18, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2.5 + i * 0.3,
          repeat: Infinity,
          delay: i * 0.25,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* label */
      gsap.from(".gsap-contact-label", {
        opacity: 0, y: -10, duration: 0.5,
        scrollTrigger: { trigger: ".gsap-contact-label", start: "top 85%", once: true },
      });
      /* title */
      gsap.from(".gsap-contact-title", {
        opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-contact-title", start: "top 85%", once: true },
      });
      /* subtitle */
      gsap.from(".gsap-contact-sub", {
        opacity: 0, duration: 0.5,
        scrollTrigger: { trigger: ".gsap-contact-sub", start: "top 88%", once: true },
      });
      /* divider */
      gsap.from(".gsap-contact-divider", {
        scaleX: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".gsap-contact-divider", start: "top 88%", once: true },
      });
      /* buttons */
      gsap.from(".gsap-contact-btn", {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".gsap-contact-btns", start: "top 88%", once: true },
      });
      /* signal */
      gsap.from(".gsap-contact-signal", {
        opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: ".gsap-contact-signal", start: "top 92%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* ── GSAP: pulse on hover for CTA buttons ── */
  const handleBtnEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.06, duration: 0.25, ease: "power2.out" });
  }, []);
  const handleBtnLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
  }, []);

  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-black overflow-hidden scanlines"
      ref={sectionRef}
    >
      {/* Kanji bg */}
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center kanji-bg"
        aria-hidden="true"
        style={{ fontSize: "20rem", opacity: 0.025, color: "#38bdf8" }}
      >
        繋
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/[0.05] blur-[130px]" />

      {/* HUD corners */}
      <div className="hud-corner absolute top-6 left-6 border-sky-400/40" />
      <div className="hud-corner absolute top-6 right-6 border-sky-400/40" style={{ transform: "rotate(90deg)" }} />
      <div className="hud-corner absolute bottom-6 left-6 border-sky-400/40" style={{ transform: "rotate(270deg)" }} />
      <div className="hud-corner absolute bottom-6 right-6 border-sky-400/40" style={{ transform: "rotate(180deg)" }} />

      <ContactParticles />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* System label */}
        <div className="gsap-contact-label flex items-center justify-center gap-2 mb-6">
          <motion.span
            className="inline-block w-2 h-2 rounded-full bg-sky-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-sky-400 text-xs tracking-[0.35em] uppercase font-mono">▶ Contacto // 通信</span>
        </div>

        <h2
          className="gsap-contact-title text-4xl md:text-6xl font-bold tracking-tight mb-6"
          style={{ color: "white" }}
        >
          Construyamos algo
          <br />
          <span
            className="glitch-text bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent"
            data-text="juntos."
          >
            juntos.
          </span>
        </h2>

        <p
          className="gsap-contact-sub text-lg mb-14 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Siempre abierto a nuevas oportunidades, colaboraciones y conversaciones interesantes.
        </p>

        {/* Neon divider */}
        <div
          className="gsap-contact-divider mx-auto mb-12 h-px max-w-xs"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)", transformOrigin: "center" }}
        />

        <div className="gsap-contact-btns flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <a
            href="mailto:pabloag330@hotmail.com"
            className="gsap-contact-btn impact-flash group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
              color: "white",
              boxShadow: "0 0 30px rgba(56,189,248,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            <Zap className="w-4 h-4" />
            Enviar mensaje // 送信
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA */}
          <a
            href="https://github.com/pabloog303"
            target="_blank"
            rel="noopener noreferrer"
            className="gsap-contact-btn inline-flex items-center gap-2 px-8 py-4 rounded-full border text-sm font-medium transition-all duration-300"
            style={{
              borderColor: "rgba(56,189,248,0.3)",
              color: "rgba(255,255,255,0.8)",
              background: "rgba(56,189,248,0.05)",
            }}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            GitHub // ギットハブ
          </a>
        </div>

        {/* Signal status */}
        <p className="gsap-contact-signal mt-10 text-xs font-mono text-sky-400/40 tracking-widest">
          [ SEÑAL_LISTA · CANAL_ABIERTO · ESPERANDO_TRANSMISIÓN ]
        </p>
      </div>
    </section>
  );
};

export default Contact;