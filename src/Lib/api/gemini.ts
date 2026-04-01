/**
 * Servicio Gemini — llama a la API de Google Gemini con contexto
 * del portafolio de Jose Pablo para responder preguntas sobre él.
 *
 * Uso:
 *   import { askGemini } from "@/Lib/api/gemini";
 *   const reply = await askGemini("¿Qué tecnologías usa?");
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Contexto inyectado en cada llamada para que Gemini responda
 * como si fuera el asistente personal del portafolio de Pablo.
 */
const PORTFOLIO_CONTEXT = `
Eres el asistente de inteligencia artificial del portafolio de Jose Pablo Angulo Gutierrez.
Responde únicamente sobre él, en español, de forma concisa, profesional y amigable (máx. 3-4 líneas).
Si te preguntan algo no relacionado, redirige amablemente a hablar sobre Pablo.

Información sobre Jose Pablo:
- Nombre: Jose Pablo Angulo Gutierrez
- Ubicación: Tijuana, B.C., México
- Email: pabloag330@hotmail.com
- Tel: +52 6731103620
- GitHub: github.com/pabloog303
- Portfolio: agjp.netlify.app

PERFIL:
Junior Software Developer con experiencia construyendo, probando y manteniendo
aplicaciones web usando principalmente Python (Django). Sólida base en backend,
bases de datos relacionales y APIs RESTful. Trabaja con metodologías Ágiles.

TECNOLOGÍAS:
- Lenguajes: Python, JavaScript, TypeScript, HTML, CSS
- Backend & APIs: Django, Node.js, RESTful APIs, Prisma
- Frontend: React JS, Next.js, Angular, Bootstrap, TailwindCSS
- Bases de datos: PostgreSQL, MySQL
- Herramientas: Git, GitFlow, Docker, Linux (Ubuntu)
- Metodologías: Agile / Scrum, Debugging, Problem-Solving

EXPERIENCIA & PROYECTOS:
1. Becario — Desarrollador Web en GANEMOS A.C. | Dic 2025 – Mar 2026 (4 meses)
   Tijuana, B.C., México · En remoto · Contrato de prácticas.
   Participó en la creación de una app eCommerce para venta de bolsas.
   React en frontend, Node.js en backend, Prisma para BD. Integración de APIs
   y pagos con Stripe. Fortaleció habilidades técnicas, de diseño y trabajo en equipo.
   Tecnologías: React Native, Prisma ORM, Node.js, Stripe, APIs.

2. Full-Stack Developer — Suculentas Studio (E-commerce) | Dic 2025 – Feb 2026
   Next.js 14, TypeScript, React, PostgreSQL, Prisma, Stripe, Docker.
   Plataforma de e-commerce escalable con checkout seguro.

3. Backend Developer — GymTrack (Gym Management) | 2025
   Python (Django), MySQL. CRUD para miembros, pagos y asistencia.

4. Full-Stack Developer — Comic Reader Web App | 2025
   React JS, Node.js, MySQL. Autenticación y REST API.

5. Full-Stack Developer — APA Document Generator | 2024
   Django, APIs externas, generación de PDFs con formato APA.

EDUCACIÓN:
- B.S. en Ingeniería en Desarrollo de Software — Cesun University, Tijuana. Graduado: Dic 2025

CERTIFICACIONES:
- Scrum Fundamentals Certified (SFC™) — ITJ, Tijuana (2024)
- React Fundamentals — Udemy (2024)
- Web Development Essentials (HTML, CSS, JavaScript) — Udemy (2024)

IDIOMAS: Español (nativo), Inglés A1 (básico)
`.trim();

export interface GeminiResponse {
  text: string;
  error?: string;
}

export async function askGemini(question: string): Promise<GeminiResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

  if (!apiKey) {
    return {
      text: "",
      error:
        "API key no configurada. Agrega VITE_GEMINI_API_KEY en tu archivo .env",
    };
  }

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `${PORTFOLIO_CONTEXT}\n\nPregunta del usuario: ${question}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 256,
    },
  };

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        text: "",
        error: `Error Gemini (${res.status}): ${errData?.error?.message ?? res.statusText}`,
      };
    }

    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return { text: text.trim() };
  } catch (err) {
    return {
      text: "",
      error: err instanceof Error ? err.message : "Error de red desconocido.",
    };
  }
}
