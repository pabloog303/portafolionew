/**
 * useGsapReveal — conecta un ref con ScrollTrigger para revelar elementos
 * al hacer scroll. Parámetros configurables para máxima reutilización.
 *
 * Ejemplo:
 *   const ref = useGsapReveal<HTMLDivElement>();
 *   <div ref={ref}>...</div>
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/Lib/gsap";

interface RevealOptions {
  /** Qué propiedad animar (y, x, scale, etc.) */
  from?: gsap.TweenVars;
  /** Margen del trigger (ej: "-100px") */
  start?: string;
  /** Delay base en segundos */
  delay?: number;
  /** Duración */
  duration?: number;
}

export function useGsapReveal<T extends HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 50 },
      start = "top 88%",
      delay = 0,
      duration = 0.8,
    } = options;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...from,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * useGsapStagger — anima hijos de un contenedor con stagger al hacer scroll.
 *
 * Ejemplo:
 *   const ref = useGsapStagger<HTMLDivElement>(".card");
 *   <div ref={ref}><div className="card" />...</div>
 */
export function useGsapStagger<T extends HTMLElement>(
  selector: string,
  options: RevealOptions & { stagger?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const {
      from = { opacity: 0, y: 40 },
      start = "top 85%",
      delay = 0,
      duration = 0.7,
      stagger = 0.1,
    } = options;

    const ctx = gsap.context(() => {
      gsap.from(container.querySelectorAll(selector), {
        ...from,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      });
    }, container);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
