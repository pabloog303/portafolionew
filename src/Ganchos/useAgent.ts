/**
 * useAgent — hook que orquesta el ciclo completo de una pregunta a Gemini:
 *   idle → loading → success | error
 *
 * Devuelve el estado, la respuesta y la función ask() para disparar una consulta.
 */
import { useState, useCallback } from "react";
import { askGemini } from "@/Lib/api/gemini";

export type AgentStatus = "idle" | "loading" | "success" | "error";

export interface AgentState {
  status: AgentStatus;
  answer: string;
  error: string;
  ask: (question: string) => Promise<void>;
  reset: () => void;
}

export function useAgent(): AgentState {
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const ask = useCallback(async (question: string) => {
    if (!question.trim()) return;

    setStatus("loading");
    setAnswer("");
    setError("");

    const result = await askGemini(question.trim());

    if (result.error) {
      setError(result.error);
      setStatus("error");
    } else {
      setAnswer(result.text);
      setStatus("success");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setAnswer("");
    setError("");
  }, []);

  return { status, answer, error, ask, reset };
}
