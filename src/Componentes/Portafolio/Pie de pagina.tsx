import { motion } from "framer-motion";
import { Globe, Github, Linkedin } from "lucide-react";

const socials = [
  { icon: Globe,    href: "https://agjp.netlify.app",          label: "Portfolio",  jp: "サイト" },
  { icon: Github,   href: "https://github.com/pabloog303",     label: "GitHub",     jp: "ギット" },
  { icon: Linkedin, href: "www.linkedin.com/in/jose-pablo-angulo-gutierrez-83565a3a3",              label: "LinkedIn",   jp: "リンク" },
];

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-12 lg:px-24 py-10 border-t bg-black overflow-hidden" style={{ borderColor: "rgba(56,189,248,0.15)" }}>
      {/* Neon top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)" }}
      />

      {/* HUD corner */}
      <div className="hud-corner absolute bottom-4 left-4 border-sky-400/25" style={{ transform: "rotate(270deg)" }} />
      <div className="hud-corner absolute bottom-4 right-4 border-sky-400/25" style={{ transform: "rotate(180deg)" }} />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: copyright + signal */}
        <div className="flex items-center gap-3">
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Jose Pablo Angulo G. · Tijuana, B.C., México
          </p>
          <span className="text-[9px] font-mono text-sky-400/35 tracking-widest hidden md:inline">// 構築済み</span>
        </div>

        {/* Center: kanji decoration */}
        <p
          className="text-lg font-bold select-none tracking-widest hidden md:block"
          style={{ color: "rgba(56,189,248,0.12)", filter: "drop-shadow(0 0 6px rgba(56,189,248,0.2))" }}
          aria-hidden="true"
        >
          ポートフォリオ
        </p>

        {/* Right: socials */}
        <div className="flex items-center gap-5">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="group relative flex flex-col items-center gap-0.5 transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.4)" }}
              whileHover={{ color: "#38bdf8" } as never}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <motion.span
                whileHover={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))" } as never}
              >
                <social.icon className="w-5 h-5" />
              </motion.span>
              <span
                className="text-[8px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-4"
                style={{ color: "#38bdf8" }}
              >
                {social.jp}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;