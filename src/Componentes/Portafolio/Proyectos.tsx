import { motion } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, Zap } from "lucide-react";
import projectCloud from "@/assets/project-cloud.jpg";
import projectAnalytics from "@/assets/project-analytics.jpg";
import projectDevtools from "@/assets/project-devtools.jpg";
import projectAiSearch from "@/assets/project-ai-search.jpg";
import ParallaxSection from "./Seccion de paralaje";
import sectionMesh from "@/assets/section-mesh.jpg";
import { gsap, ScrollTrigger } from "@/Lib/gsap";

const projects = [
  {
    title: "Suculentas Studio — E-commerce",
    description: "Plataforma de comercio electrónico escalable con integración de pagos Stripe, arquitectura de base de datos con PostgreSQL y Prisma, y servicios contenerizados con Docker.",
    tags: ["Next.js 14", "TypeScript", "React", "PostgreSQL", "Prisma", "Stripe", "Docker"],
    metric: "Dic 2025 – Feb 2026",
    impact: "Full Stack",
    impactLabel: "Developer",
    jp: "花",
    image: projectCloud,
    url: "",
  },
  {
    title: "ClimaJP — Sistema de clima con api externa",
    description: "Una app de clima es una aplicación que obtiene datos meteorológicos en tiempo real desde una API para mostrar información como temperatura, humedad, viento y pronóstico por horas o días, con una interfaz intuitiva que permite consultar el clima de cualquier ciudad.",
    tags: ["React", "JavaScript", "APIs", "Tailwind CSS"],
    metric: "2025",
    impact: "Backend",
    impactLabel: "Developer",
    jp: "力",
    image: projectAnalytics,
    url: "https://climajp.netlify.app",
  },
  {
    title: "Comic Reader — App Web",
    description: "Aplicación web de lectura de cómics con autenticación de usuarios, integración de REST API y gestión completa de base de datos MySQL.",
    tags: ["React JS", "Node.js", "MySQL", "REST API"],
    metric: "2025",
    impact: "Full Stack",
    impactLabel: "Developer",
    jp: "漫",
    image: projectDevtools,
    url: "https://ppaneelflow.netlify.app",
  },
  {
    title: "Entrenador de medio maratón",
    description: "App frontend en React para entrenamiento de medio maratón que ofrece planes personalizados, seguimiento de progreso y métricas como ritmo, distancia y tiempo, funcionando como un entrenador virtual.",
    tags: ["React", "JavaScript", "APIs", "Tailwind CSS"],
    metric: "2024",
    impact: "Frontend",
    impactLabel: "Developer",
    jp: "文",
    image: projectAiSearch,
    url: "https://tiny-smakager-caf0d5.netlify.app",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── GSAP: ScrollTrigger stagger for heading + cards ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* heading */
      gsap.from(".gsap-proj-label", {
        opacity: 0, y: -10, duration: 0.4,
        scrollTrigger: { trigger: ".gsap-proj-label", start: "top 85%", once: true },
      });
      gsap.from(".gsap-proj-title", {
        opacity: 0, y: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-proj-title", start: "top 85%", once: true },
      });

      /* cards stagger */
      gsap.from(".gsap-proj-card", {
        opacity: 0, y: 60, scale: 0.96, stagger: 0.12, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".gsap-proj-grid", start: "top 80%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // GSAP: 3D tilt on hover (soporta <div> y <a>)
  type CardElement = HTMLDivElement | HTMLAnchorElement;
  const handleMouseMove = useCallback((e: React.MouseEvent<CardElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8, rotateX: -y * 8, scale: 1.02,
      duration: 0.3, ease: "power2.out",
    });
    gsap.to(card.querySelector(".gsap-proj-shine"), {
      opacity: 0.12, x: x * 60, y: y * 60, duration: 0.3,
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<CardElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.5, ease: "elastic.out(1, 0.5)",
    });
    gsap.to(e.currentTarget.querySelector(".gsap-proj-shine"), {
      opacity: 0, duration: 0.4,
    });
  }, []);

  return (
    <ParallaxSection bgImage={sectionMesh} overlay="bg-black/70" id="projects" className="py-32 md:py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        <p className="gsap-proj-label text-sky-400 text-sm tracking-[0.3em] uppercase mb-4 font-mono">
          ▶ Proyectos Destacados
        </p>

        <h2
          className="gsap-proj-title text-4xl md:text-6xl font-bold tracking-tight mb-20"
          style={{ color: "white" }}
        >
          Proyectos que dejaron
          <br />
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.5)]">
            huella.
          </span>
        </h2>

        <div className="gsap-proj-grid grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "900px" }}>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gsap-proj-card neon-card hud-corner impact-flash group cursor-pointer rounded-2xl overflow-hidden border border-sky-400/15 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-sky-400/40 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-sky-400"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform', textDecoration: 'none' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              aria-label={`Ver proyecto: ${project.title}`}
            >
              {/* Shine overlay for tilt */}
              <div
                className="gsap-proj-shine absolute inset-0 pointer-events-none rounded-2xl z-10"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.25), transparent 70%)", opacity: 0 }}
              />

              {/* Imagen con scanline */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Scanlines sobre imagen */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                  }}
                />
                {/* Indicador de impacto estilo anime */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-sky-400" style={{ filter: "drop-shadow(0 0 4px rgba(56,189,248,0.9))" }} />
                  <span
                    className="text-xs font-bold font-mono px-2.5 py-0.5 rounded border border-sky-400/50 bg-black/60 backdrop-blur-sm"
                    style={{ color: "rgba(56,189,248,0.95)", textShadow: "0 0 8px rgba(56,189,248,0.7)" }}
                  >
                    {project.metric}
                  </span>
                </div>
                {/* Kanji del proyecto */}
                <span
                  className="absolute bottom-3 right-4 text-3xl font-black opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                  style={{ color: "rgba(56,189,248,0.8)", fontFamily: "serif" }}
                >
                  {project.jp}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold" style={{ color: "white" }}>{project.title}</h3>
                  <ArrowUpRight
                    className="w-5 h-5 flex-shrink-0 ml-2 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-400"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  />
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {project.description}
                </p>

                {/* Stats rápidos */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-sky-400 font-mono drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">
                      {project.impact}
                    </p>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider">{project.impactLabel}</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-sky-400/30 to-transparent" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-sky-400/10 border border-sky-400/20 font-mono transition-colors duration-200 group-hover:border-sky-400/40"
                      style={{ color: "rgba(56,189,248,0.7)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Projects;

