/**
 * Configuración centralizada de GSAP.
 * Registra los plugins una única vez para toda la app.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export { gsap, ScrollTrigger, TextPlugin };
