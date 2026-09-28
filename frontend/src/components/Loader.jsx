import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete, skip }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const root = useRef(null);
  const content = useRef(null);
  const lineFill = useRef(null);
  const panelL = useRef(null);
  const panelR = useRef(null);
  const called = useRef(false);

  useEffect(() => {
    if (skip) {
      if (!called.current) {
        called.current = true;
        onComplete();
      }
      setGone(true);
      return;
    }
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setGone(true) });
    tl.to(counter, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.v)),
    });
    tl.to(
      lineFill.current,
      { scaleX: 1, duration: 1.9, ease: "power2.inOut" },
      0
    );
    tl.to(content.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power2.in",
      delay: 0.25,
    });
    tl.to(panelL.current, { xPercent: -100, duration: 1, ease: "power4.inOut" });
    tl.to(panelR.current, { xPercent: 100, duration: 1, ease: "power4.inOut" }, "<");
    tl.call(
      () => {
        if (!called.current) {
          called.current = true;
          onComplete();
        }
      },
      [],
      "<+=0.2"
    );
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (gone) return null;

  return (
    <div
      ref={root}
      data-testid="loader"
      className="fixed inset-0 z-[300] flex items-center justify-center"
    >
      <div ref={panelL} className="absolute inset-y-0 left-0 w-1/2 bg-ink" />
      <div
        ref={panelR}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#101714]"
      />
      <div
        ref={content}
        className="relative z-10 flex w-[min(440px,74vw)] flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.4em] text-bone/50">
            Pamela González
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-bone/50">
            Fisioterapeuta
          </span>
        </div>
        <div className="flex items-end justify-between">
          <span
            data-testid="loader-counter"
            className="font-serif text-[22vw] leading-[0.85] text-bone md:text-[9rem]"
          >
            {count}
          </span>
          <span className="mb-2 font-serif text-xl italic text-sage">
            {count}%
          </span>
        </div>
        <div className="h-px w-full bg-sage/20">
          <div
            ref={lineFill}
            className="h-px w-full origin-left scale-x-0 bg-sage"
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-bone/40">
          Movimiento · Recuperación · Bienestar
        </span>
      </div>
    </div>
  );
}
