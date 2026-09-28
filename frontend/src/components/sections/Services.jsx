import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskLines, FadeUp, EASE } from "../Reveal";
import { services } from "../../content";

function ServiceRow({ s, i }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeUp delay={i * 0.06} y={30}>
      <div
        data-testid={`service-row-${i + 1}`}
        data-cursor
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="border-t border-sage/15 py-6 transition-colors duration-500 hover:bg-sage/[0.04] md:py-8"
      >
        <div className="flex items-center gap-5 px-2 md:gap-10 md:px-4">
          <span className="w-10 shrink-0 font-serif text-sm italic text-sage md:text-base">
            (0{i + 1})
          </span>
          <h3 className="flex-1 font-serif text-2xl leading-tight text-bone transition-transform duration-500 ease-out md:text-5xl"
            style={{ transform: open ? "translateX(12px)" : "translateX(0)" }}
          >
            {s.title}
          </h3>
          <motion.span
            animate={{ rotate: open ? 45 : 0, color: open ? "#C9936B" : "#8FAF9A" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <ArrowUpRight size={26} strokeWidth={1.25} />
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-xl px-2 pt-5 text-[15px] leading-relaxed text-bone/60 md:px-4 md:pl-[5.5rem]">
                {s.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

export default function Services() {
  return (
    <section
      id="servicios"
      data-testid="services-section"
      className="relative bg-[rgba(14,20,18,0.45)] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <span className="eyebrow mb-8">{services.overline}</span>
            </FadeUp>
            <MaskLines
              lines={services.title}
              className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02] tracking-tight text-bone"
            />
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-bone/50">
              Seis áreas de trabajo pensadas para acompañarte en cada etapa de
              tu movimiento.
            </p>
          </FadeUp>
        </div>

        <div className="border-b border-sage/15">
          {services.items.map((s, i) => (
            <ServiceRow key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
