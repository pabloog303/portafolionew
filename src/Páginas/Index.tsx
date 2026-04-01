import Navbar from "@/Componentes/Portafolio/Navbar";
import Hero from "@/Componentes/Portafolio/Hero";
import About from "@/Componentes/Portafolio/Acerca de";
import Projects from "@/Componentes/Portafolio/Proyectos";
import Skills from "@/Componentes/Portafolio/Habilidades";
import Experience from "@/Componentes/Portafolio/Experiencia";
import Contact from "@/Componentes/Portafolio/Contacto";
import Footer from "@/Componentes/Portafolio/Pie de pagina";
import SeccionIA from "@/Componentes/Portafolio/SeccionIA";
import CursorPersonalizado from "@/Componentes/Portafolio/CursorPersonalizado";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorPersonalizado />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <SeccionIA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
