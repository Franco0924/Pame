import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../Magnetic";
import { SplitChars, EASE } from "../Reveal";
import { site, hero } from "../../content";

export default function Hero({ start, reduce }) {
  const instant = !!reduce;

  const goServicios = (e) => {
    e.preventDefault();
    const el = document.querySelector("#servicios");
    if (!el) return;
    if (window.__lenis)
      window.__lenis.scrollTo(el, { duration: 1.5, offset: -76 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      data-testid="hero-section"
      className="relative flex min-h-screen flex-col justify-center px-6 pb-20 pt-28 md:px-10"
    >
      <div className="relative z-10 w-full max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-8 md:mb-12"
        >
          {hero.overline}
        </motion.div>

        <h1 className="font-serif leading-[0.92] tracking-[-0.02em] text-bone">
          <span className="block text-[clamp(3.4rem,11.5vw,10.5rem)]">
            <SplitChars
              text={hero.line1}
              start={start}
              instant={instant}
              delay={0.35}
            />
          </span>
          <span className="block text-[clamp(3.4rem,11.5vw,10.5rem)]">
            <SplitChars
              text={hero.line2}
              start={start}
              instant={instant}
              delay={0.55}
            />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="flex items-center gap-4 text-[13px] uppercase tracking-[0.42em] text-sage"
          >
            <span className="h-px w-10 bg-sage/60" />
            {hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="text-[11px] uppercase tracking-[0.3em] text-bone/40"
          >
            {hero.subtitleNote}
          </motion.p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] uppercase tracking-[0.3em] text-bone/80 md:mt-8">
          {site.words.map((w, i) => (
            <span key={w} className="flex items-center gap-4">
              <motion.span
                initial={{ y: 24, opacity: 0 }}
                animate={start ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 1.1 + i * 0.14 }}
                className="inline-block overflow-hidden"
              >
                {w}
              </motion.span>
              {i < site.words.length - 1 && (
                <span className="text-copper">·</span>
              )}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
          className="mt-10 flex flex-wrap items-center gap-4 md:mt-14"
        >
          <Magnetic>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta-agendar"
              className="btn btn-primary"
            >
              <span>{hero.ctaPrimary}</span>
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#servicios"
              onClick={goServicios}
              data-testid="hero-cta-servicios"
              className="btn btn-outline"
            >
              <span>{hero.ctaSecondary}</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.9 }}
        className="absolute bottom-8 left-6 flex items-center gap-4 md:left-10"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-bone/50">
          {hero.scrollLabel}
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-sage/20">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-sage"
            animate={{ y: [-18, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
