import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import ParallaxSection from "./Seccion de paralaje";
import sectionLight from "@/assets/section-light.jpg";
import { gsap, ScrollTrigger } from "@/Lib/gsap";

const experiences = [
  {
    role: "Becario — Desarrollador Web",
    company: "GANEMOS A.C.",
    period: "Dic 2025 – Mar 2026 · 4 meses",
    jp: "現在",
    level: "LVL 04",
    power: 95,
    description: "Participé en la creación de una aplicación eCommerce para la venta de bolsas. Trabajé con React en el frontend, Node.js en el backend y Prisma para la gestión de base de datos. Integré APIs y configuré métodos de pago con Stripe para transacciones seguras. Fortalecí habilidades técnicas, de diseño y trabajo en equipo en un entorno real de desarrollo.",
  },
  {
    role: "Full-Stack Developer",
    company: "Suculentas Studio",
    period: "Dic 2025 – Feb 2026",
    jp: "花",
    level: "LVL 03",
    power: 90,
    description: "Desarrollé una plataforma de e-commerce escalable con Next.js 14, TypeScript y React. Diseñé la arquitectura de base de datos con PostgreSQL y Prisma, implementé checkout seguro con Stripe y contenerizé servicios con Docker.",
  },
  {
    role: "Backend Developer",
    company: "GymTrack",
    period: "2025",
    jp: "成長",
    level: "LVL 02",
    power: 80,
    description: "Desarrollé y mantuve servicios backend con Python (Django). Implementé operaciones CRUD para miembros, pagos y control de asistencia. Trabajé con MySQL y optimicé consultas de base de datos.",
  },
  {
    role: "Full-Stack Developer",
    company: "Comic Reader / APA Docs",
    period: "2024 – 2025",
    jp: "基礎",
    level: "LVL 01",
    power: 65,
    description: "Construí una app web de lectura de cómics con React JS y Node.js, e integré autenticación y REST API. Desarrollé también una plataforma Django para generar documentos PDF con formato APA.",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Asegurar que ScrollTrigger esté fresco
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      /* label + title */
      gsap.fromTo(".gsap-exp-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5,
          scrollTrigger: { trigger: ".gsap-exp-label", start: "top 90%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".gsap-exp-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-exp-title", start: "top 90%", toggleActions: "play none none none" },
        }
      );

      /* cards stagger from left */
      gsap.fromTo(".gsap-exp-card",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-exp-list", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      /* accent bars */
      gsap.fromTo(".gsap-exp-accent",
        { scaleY: 0 },
        { scaleY: 1, stagger: 0.15, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".gsap-exp-list", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      /* power bars */
      el.querySelectorAll<HTMLElement>(".gsap-exp-power").forEach((bar) => {
        const pct = bar.dataset.power || "0";
        gsap.fromTo(bar, { width: 0 }, {
          width: `${pct}%`, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 95%", toggleActions: "play none none none" },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ParallaxSection bgImage={sectionLight} overlay="bg-black/80" id="experience" className="py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* HUD corners */}
      <div className="hud-corner absolute top-6 left-6 border-sky-400/30" />
      <div className="hud-corner absolute bottom-6 right-6 border-sky-400/30" style={{ transform: "rotate(180deg)" }} />

      <div className="max-w-3xl mx-auto" ref={sectionRef}>
        {/* System label */}
        <div className="gsap-exp-label flex items-center gap-2 mb-6">
          <motion.span
            className="inline-block w-2 h-2 rounded-full bg-sky-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-sky-400 text-xs tracking-[0.35em] uppercase font-mono">▶ Experiencia // 経験値</span>
        </div>

        <h2
          className="gsap-exp-title text-4xl md:text-6xl font-bold tracking-tight mb-20"
          style={{ color: "white" }}
        >
          Donde he
          <br />
          <span
            className="glitch-text bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent"
            data-text="contribuido."
          >
            contribuido.
          </span>
        </h2>

        <div className="gsap-exp-list space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.role + exp.company}
              className="gsap-exp-card neon-card hud-corner relative group rounded-xl border border-sky-400/15 bg-white/[0.03] p-6 overflow-hidden transition-all duration-300 hover:border-sky-400/35 hover:bg-white/[0.06]"
            >
              {/* Left neon accent bar */}
              <div
                className="gsap-exp-accent absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
                style={{ background: "linear-gradient(180deg, transparent, #38bdf8, transparent)", transformOrigin: "top" }}
              />

              {/* JP label + Level badge */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: "white" }}>{exp.role}</h3>
                  <p className="text-sky-400 font-medium text-sm mt-0.5">{exp.company}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-mono text-sky-400/60 tracking-widest">{exp.jp}</span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-sky-400/30"
                    style={{ color: "#38bdf8", background: "rgba(56,189,248,0.07)" }}
                  >
                    {exp.level}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{exp.period}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{exp.description}</p>

              {/* Power bar */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-sky-400/50 shrink-0">EXP</span>
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="gsap-exp-power h-full rounded-full"
                    data-power={exp.power}
                    style={{ background: "linear-gradient(90deg, #38bdf8, #67e8f9)", boxShadow: "0 0 8px rgba(56,189,248,0.6)", width: 0 }}
                  />
                </div>
                <span className="text-[9px] font-mono text-sky-400/50 shrink-0">{exp.power}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Experience;
