import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { gsap } from "@/Lib/gsap";

/* ── decoradores anime ── */
const kanji = ["力", "速", "創", "夢", "技"];
const speedAngles = [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 120, 135];

const SpeedLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {speedAngles.map((angle, i) => (
      <motion.div
        key={i}
        className="speed-line"
        style={{
          top: `${8 + i * 7.5}%`,
          animationDelay: `${i * 0.15}s`,
          opacity: 0.35 - i * 0.015,
        }}
      />
    ))}
  </div>
);

const FloatingKanji = () => (
  <>
    {kanji.map((k, i) => (
      <div
        key={k}
        className="kanji-bg select-none"
        style={{
          top: `${10 + i * 18}%`,
          left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
          right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
          animationDelay: `${i * 1.1}s`,
          fontSize: `${9 + (i % 3) * 2}rem`,
        }}
      >
        {k}
      </div>
    ))}
  </>
);

const Particles = () => (
  <>
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${10 + i * 7}%`,
          bottom: `${15 + (i % 4) * 8}%`,
          animationDelay: `${i * 0.22}s`,
          animationDuration: `${2 + (i % 3) * 0.8}s`,
          width: i % 3 === 0 ? 5 : 3,
          height: i % 3 === 0 ? 5 : 3,
        }}
      />
    ))}
  </>
);

const ReactOrbit = () => (
  <motion.svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 200 200"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
  >
    <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="hsl(200, 100%, 60%)" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="hsl(200, 100%, 60%)" strokeWidth="1.5" opacity="0.7" transform="rotate(60 100 100)" />
    <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="hsl(200, 100%, 60%)" strokeWidth="1.5" opacity="0.7" transform="rotate(120 100 100)" />
    <circle cx="100" cy="100" r="4" fill="hsl(200, 100%, 60%)" opacity="0.9" />
  </motion.svg>
);

const OrbitingDot = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    className="absolute w-2.5 h-2.5 rounded-full shadow-[0_0_8px_hsl(200,100%,60%)]"
    style={{ top: "50%", left: "50%", marginTop: -5, marginLeft: -5, background: "hsl(200, 100%, 60%)" }}
    animate={{ x: [0, 70, 0, -70, 0], y: [-40, 10, 40, 10, -40] }}
    transition={{ repeat: Infinity, duration, delay, ease: "linear" }}
  />
);

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  /* refs para animaciones GSAP de entrada */
  const gsapContentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ── GSAP: entrada stagger de elementos hero ── */
  useEffect(() => {
    const container = gsapContentRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      // Badge de rol
      tl.from(".gsap-hero-badge", { opacity: 0, y: -20, duration: 0.5, ease: "power3.out" })
        // Título principal — palabras con stagger
        .from(".gsap-hero-title .gsap-word", { opacity: 0, y: 40, stagger: 0.08, duration: 0.65, ease: "power3.out" }, "-=0.2")
        // Subtítulo
        .from(".gsap-hero-sub", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.3")
        // Barra de poder
        .from(".gsap-hero-bar", { opacity: 0, scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power2.out" }, "-=0.2")
        // Botones
        .from(".gsap-hero-btn", { opacity: 0, y: 15, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2");
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="scanlines relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 -inset-y-[10%]" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

      {/* Anime decorations */}
      <SpeedLines />
      <FloatingKanji />
      <Particles />

      {/* HUD frame corners */}
      <div className="absolute top-24 left-6 md:left-12 lg:left-24 w-24 h-24 hud-corner" />
      <div
        className="absolute top-24 right-6 md:right-12 lg:right-24 w-24 h-24"
        style={{
          position: "absolute",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 12,
            height: 12,
            borderTop: "1.5px solid rgba(56,189,248,0.6)",
            borderRight: "1.5px solid rgba(56,189,248,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 12,
            height: 12,
            borderBottom: "1.5px solid rgba(56,189,248,0.6)",
            borderLeft: "1.5px solid rgba(56,189,248,0.6)",
          }}
        />
      </div>

      {/* Subtítulo HUD */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        <span className="text-[10px] tracking-[0.5em] text-sky-400/70 uppercase font-mono">SYSTEM ONLINE</span>
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      </motion.div>

      <motion.div
        ref={gsapContentRef}
        className="gsap-hero-content relative z-10 max-w-4xl mx-auto text-center px-6"
        style={{ y: contentY, opacity }}
      >
        {/* Profile photo with React orbits */}
        <motion.div
          className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <ReactOrbit />
          <OrbitingDot delay={0} duration={4} />
          <OrbitingDot delay={1.3} duration={4} />
          <OrbitingDot delay={2.6} duration={4} />
          <div className="absolute inset-[14%] rounded-full overflow-hidden border-2 border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.35),0_0_80px_rgba(56,189,248,0.15)]">
            <img src={profilePhoto} alt="Profile" width={512} height={512} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-3xl scale-150 -z-10" />
        </motion.div>

        {/* Badge — animado con GSAP */}
        <p className="gsap-hero-badge text-sky-300/90 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-mono">
          ▶ Desarrollador Full Stack · Frontend
        </p>

        {/* Título — palabras con clase gsap-word para stagger */}
        <h1
          className="gsap-hero-title glitch-text text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8"
          data-text="Jose Pablo"
          style={{ color: "white" }}
        >
          {"Jose Pablo".split(" ").map((w) => (
            <span key={w} className="gsap-word inline-block mr-4">{w}</span>
          ))}
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(56,189,248,0.7)]">
            {"Angulo G.".split(" ").map((w) => (
              <span key={w} className="gsap-word inline-block mr-3">{w}</span>
            ))}
          </span>
        </h1>

        <p className="gsap-hero-sub text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Desarrollador de software con experiencia en Python, Django y React.
          Apasionado por construir aplicaciones web limpias, escalables y con impacto real.
        </p>

        {/* Power level bar */}
        <div className="gsap-hero-bar mt-8 mx-auto max-w-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono text-sky-400/70 tracking-widest uppercase">Nivel de poder</span>
            <span className="text-[10px] font-mono text-sky-400/90 tracking-widest">9000+</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="power-bar h-full rounded-full"
              style={{ "--power-pct": "97%" } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="gsap-hero-btn impact-flash inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.05] bg-gradient-to-r from-sky-500 to-blue-600 shadow-[0_0_20px_rgba(56,189,248,0.4),0_0_40px_rgba(56,189,248,0.15)]"
            style={{ color: "white" }}
          >
            Ver mis proyectos
          </a>
          <a
            href="#contact"
            className="gsap-hero-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-sky-400/30 text-sm font-medium transition-all duration-300 hover:bg-sky-400/10 hover:border-sky-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-sm"
            style={{ color: "white" }}
          >
            Contactar
          </a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <a href="#about">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;