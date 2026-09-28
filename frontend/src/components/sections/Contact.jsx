import { ArrowUp, ArrowUpRight, Send } from "lucide-react";
import Magnetic from "../Magnetic";
import { MaskLines, FadeUp } from "../Reveal";
import { site, contact } from "../../content";

export default function Contact() {
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nombre = f.get("nombre") || "";
    const motivo = f.get("motivo") || "";
    const mensaje = f.get("mensaje") || "";
    const text = `Hola Pamela, soy ${nombre}. Motivo de consulta: ${motivo}. ${mensaje}`;
    window.open(
      `${site.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contacto"
      data-testid="contact-section"
      className="relative bg-ink px-6 pt-24 md:px-10 md:pt-36"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <FadeUp>
          <span className="eyebrow mb-8">{contact.overline}</span>
        </FadeUp>
        <MaskLines
          lines={contact.title}
          className="font-serif text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.98] tracking-tight text-bone"
        />
        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-bone/55">
            {contact.subtitle}
          </p>
        </FadeUp>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
                {contact.whatsappLabel}
              </span>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="contact-whatsapp-link"
                className="mt-3 block font-serif text-5xl text-bone transition-colors duration-300 hover:text-sage md:text-7xl"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={site.phoneHref}
                data-testid="contact-phone-link"
                className="mt-2 block text-sm tracking-[0.15em] text-bone/50 transition-colors hover:text-bone"
              >
                +506 {site.phoneDisplay}
              </a>
            </FadeUp>

            <FadeUp delay={0.15}>
              <Magnetic strength={0.4}>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="contact-whatsapp-cta"
                  className="btn btn-primary px-10 py-6 text-sm"
                >
                  <span>{contact.labels.cta}</span>
                  <ArrowUpRight size={18} strokeWidth={1.75} />
                </a>
              </Magnetic>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="flex flex-col gap-7"
            >
              <div>
                <label
                  htmlFor="f-nombre"
                  className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-sage"
                >
                  {contact.labels.nombre}
                </label>
                <input
                  id="f-nombre"
                  name="nombre"
                  required
                  data-testid="contact-input-nombre"
                  className="input-line"
                  placeholder="¿Cómo te llamas?"
                />
              </div>
              <div>
                <label
                  htmlFor="f-motivo"
                  className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-sage"
                >
                  {contact.labels.motivo}
                </label>
                <input
                  id="f-motivo"
                  name="motivo"
                  required
                  data-testid="contact-input-motivo"
                  className="input-line"
                  placeholder="Ej. dolor lumbar, recuperación, movilidad…"
                />
              </div>
              <div>
                <label
                  htmlFor="f-mensaje"
                  className="mb-1 block text-[10px] uppercase tracking-[0.3em] text-sage"
                >
                  {contact.labels.mensaje}
                </label>
                <textarea
                  id="f-mensaje"
                  name="mensaje"
                  rows={4}
                  data-testid="contact-input-mensaje"
                  className="input-line resize-none"
                  placeholder="Cuéntame brevemente qué sientes o qué objetivo tienes…"
                />
              </div>
              <Magnetic className="self-start">
                <button
                  type="submit"
                  data-testid="contact-submit"
                  className="btn btn-outline"
                >
                  <span>{contact.labels.submit}</span>
                  <Send size={14} strokeWidth={1.75} />
                </button>
              </Magnetic>
              <p className="text-xs leading-relaxed text-bone/40">
                {contact.formNote}
              </p>
            </form>
          </FadeUp>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-sage/10 py-10 md:mt-32 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl text-bone">{site.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-bone/40">
              {contact.footerRole} · {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                onClick={(e) => e.preventDefault()}
                title={`${s.label} — editar enlace`}
                data-testid={`footer-social-${s.label.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.25em] text-bone/50 transition-colors duration-300 hover:text-sage"
              >
                {s.label}
              </a>
            ))}
          </div>

          <button
            onClick={toTop}
            data-testid="back-to-top"
            aria-label={contact.backToTop}
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-bone/60 transition-colors hover:text-bone"
          >
            {contact.backToTop}
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/30 transition-colors duration-300 group-hover:bg-sage group-hover:text-ink">
              <ArrowUp size={15} strokeWidth={1.5} />
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}
