import { useState, useEffect, useRef, useCallback } from "react";
import { Building2, Users, Zap, Trophy } from "lucide-react";
import wcuInstallation from "../../assets/images/wcu-installation.jpg";
import wcuMaintenance from "../../assets/images/wcu-maintenance.jpg";
import SolarSteps from "../SolarSteps/SolarSteps";
import SolarLoans from "../SolarLoans/SolarLoans";
import "./WhyChooseUs.css";

/* ── Counter Band Data ───────────────────────────────── */
const counters = [
  { end: 1500, suffix: "+", label: "Projects Completed", Icon: Building2 },
  { end: 1000, suffix: "+", label: "Happy Clients", Icon: Users },
  { end: 20, suffix: " MW+", label: "Solar Capacity Installed", Icon: Zap },
  { end: 30, suffix: "+", label: "Years of Experience", Icon: Trophy },
];

function useCounter(end, duration, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
}

function CounterItem({ item, active }) {
  const count = useCounter(item.end, 2000, active);
  const { Icon } = item;
  return (
    <div className="wcu-counter">
      <div className="wcu-icon">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="wcu-number">
        {count}
        {item.suffix}
      </div>
      <div className="wcu-label">{item.label}</div>
    </div>
  );
}

/* ── Why Choose Us ─────────────────────────────────── */
function WhyChooseUs() {
  const counterRef = useRef(null);
  const sectionRef = useRef(null);
  const [counterActive, setCounterActive] = useState(false);

  const startCounters = useCallback(() => setCounterActive(true), []);
  const resetCounters = useCallback(() => setCounterActive(false), []);

  useEffect(() => {
    const counterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startCounters();
        else resetCounters();
      },
      { threshold: 0.3 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const els = e.target.querySelectorAll(
            ".fade-in-up, .fade-in-left, .fade-in-right, .scale-up",
          );
          if (e.isIntersecting)
            els.forEach((el) => el.classList.add("visible"));
        }),
      { threshold: 0.08 },
    );

    if (counterRef.current) counterObserver.observe(counterRef.current);
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    return () => {
      counterObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [startCounters, resetCounters]);

  return (
    <>
      {/* ── Counter Band ── */}
      <div className="wcu-counter-band" ref={counterRef}>
        <div className="container wcu-counters">
          {counters.map((item, i) => (
            <CounterItem key={i} item={item} active={counterActive} />
          ))}
        </div>
      </div>

      {/* ── 6 Easy Steps ── */}
      <SolarSteps />

      {/* ── Solar Loans ── */}
      <SolarLoans />

      {/* ── Why Choose Us Section ── */}
      <section className="wcu-section" ref={sectionRef} id="why-choose-us">
        <div className="container">
          {/* Header */}
          <div className="wcu-header fade-in-up">
            <h2 className="wcu-title">
              25+ Years of <span>Proven Expertise</span>
            </h2>
            <p className="wcu-subtitle">
              Trusted since 1995 across residential, commercial, industrial, and
              agricultural projects.
            </p>
            <h3
              style={{
                marginTop: "1.5rem",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text-main)",
              }}
            >
              Certified Engineering Team
            </h3>
            <p className="wcu-subtitle" style={{ marginTop: "0.5rem" }}>
              Skilled technologists and dedicated technical professionals who
              design systems built to last.
            </p>
            <div className="wcu-cta-btn-wrap" style={{ marginTop: "2rem" }}>
              <a href="/contact" className="wcu-cta-btn" id="wcu-get-quote-btn">
                Get Quote
              </a>
            </div>
          </div>

          {/* Bento Layout with columns to match SolarRun's exact layout */}
          <div className="wcu-image-only">
            <img
              src={wcuInstallation}
              alt="Dynamic Solar professional installation team"
              className="wcu-full-image"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyChooseUs;
