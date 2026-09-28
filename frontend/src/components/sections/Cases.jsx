import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLines, FadeUp } from "../Reveal";
import { casesSection } from "../../content";

gsap.registerPlugin(ScrollTrigger);

function CaseCard({ c }) {
  return (
    <article
      data-testid={`case-card-${c.id}`}
      className="flex h-[440px] w-[82vw] shrink-0 snap-center flex-col rounded-lg border border-sage/15 bg-surface p-7 sm:w-[460px] md:h-[480px] md:w-[520px] md:p-9"
      data-cursor
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-serif text-5xl italic text-sage/35 md:text-6xl">
          {c.id}
        </span>
        <span className="mt-2 text-right text-[10px] uppercase leading-relaxed tracking-[0.2em] text-copper">
          [Caso de ejemplo — editar]
        </span>
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-tight text-bone md:text-[2rem]">
        {c.title}
      </h3>
      <div className="mt-auto">
        {[
          ["Objetivo", c.objetivo],
          ["Abordaje", c.abordaje],
          ["Resultado", c.resultado],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-6 border-t border-sage/10 py-3.5">
            <span className="w-24 shrink-0 pt-0.5 text-[10px] uppercase tracking-[0.25em] text-sage">
              {label}
            </span>
            <span className="text-sm italic leading-relaxed text-bone/50">
              {value}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Cases({ reduce }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const dist = () => Math.max(track.scrollWidth - window.innerWidth, 0);
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  const header = (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <FadeUp>
          <span className="eyebrow mb-6">{casesSection.overline}</span>
        </FadeUp>
        <MaskLines
          lines={casesSection.title}
          className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] tracking-tight text-bone"
        />
      </div>
      <FadeUp delay={0.15}>
        <p className="max-w-xs text-xs leading-relaxed text-bone/45">
          {casesSection.note}
        </p>
      </FadeUp>
    </div>
  );

  if (reduce) {
    return (
      <section
        id="casos"
        ref={sectionRef}
        data-testid="cases-section"
        className="relative bg-[rgba(21,29,26,0.6)] px-6 py-24 md:px-10"
      >
        <div className="mx-auto w-full max-w-[1500px]">
          {header}
          <div className="flex snap-x gap-5 overflow-x-auto pb-4">
            {casesSection.items.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="casos"
      ref={sectionRef}
      data-testid="cases-section"
      className="relative bg-[rgba(21,29,26,0.6)]"
    >
      <div className="flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-10">{header}</div>
        <div
          ref={trackRef}
          className="mt-2 flex gap-5 will-change-transform md:gap-8"
        >
          <div className="w-6 shrink-0 md:w-10" />
          {casesSection.items.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
          <div className="w-16 shrink-0" />
        </div>
        <div
          className="mx-6 mt-12 h-px bg-sage/15 md:mx-10"
          data-testid="cases-progress"
        >
          <div
            ref={barRef}
            className="h-px w-full origin-left scale-x-0 bg-sage"
          />
        </div>
      </div>
    </section>
  );
}
