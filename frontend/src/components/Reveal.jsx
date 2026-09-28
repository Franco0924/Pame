import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const EASE = [0.16, 1, 0.3, 1];

// Separa segmentos *itálicos* marcados con asteriscos
export const parseEmphasis = (text = "") =>
  text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*")
        ? { text: part.slice(1, -1), italic: true }
        : { text: part, italic: false }
    );

// Revelado letra por letra con máscara
export function SplitChars({
  text,
  start = true,
  instant = false,
  delay = 0,
  stagger = 0.034,
  className = "",
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "112%" }}
            animate={start ? { y: "0%" } : { y: "112%" }}
            transition={{
              duration: instant ? 0.01 : 0.9,
              ease: EASE,
              delay: instant ? 0 : delay + i * stagger,
            }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Revelado línea por línea con máscara al entrar en viewport
export function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  accentClass = "text-sage",
  delay = 0,
  stagger = 0.14,
  instant = false,
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "112%" },
              visible: {
                y: "0%",
                transition: {
                  duration: instant ? 0.01 : 1,
                  ease: EASE,
                  delay: instant ? 0 : delay + i * stagger,
                },
              },
            }}
          >
            {parseEmphasis(line).map((p, j) =>
              p.italic ? (
                <em key={j} className={`font-serif italic ${accentClass}`}>
                  {p.text}
                </em>
              ) : (
                <span key={j}>{p.text}</span>
              )
            )}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

// Fade + subida suave al entrar en viewport
export function FadeUp({
  children,
  delay = 0,
  y = 36,
  className = "",
  instant = false,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: instant ? 0.01 : 0.9,
        ease: EASE,
        delay: instant ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Palabra por palabra ligada al scroll
export function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}
