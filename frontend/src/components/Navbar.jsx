import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Magnetic from "./Magnetic";
import { EASE } from "./Reveal";
import { navLinks, site } from "../content";

export default function Navbar({ ready }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 140 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else if (window.__lenis) window.__lenis.start();
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis)
      window.__lenis.scrollTo(el, { duration: 1.5, offset: -76 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        animate={{ y: ready ? (open || !hidden ? "0%" : "-110%") : "-110%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[120]"
        data-testid="navbar"
      >
        <div
          className={`flex h-16 items-center justify-between px-6 transition-colors duration-500 md:h-20 md:px-10 ${
            scrolled && !open
              ? "border-b border-sage/10 bg-ink/70 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a
            href="#inicio"
            onClick={(e) => go(e, "#inicio")}
            data-testid="navbar-logo"
            className="relative z-[130] font-serif text-lg text-bone md:text-xl"
          >
            Pamela González
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                data-testid={`navbar-link-${l.id}`}
                className="nav-link text-[12px] uppercase tracking-[0.16em] text-bone/70 transition-colors duration-300 hover:text-bone"
              >
                {l.label}
              </a>
            ))}
            <Magnetic>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="navbar-cta"
                className="rounded-md border border-sage/50 px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:bg-sage hover:text-ink"
              >
                Agendar
              </a>
            </Magnetic>
          </nav>

          <button
            data-testid="navbar-menu-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
            className="relative z-[130] flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-6 bg-bone"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-6 bg-bone"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            data-testid="navbar-mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-ink/[0.98] px-8 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  data-testid={`navbar-mobile-link-${l.id}`}
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.07 }}
                  className="group flex items-baseline gap-4 border-b border-sage/10 py-4"
                >
                  <span className="font-serif text-sm italic text-sage">
                    0{i + 1}
                  </span>
                  <span className="font-serif text-5xl text-bone transition-colors duration-300 group-hover:text-sage">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </div>
            <motion.a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="navbar-mobile-cta"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="btn btn-primary mt-10 self-start"
            >
              <span>Agendar una cita</span>
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
