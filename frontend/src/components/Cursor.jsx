import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [fine, setFine] = useState(false);
  const [grow, setGrow] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 38, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 38, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest(
        "a, button, input, textarea, select, label, [data-cursor]"
      );
      setGrow(!!t);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!fine) return null;

  return (
    <>
      <motion.div
        data-testid="custom-cursor"
        className="custom-cursor flex items-center justify-center"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-sage"
          animate={{
            width: grow ? 58 : 30,
            height: grow ? 58 : 30,
            opacity: grow ? 0.9 : 0.55,
            backgroundColor: grow
              ? "rgba(143,175,154,0.12)"
              : "rgba(143,175,154,0)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
      <motion.div
        className="custom-cursor"
        style={{ x: dotX, y: dotY }}
      >
        <div
          className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage"
        />
      </motion.div>
    </>
  );
}
