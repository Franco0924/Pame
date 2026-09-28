import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLines, FadeUp } from "../Reveal";
import { formation } from "../../content";

gsap.registerPlugin(ScrollTrigger);

export default function Formation({ reduce }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (reduce) {
      sectionRef.current
        ?.querySelectorAll(".timeline-item")
        .forEach((el) => el.classList.add("is-active"));
      const p = sectionRef.current?.querySelector(".timeline-progress");
      if (p) p.style.transform = "scaleY(1)";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-body",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );
      gsap.utils.toArray(".timeline-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          onEnter: () => item.classList.add("is-active"),
          onLeaveBack: () => item.classList.remove("is-active"),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="formacion"
      ref={sectionRef}
      data-testid="formation-section"
      className="relative bg-[rgba(14,20,18,0.5)] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1500px] gap-14 md:grid-cols-[1fr_1.25fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <FadeUp>
            <span className="eyebrow mb-8">{formation.overline}</span>
          </FadeUp>
          <MaskLines
            lines={formation.title}
            className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-bone"
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-bone/50">
              {formation.note}
            </p>
          </FadeUp>
        </div>

        <div className="timeline-body relative pl-10 md:pl-14">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-sage/15 md:left-[9px]">
            <div className="timeline-progress h-full w-px origin-top scale-y-0 bg-sage" />
          </div>

          {formation.items.map((f, i) => (
            <div
              key={i}
              data-testid={`formation-item-${i + 1}`}
              className="timeline-item relative pb-14 last:pb-0"
            >
              <span className="timeline-node absolute -left-10 top-1 md:-left-14" />
              <FadeUp delay={0.05}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  {f.year}
                </span>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-bone md:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm text-sage">{f.place}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-bone/55">
                  {f.note}
                </p>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
