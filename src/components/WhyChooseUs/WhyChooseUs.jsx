import { useState, useEffect, useRef, useCallback } from "react";
import {
    Building2, Users, Zap, Trophy,
} from "lucide-react";
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
        if (!active) { setCount(0); return; }
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
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
            <div className="wcu-icon"><Icon size={32} strokeWidth={1.5} /></div>
            <div className="wcu-number">{count}{item.suffix}</div>
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
            { threshold: 0.3 }
        );

        const sectionObserver = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                const els = e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up");
                if (e.isIntersecting) els.forEach(el => el.classList.add("visible"));
            }),
            { threshold: 0.08 }
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
                            Trusted since 1995 across residential, commercial, industrial, and agricultural projects.
                        </p>
                        <h3 style={{ marginTop: '1.5rem', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            Certified Engineering Team
                        </h3>
                        <p className="wcu-subtitle" style={{ marginTop: '0.5rem' }}>
                            Skilled technologists and dedicated technical professionals who design systems built to last.
                        </p>
                        <div className="wcu-cta-btn-wrap" style={{ marginTop: '2rem' }}>
                            <a href="/contact" className="wcu-cta-btn" id="wcu-get-quote-btn">
                                Get Quote
                            </a>
                        </div>
                    </div>

                    {/* Bento Layout with columns to match SolarRun's exact layout */}
                    <div className="wcu-bento-layout">
                        {/* Left Column */}
                        <div className="wcu-bento-column">
                            {/* 1 — Tall card: Expert Installation */}
                            <div className="wcu-bento-card wcu-card-big fade-in-left delay-1">
                                <div className="wcu-card-sky-overlay" />
                                <div className="wcu-card-top-text">
                                    <h3 className="wcu-card-title-dark">Installation by Experts</h3>
                                    <p className="wcu-card-desc-dark">
                                        Get your solar system installed in just 24-hours with a smooth and seamless
                                        installation process.
                                    </p>
                                </div>
                                <img
                                    src={wcuInstallation}
                                    alt="Dynamic Solar installation team"
                                    className="wcu-card-person-img"
                                />
                            </div>

                            {/* 4 — Wind proof & Corrosion Free Structure */}
                            <div className="wcu-bento-card wcu-card-weather fade-in-left delay-2">
                                <div className="wcu-weather-icon-wrap" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Wind lines */}
                                        <path d="M2 8H15C16.5 8 17.5 7 17.5 5.5C17.5 4 16.5 3 15 3C13.5 3 13 4 13 5" stroke="var(--primary-orange)" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M1 12H19C20.5 12 21.5 11 21.5 9.5C21.5 8 20.5 7 19 7C17.5 7 17 8 17 9" stroke="var(--primary-orange)" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M3 16H11C12.5 16 13.5 15 13.5 13.5C13.5 12 12.5 11 11 11" stroke="var(--primary-orange)" strokeWidth="2" strokeLinecap="round" />
                                        {/* Structure beam / brackets */}
                                        <path d="M6 19L18 19" stroke="var(--primary-orange)" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M9 19L9 22" stroke="var(--primary-orange)" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M15 19L15 22" stroke="var(--primary-orange)" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="wcu-weather-body">
                                    <h3 className="wcu-weather-title">Wind proof &amp; Corrosion Free Structure</h3>
                                    <p className="wcu-weather-desc">
                                        Engineered to withstand 175 km/h winds and resist corrosion, ensuring long-term
                                        safety and performance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="wcu-bento-column">
                            {/* 2 — 0% EMI card */}
                            <div className="wcu-bento-card wcu-card-emi fade-in-right delay-1">
                                <div className="wcu-emi-content">
                                    <div className="wcu-emi-zero-graphic" aria-hidden="true">
                                        <svg viewBox="0 0 160 120" width="120" height="90" className="wcu-3d-zero">
                                            <defs>
                                                <linearGradient id="zeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#fca566" />
                                                    <stop offset="50%" stopColor="#f47b20" />
                                                    <stop offset="100%" stopColor="#c55c0e" />
                                                </linearGradient>
                                                <linearGradient id="depthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#e56f18" />
                                                    <stop offset="100%" stopColor="#a34703" />
                                                </linearGradient>
                                                <linearGradient id="pctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#fd974b" />
                                                    <stop offset="100%" stopColor="#d56410" />
                                                </linearGradient>
                                                <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                                                    <feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#f47b20" floodOpacity="0.2" />
                                                </filter>
                                            </defs>

                                            {/* The Zero "0" - 3D Back/Depth */}
                                            <path d="M 50 15 A 30 45 0 0 0 20 60 A 30 45 0 0 0 50 105 A 30 45 0 0 0 80 60 A 30 45 0 0 0 50 15 Z M 50 35 A 12 25 0 0 1 62 60 A 12 25 0 0 1 50 85 A 12 25 0 0 1 38 60 A 12 25 0 0 1 50 35 Z"
                                                fill="url(#depthGrad)" transform="translate(4, 4)" />

                                            {/* The Zero "0" - Front */}
                                            <path d="M 50 15 A 30 45 0 0 0 20 60 A 30 45 0 0 0 50 105 A 30 45 0 0 0 80 60 A 30 45 0 0 0 50 15 Z M 50 35 A 12 25 0 0 1 62 60 A 12 25 0 0 1 50 85 A 12 25 0 0 1 38 60 A 12 25 0 0 1 50 35 Z"
                                                fill="url(#zeroGrad)" filter="url(#dropShadow)" />

                                            {/* Percent symbol - 3D Back/Depth */}
                                            <g transform="translate(4, 4)">
                                                <circle cx="98" cy="45" r="9" stroke="url(#depthGrad)" strokeWidth="5.5" fill="none" />
                                                <line x1="112" y1="35" x2="88" y2="85" stroke="url(#depthGrad)" strokeWidth="7" strokeLinecap="round" />
                                                <circle cx="102" cy="75" r="9" stroke="url(#depthGrad)" strokeWidth="5.5" fill="none" />
                                            </g>

                                            {/* Percent symbol - Front */}
                                            <g>
                                                <circle cx="98" cy="45" r="9" stroke="url(#pctGrad)" strokeWidth="5.5" fill="none" filter="url(#dropShadow)" />
                                                <line x1="112" y1="35" x2="88" y2="85" stroke="url(#pctGrad)" strokeWidth="7" strokeLinecap="round" filter="url(#dropShadow)" />
                                                <circle cx="102" cy="75" r="9" stroke="url(#pctGrad)" strokeWidth="5.5" fill="none" filter="url(#dropShadow)" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="wcu-emi-text-block">
                                        <h3 className="wcu-emi-title">0% EMI Financing Plan</h3>
                                        <p className="wcu-emi-desc">
                                            Your solar journey made easy &amp; affordable with our EMI plans.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 3 — Tall Maintenance card */}
                            <div className="wcu-bento-card wcu-card-maintain fade-in-right delay-2">
                                <div className="wcu-maintain-text">
                                    <h3 className="wcu-maintain-title">5-Year Professional<br />Maintenance</h3>
                                    <p className="wcu-maintain-desc">
                                        Monthly deep cleaning, health checks &amp; repairs included.
                                    </p>
                                </div>
                                <img
                                    src={wcuMaintenance}
                                    alt="Solar maintenance technician"
                                    className="wcu-maintain-img"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default WhyChooseUs;
