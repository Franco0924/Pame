import { lazy, Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Cases from "./components/sections/Cases";
import Formation from "./components/sections/Formation";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);
const SpineScene = lazy(() => import("./components/SpineScene"));

export default function App() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [reduce]);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#testimonios",
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) =>
        document.body.classList.toggle("theme-bone", self.isActive),
    });
    return () => {
      st.kill();
      document.body.classList.remove("theme-bone");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("loading", !loaded);
  }, [loaded]);

  const handleComplete = () => {
    setLoaded(true);
    window.__lenis?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div className="bg-ink font-sans text-bone antialiased">
      <Cursor />
      <div className="noise-overlay" aria-hidden="true" />
      <Loader onComplete={handleComplete} skip={reduce} />
      {!reduce && (
        <Suspense fallback={null}>
          <SpineScene />
        </Suspense>
      )}
      <Navbar ready={loaded} />
      <main className="relative z-10">
        <Hero start={loaded} reduce={reduce} />
        <Marquee />
        <About />
        <Services />
        <Cases reduce={reduce} />
        <Formation reduce={reduce} />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
