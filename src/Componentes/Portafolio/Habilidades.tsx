import { useRef, useEffect } from "react";
import { Code2, Database, Globe, Layers, Server, Terminal } from "lucide-react";
import { gsap, ScrollTrigger } from "@/Lib/gsap";

const skills = [
  { icon: Code2,    label: "Frontend",          items: "React JS, Angular, Next.js, Bootstrap, TailwindCSS", power: 90, jp: "フロントエンド" },
  { icon: Server,   label: "Backend & APIs",    items: "Python, Django, Node.js, RESTful APIs, Prisma",      power: 93, jp: "バックエンド" },
  { icon: Database, label: "Bases de Datos",    items: "PostgreSQL, MySQL",                                   power: 88, jp: "データベース" },
  { icon: Terminal, label: "Lenguajes",         items: "Python, JavaScript, TypeScript, HTML, CSS",           power: 92, jp: "言語" },
  { icon: Layers,   label: "Herramientas",      items: "Git, GitFlow, Docker, Linux (Ubuntu)",               power: 85, jp: "ツール" },
  { icon: Globe,    label: "Metodologías",      items: "Agile / Scrum, Debugging, Problem-Solving",          power: 87, jp: "方法論" },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Asegurar que ScrollTrigger esté fresco
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      /* heading reveal */
      gsap.fromTo(".gsap-skills-label",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4,
          scrollTrigger: { trigger: ".gsap-skills-label", start: "top 90%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".gsap-skills-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".gsap-skills-title", start: "top 90%", toggleActions: "play none none none" },
        }
      );

      /* cards stagger */
      gsap.fromTo(".gsap-skill-card",
        { opacity: 0, y: 50, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.55, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".gsap-skills-grid", start: "top 85%", toggleActions: "play none none none" },
        }
      );

      /* power bars animate width on scroll */
      el.querySelectorAll<HTMLElement>(".gsap-power-fill").forEach((bar) => {
        const pct = bar.dataset.power || "0";
        gsap.fromTo(bar, { width: 0 }, {
          width: `${pct}%`, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 95%", toggleActions: "play none none none" },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-[#050505] overflow-hidden" ref={sectionRef}>
      {/* Kanji decorativo de fondo */}
      <div className="kanji-bg" style={{ bottom: "-2rem", right: "2rem", animationDelay: "0.5s", fontSize: "18rem", color: "rgba(56,189,248,0.03)" }}>
        技
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="gsap-skills-label text-sky-400 text-sm tracking-[0.3em] uppercase mb-4 font-mono">
          ▶ Habilidades
        </p>

        <h2
          className="gsap-skills-title text-4xl md:text-6xl font-bold tracking-tight mb-20"
          style={{ color: "white" }}
        >
          Tecnologías y herramientas
          <br />
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.5)]">
            con las que trabajo.
          </span>
        </h2>

        <div className="gsap-skills-grid grid grid-cols-2 md:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="gsap-skill-card neon-card hud-corner relative p-6 rounded-2xl border border-sky-400/15 bg-white/5 backdrop-blur-sm group transition-all duration-400 hover:border-sky-400/40 hover:bg-white/[0.08]"
            >
              {/* Etiqueta japonesa */}
              <span className="absolute top-2 right-3 text-[9px] font-mono text-sky-400/25 group-hover:text-sky-400/50 transition-colors tracking-wider">
                {skill.jp}
              </span>

              <skill.icon className="w-7 h-7 text-sky-400/70 group-hover:text-sky-400 transition-colors duration-300 mb-4 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
              <h3 className="font-semibold mb-1" style={{ color: "white" }}>{skill.label}</h3>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{skill.items}</p>

              {/* Barra de poder */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] font-mono text-sky-400/50 tracking-widest uppercase">Nivel</span>
                  <span className="text-[9px] font-mono text-sky-400/80">{skill.power}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="gsap-power-fill power-bar h-full rounded-full"
                    data-power={skill.power}
                    style={{ "--power-pct": `${skill.power}%`, width: 0 } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

