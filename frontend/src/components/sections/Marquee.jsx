import { site } from "../../content";

export default function Marquee() {
  const seq = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden ? "true" : undefined}>
      {site.words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-4xl italic text-bone/80 md:px-10 md:text-6xl">
            {w}
          </span>
          <span className="inline-block h-2 w-2 rounded-full bg-copper" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      data-testid="marquee"
      className="relative overflow-hidden border-y border-sage/10 py-8 md:py-10"
    >
      <div className="marquee-track">
        {seq(false)}
        {seq(true)}
      </div>
    </section>
  );
}
