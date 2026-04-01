import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/Lib/gsap";

const stats = [
  { number: "2+", label: "Años de experiencia", jp: "年数", power: 85 },
  { number: "4+", label: "Proyectos entregados", jp: "プロジェクト", power: 88 },
  { number: "2025", label: "Ing. en Desarrollo de Software", jp: "卒業", power: 100 },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* label */
      gsap.from(".gsap-about-label", {
        opacity: 0, x: -20, duration: 0.5,
        scrollTrigger: { trigger: ".gsap-about-label", start: "top 85%", once: true },
      });
      /* title */
      gsap.from(".gsap-about-title", {
        opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-about-title", start: "top 85%", once: true },
      });
      /* paragraphs */
      gsap.from(".gsap-about-text", {
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".gsap-about-text", start: "top 85%", once: true },
      });
      /* neon divider */
      gsap.from(".gsap-about-divider", {
        scaleX: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".gsap-about-divider", start: "top 88%", once: true },
      });
      /* stats stagger */
      gsap.from(".gsap-about-stat", {
        opacity: 0, y: 25, stagger: 0.12, duration: 0.5, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".gsap-about-stats", start: "top 85%", once: true },
      });
      /* power bars */
      el.querySelectorAll<HTMLElement>(".gsap-about-bar").forEach((bar) => {
        const pct = bar.dataset.power || "0";
        gsap.fromTo(bar, { width: 0 }, {
          width: `${pct}%`, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 92%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-black overflow-hidden scanlines"
      ref={sectionRef}
    >
      {/* Kanji background */}
      <div
        className="absolute inset-0 pointer-events-none select-none kanji-bg"
        aria-hidden="true"
        style={{ fontSize: "18rem", opacity: 0.03, color: "#38bdf8", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      >
        自
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-sky-500/[0.05] blur-[120px] -translate-y-1/2" />

      {/* HUD corner decorators */}
      <div className="hud-corner absolute top-6 left-6 border-sky-400/40" />
      <div className="hud-corner absolute bottom-6 right-6 border-sky-400/40" style={{ transform: "rotate(180deg)" }} />

      <div className="relative max-w-4xl mx-auto">
        {/* System label */}
        <div className="gsap-about-label flex items-center gap-2 mb-6">
          <motion.span
            className="inline-block w-2 h-2 rounded-full bg-sky-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-sky-400 text-xs tracking-[0.35em] uppercase font-mono">▶ About // 自己紹介</span>
        </div>

        <h2
          className="gsap-about-title text-4xl md:text-6xl font-bold tracking-tight mb-10"
          style={{ color: "white" }}
        >
          Apasionado por construir
          <br />
          <span
            className="glitch-text bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent"
            data-text="lo que importa."
          >
            lo que importa.
          </span>
        </h2>

        <div
          className="gsap-about-text space-y-6 text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <p>
            Desarrollador de Software Junior con experiencia práctica en la construcción, prueba y mantenimiento
            de aplicaciones web usando principalmente <strong className="text-white/80">Python (Django)</strong>.
            Sólida base en desarrollo backend, bases de datos relacionales (PostgreSQL, MySQL) y APIs RESTful.
          </p>
          <p>
            Hábil en depuración, resolución de problemas y mejora del rendimiento de aplicaciones.
            Cómodo trabajando en entornos remotos colaborativos, siguiendo metodologías Ágiles
            y escribiendo código limpio, mantenible y bien documentado.
          </p>
        </div>

        {/* Neon divider */}
        <div
          className="gsap-about-divider mt-14 mb-14 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)", transformOrigin: "center" }}
        />

        {/* Stats */}
        <div className="gsap-about-stats grid grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="gsap-about-stat neon-card hud-corner relative p-5 rounded-xl border border-sky-400/20 bg-white/[0.03]"
            >
              {/* JP label */}
              <span className="absolute top-2 right-3 text-[9px] font-mono text-sky-400/50 tracking-widest">{stat.jp}</span>

              <p
                className="text-3xl md:text-4xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(56,189,248,0.5))",
                }}
              >
                {stat.number}
              </p>
              <p className="text-xs mt-1 mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>

              {/* Power bar */}
              <div className="h-0.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="gsap-about-bar h-full rounded-full"
                  data-power={stat.power}
                  style={{ background: "linear-gradient(90deg, #38bdf8, #67e8f9)", width: 0 }}
                />
              </div>
              <span className="text-[9px] font-mono text-sky-400/50 mt-1 block text-right">{stat.power}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
