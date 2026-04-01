/**
 * SeccionIA — sección "Pregúntale sobre mí" con Gemini + animaciones GSAP.
 *
 * Estados visuales:
 *  idle     → prompt estático con sugerencias animadas
 *  loading  → dots de carga pulsantes (GSAP stagger loop)
 *  success  → texto aparece letra a letra (TextPlugin de GSAP)
 *  error    → shake sutil + mensaje en rojo/cyan
 */
import { useRef, useEffect, useState, type FormEvent } from "react";
import { Sparkles, Send, RotateCcw } from "lucide-react";
import { gsap, TextPlugin } from "@/Lib/gsap";
import { useAgent } from "@/Ganchos/useAgent";
import { useGsapReveal } from "@/Ganchos/useGsapReveal";

// Preguntas sugeridas que rota automáticamente
const SUGERENCIAS = [
  "¿Qué tecnologías usa Pablo?",
  "¿Cuál es su experiencia laboral?",
  "¿En qué proyectos ha trabajado?",
  "¿Cuáles son sus certificaciones?",
  "¿Dónde estudió?",
  "¿Habla inglés?",
];

const SeccionIA = () => {
  /* ── refs GSAP ── */
  const sectionRef = useGsapReveal<HTMLElement>({ from: { opacity: 0, y: 60 } });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const answerBoxRef = useRef<HTMLDivElement>(null);
  const answerTextRef = useRef<HTMLParagraphElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* ── estado local ── */
  const [pregunta, setPregunta] = useState("");
  const [sugerenciaIdx, setSugerenciaIdx] = useState(0);
  const { status, answer, error, ask, reset } = useAgent();

  /* ── Rotación de sugerencias ── */
  useEffect(() => {
    const iv = setInterval(
      () => setSugerenciaIdx((i) => (i + 1) % SUGERENCIAS.length),
      3000
    );
    return () => clearInterval(iv);
  }, []);

  /* ── Animación título (entrada) ── */
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("span"), {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.3,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Animación de carga (dots) ── */
  useEffect(() => {
    const container = dotsRef.current;
    if (!container || status !== "loading") return;

    const ctx = gsap.context(() => {
      gsap.to(container.querySelectorAll(".ia-dot"), {
        y: -10,
        stagger: 0.15,
        duration: 0.4,
        ease: "power2.out",
        yoyo: true,
        repeat: -1,
      });
    }, container);

    return () => ctx.revert();
  }, [status]);

  /* ── Animación de éxito: typing effect ── */
  useEffect(() => {
    if (status !== "success" || !answer) return;

    const box = answerBoxRef.current;
    const textEl = answerTextRef.current;
    if (!box || !textEl) return;

    // Entrada del contenedor
    gsap.fromTo(
      box,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    // Typing con TextPlugin
    gsap.to(textEl, {
      duration: Math.min(answer.length * 0.022, 4),
      text: { value: answer, delimiter: "" },
      ease: "none",
    });
  }, [status, answer]);

  /* ── Animación de error: shake ── */
  useEffect(() => {
    if (status !== "error") return;
    const form = formRef.current;
    if (!form) return;
    gsap.fromTo(
      form,
      { x: -8 },
      { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }
    );
  }, [status]);

  /* ── Submit ── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pregunta.trim() || status === "loading") return;
    await ask(pregunta);
  };

  const handleSugerencia = (s: string) => {
    setPregunta(s);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    reset();
    setPregunta("");
    inputRef.current?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="ia"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-24 bg-black overflow-hidden"
    >
      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-sky-500/[0.04] blur-[140px] pointer-events-none" />

      {/* HUD corners */}
      <div className="hud-corner absolute top-6 left-6 border-sky-400/30" />
      <div
        className="hud-corner absolute bottom-6 right-6 border-sky-400/30"
        style={{ transform: "rotate(180deg)" }}
      />

      <div className="relative max-w-2xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-sky-400 text-xs tracking-[0.35em] uppercase font-mono">
            ▶ Asistente IA // AI_AGENT · Gemini
          </span>
        </div>

        {/* Título con palabras separadas para stagger */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-3"
          style={{ color: "white" }}
        >
          {"Pregúntale".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          <br />
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.5)]">
            {"sobre mí".split("").map((c, i) => (
              <span key={i} className="inline-block">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </h2>

        <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
          Soy un agente entrenado con el CV de Pablo. Hazme cualquier pregunta.
        </p>

        {/* Sugerencias rápidas */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SUGERENCIAS.slice(0, 4).map((s, i) => (
            <button
              key={i}
              onClick={() => handleSugerencia(s)}
              className="text-xs px-3 py-1.5 rounded-full border font-mono transition-all duration-200 hover:border-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10"
              style={{
                borderColor: "rgba(56,189,248,0.25)",
                color: "rgba(255,255,255,0.5)",
                background:
                  i === sugerenciaIdx % 4
                    ? "rgba(56,189,248,0.07)"
                    : "transparent",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Formulario */}
        <form ref={formRef} onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            disabled={status === "loading"}
            className="w-full rounded-xl px-5 py-4 pr-14 text-sm font-mono outline-none border transition-all duration-300 bg-white/[0.04] disabled:opacity-50"
            style={{
              borderColor:
                status === "error"
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(56,189,248,0.25)",
              color: "white",
              caretColor: "#38bdf8",
              boxShadow:
                status === "error"
                  ? "0 0 20px rgba(239,68,68,0.1)"
                  : "0 0 20px rgba(56,189,248,0.06)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading" || !pregunta.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 disabled:opacity-30 hover:bg-sky-400/20"
            style={{ color: "#38bdf8" }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Estado: loading */}
        {status === "loading" && (
          <div
            ref={dotsRef}
            className="flex items-center gap-2 mt-8"
            aria-label="Cargando respuesta"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="ia-dot block w-2 h-2 rounded-full bg-sky-400"
                style={{ boxShadow: "0 0 6px rgba(56,189,248,0.8)" }}
              />
            ))}
            <span
              className="text-xs font-mono ml-1"
              style={{ color: "rgba(56,189,248,0.6)" }}
            >
              Procesando consulta...
            </span>
          </div>
        )}

        {/* Estado: success */}
        {status === "success" && (
          <div
            ref={answerBoxRef}
            className="mt-8 p-5 rounded-xl border border-sky-400/25 bg-white/[0.04] relative"
          >
            {/* Neon top line */}
            <div
              className="absolute top-0 left-6 right-6 h-px rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)",
              }}
            />
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span
                className="text-[10px] font-mono tracking-widest text-sky-400/60"
              >
                GEMINI · RESPUESTA
              </span>
            </div>
            <p
              ref={answerTextRef}
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            />
            <button
              onClick={handleReset}
              className="mt-4 flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 hover:text-sky-400"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <RotateCcw className="w-3 h-3" />
              Nueva pregunta
            </button>
          </div>
        )}

        {/* Estado: error */}
        {status === "error" && (
          <div className="mt-6 flex items-start gap-2">
            <span
              className="text-xs font-mono leading-relaxed"
              style={{ color: "rgba(239,68,68,0.8)" }}
            >
              ⚠ {error}
            </span>
            <button
              onClick={handleReset}
              className="shrink-0 text-xs font-mono underline hover:text-sky-400 transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeccionIA;
