/**
 * CursorPersonalizado — cursor premium con dot + aura.
 * - El dot sigue el mouse sin delay (instantáneo).
 * - El aura sigue con ease suave (tipo magnético).
 * - Al pasar sobre links/buttons: el aura escala y cambia color.
 */
import { useEffect, useRef } from "react";
import { gsap } from "@/Lib/gsap";

const CursorPersonalizado = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    // Ocultar cursor nativo
    document.documentElement.style.cursor = "none";

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot: instantáneo
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
    };

    // Aura: suave con requestAnimationFrame
    let rafId: number;
    const animateAura = () => {
      auraX += (mouseX - auraX) * 0.1;
      auraY += (mouseY - auraY) * 0.1;
      gsap.set(aura, { x: auraX - 20, y: auraY - 20 });
      rafId = requestAnimationFrame(animateAura);
    };
    animateAura();

    // Hover sobre elementos interactivos
    const interactiveSelector =
      "a, button, [data-cursor-hover], input, textarea";

    const onEnter = () => {
      gsap.to(aura, {
        scale: 2.2,
        opacity: 0.6,
        borderColor: "rgba(56,189,248,0.9)",
        backgroundColor: "rgba(56,189,248,0.08)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(aura, {
        scale: 1,
        opacity: 0.4,
        borderColor: "rgba(56,189,248,0.5)",
        backgroundColor: "transparent",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    // Evento global con delegación
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) onEnter();
    };
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) onLeave();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Dot central */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: "#38bdf8",
          boxShadow: "0 0 6px rgba(56,189,248,0.9)",
          transform: "translate(-50%,-50%)",
        }}
      />
      {/* Aura */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full pointer-events-none border"
        style={{
          borderColor: "rgba(56,189,248,0.5)",
          opacity: 0.4,
          transform: "translate(-50%,-50%)",
        }}
      />
    </>
  );
};

export default CursorPersonalizado;
