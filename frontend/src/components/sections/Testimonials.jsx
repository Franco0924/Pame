import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MaskLines, FadeUp, EASE } from "../Reveal";
import { testimonials } from "../../content";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const total = testimonials.items.length;
  const item = testimonials.items[idx];

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % total),
      7000
    );
    return () => clearInterval(t);
  }, [idx, total]);

  return (
    <section
      id="testimonios"
      data-testid="testimonials-section"
      className="relative bg-bone px-6 py-24 text-ink md:px-10 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <FadeUp>
          <span className="eyebrow eyebrow--bone mb-8">
            {testimonials.overline}
          </span>
        </FadeUp>

        <div className="grid gap-12 md:grid-cols-[0.9fr_1.4fr] md:gap-20">
          <MaskLines
            lines={testimonials.title}
            accentClass="text-[#9c6b46]"
            className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-ink"
          />

          <div className="flex min-h-[300px] flex-col justify-between md:min-h-[340px]">
            <div className="font-serif text-6xl leading-none text-[#9c6b46]">
              “
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={idx}
                data-testid="testimonial-quote"
                initial={{ opacity: 0, filter: "blur(14px)", y: 24 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(14px)", y: -24 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="font-serif text-2xl italic leading-snug text-ink md:text-[2.6rem] md:leading-[1.25]">
                  {item.quote}
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-[11px] uppercase tracking-[0.15em]">
                    {item.author.slice(0, 2)}
                  </span>
                  <span>
                    <span
                      className="block text-sm font-semibold"
                      data-testid="testimonial-author"
                    >
                      {item.author}
                    </span>
                    <span className="block text-xs text-ink/55">
                      {item.context}
                    </span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  data-testid="testimonial-prev"
                  aria-label="Testimonio anterior"
                  onClick={() => setIdx((i) => (i - 1 + total) % total)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-300 hover:bg-ink hover:text-bone"
                >
                  <ArrowLeft size={17} strokeWidth={1.5} />
                </button>
                <button
                  data-testid="testimonial-next"
                  aria-label="Testimonio siguiente"
                  onClick={() => setIdx((i) => (i + 1) % total)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-300 hover:bg-ink hover:text-bone"
                >
                  <ArrowRight size={17} strokeWidth={1.5} />
                </button>
              </div>
              <span
                className="text-sm tabular-nums tracking-[0.2em] text-ink/60"
                data-testid="testimonial-indicator"
              >
                0{idx + 1} / 0{total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
