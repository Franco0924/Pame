import { motion } from "framer-motion";
import { ClipboardCheck, SlidersHorizontal, HeartHandshake } from "lucide-react";
import { MaskLines, FadeUp, ScrollWords, EASE } from "../Reveal";
import { about } from "../../content";

const ICONS = {
  ClipboardCheck,
  SlidersHorizontal,
  HeartHandshake,
};

export default function About() {
  return (
    <section
      id="sobre-mi"
      data-testid="about-section"
      className="relative bg-[rgba(21,29,26,0.6)] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1500px] gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div className="relative">
          <div className="absolute -left-3 -top-3 hidden h-full w-full rounded-md border border-sage/25 md:block" />
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative aspect-[3/4] overflow-hidden rounded-md"
            data-testid="about-photo-placeholder"
            data-cursor
          >
            <motion.div
              initial={{ scale: 1.14 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="flex h-full w-full items-center justify-center rounded-md border border-sage/15 bg-[#101714]"
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 38%, rgba(143,175,154,0.14), transparent 70%)",
                }}
              />
              <span className="font-serif text-8xl italic text-sage/70">
                {about.photoMark}
              </span>
              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] text-bone/40">
                {about.photoCaption}
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div>
          <FadeUp>
            <span className="eyebrow mb-8">{about.overline}</span>
          </FadeUp>
          <MaskLines
            lines={about.title}
            className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02] tracking-tight text-bone"
          />
          <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-bone/70 md:max-w-xl md:text-base">
            {about.paragraphs.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.12}>
                <p>{p}</p>
              </FadeUp>
            ))}
          </div>

          <ScrollWords
            text={about.quote}
            className="mt-14 max-w-2xl font-serif text-2xl italic leading-snug text-bone/90 md:text-[2.4rem] md:leading-[1.25]"
          />

          <div className="mt-16 grid gap-8 border-t border-sage/10 pt-10 sm:grid-cols-3">
            {about.pillars.map((p, i) => {
              const Icon = ICONS[p.icon];
              return (
                <FadeUp key={p.title} delay={0.1 + i * 0.12}>
                  <div className="flex flex-col gap-3">
                    <Icon size={26} strokeWidth={1.25} className="text-sage" />
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bone">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-bone/55">
                      {p.text}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
