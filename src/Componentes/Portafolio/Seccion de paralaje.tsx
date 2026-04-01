import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  overlay?: string;
  className?: string;
  id?: string;
}

const ParallaxSection = ({
  children,
  bgImage,
  overlay = "bg-black/60",
  className = "",
  id,
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div
          className="absolute inset-0 -inset-y-[20%]"
          style={{ y, scale }}
        >
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default ParallaxSection;