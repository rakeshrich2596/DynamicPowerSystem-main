import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { useScrollReveal, useRevealOnce } from "../../hooks/useScrollReveal";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./SolarCalculator.css";

/* ── Tariffs ── */
const TARIFFS = {
    residential: { "Tamil Nadu": 6.5, "Pondicherry": 5.5 },
    commercial:  { "Tamil Nadu": 11.0, "Pondicherry": 8.0 },
};

/* ── Residential calculation ── */
function calcResidential(bill, location) {
    const avgTariff = TARIFFS.residential[location];
    const consumption = Math.round(bill / avgTariff);
    const rawSize = consumption / 135;
    const displaySystemSize = Math.max(1.1, Math.min(20.0, Math.round(rawSize / 1.1) * 1.1));
    const systemType = displaySystemSize >= 11 ? "Commercial system" : "On-Grid system";
    const roofArea = Math.round(displaySystemSize * 100);
    const steps = Math.round(displaySystemSize / 1.1);
    const systemCost = 100000 + (steps - 1) * 55000;
    const subsidyKw = Math.floor(displaySystemSize);
    const subsidy = subsidyKw <= 2 ? subsidyKw * 30000 : 78000;
    const netInvestment = systemCost - subsidy;
    const solarGen = displaySystemSize * 135;
    const offsetUnits = Math.min(consumption, solarGen);
    const annualSavings = Math.round(offsetUnits * avgTariff * 12);
    const paybackPeriod = Math.round((netInvestment / annualSavings) * 10) / 10;
    const savings25Years = annualSavings * 25;
    return { consumption, avgTariff, displaySystemSize, systemType, roofArea, systemCost, subsidy, netInvestment, annualSavings, paybackPeriod, savings25Years };
}

/* ── Commercial calculation ── */
function calcCommercial(bill, location) {
    const avgTariff = TARIFFS.commercial[location];
    const consumption = Math.round(bill / avgTariff);
    const rawSize = consumption / 130.5;
    const displaySystemSize = Math.max(10, Math.min(500, Math.round(rawSize / 5) * 5));
    const roofArea = Math.round(displaySystemSize * 100);
    const systemCost = displaySystemSize * 40000;
    const gstBenefit = Math.round(systemCost * 0.08172625);
    const netCustomerPrice = systemCost - gstBenefit;
    const dep1 = 0.40 * netCustomerPrice, wdv1 = netCustomerPrice - dep1;
    const dep2 = 0.40 * wdv1, wdv2 = wdv1 - dep2;
    const dep3 = 0.40 * wdv2;
    const depreciationBenefit = Math.round((dep1 + dep2 + dep3) * 0.3338);
    const netInvestment = netCustomerPrice - depreciationBenefit;
    const annualSavings = Math.round((displaySystemSize * 130.5 * avgTariff - displaySystemSize * 240.41) * 12);
    const paybackPeriod = Math.round((netInvestment / annualSavings) * 100) / 100;
    const savings25Years = annualSavings * 25;
    return { consumption, avgTariff, displaySystemSize, systemType: "Commercial system", roofArea, systemCost: Math.round(systemCost), gstBenefit, depreciationBenefit, netInvestment: Math.round(netInvestment), annualSavings, paybackPeriod, savings25Years };
}

const fmt = (n) => Number(n).toLocaleString("en-IN");

/* ── Animated counter hook ── */
function useAnimatedValue(target) {
    const [display, setDisplay] = useState(target);
    const prev = useRef(target);
    useEffect(() => {
        const from = prev.current, to = target;
        if (from === to) return;
        prev.current = to;
        const duration = 600, start = performance.now();
        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            setDisplay(Math.round(from + (to - from) * ease));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target]);
    return display;
}

/* ── SVG Icons ── */
const IconHome = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
    </svg>
);
const IconBuilding = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="1"/>
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
    </svg>
);
const IconPin = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);
const IconCalendar = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
);
const IconTrend = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
    </svg>
);
const IconSun = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
);
const IconShield = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

/* ══════════════════════════════════════════════════ */
function SolarCalculator() {
    const [heroRef, heroInView] = useInView();
    const [calcType, setCalcType] = useState("residential");
    const [location, setLocation] = useState("Tamil Nadu");
    const [bill, setBill] = useState(3000);
    const [inputText, setInputText] = useState("3000");
    const [kpiVisible, setKpiVisible] = useState(false);
    const kpiRef = useRef(null);

    /* Scroll-reveal refs */
    const sectionRevealRef = useScrollReveal();
    const ctaRevealRef = useRevealOnce();

    /* KPI IntersectionObserver */
    useEffect(() => {
        const el = kpiRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setKpiVisible(true); obs.disconnect(); } },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const sliderMin = calcType === "residential" ? 500 : 10000;
    const sliderMax = calcType === "residential" ? 25000 : 500000;
    const sliderStep = calcType === "residential" ? 50 : 500;

    const handleTextChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        setInputText(raw);
        const parsed = parseInt(raw, 10);
        if (!isNaN(parsed) && parsed >= sliderMin && parsed <= sliderMax) setBill(parsed);
    };

    const handleTextBlur = () => {
        const parsed = parseInt(inputText, 10);
        if (isNaN(parsed) || parsed < sliderMin) { setBill(sliderMin); setInputText(String(sliderMin)); }
        else if (parsed > sliderMax) { setBill(sliderMax); setInputText(String(sliderMax)); }
        else { setBill(parsed); setInputText(String(parsed)); }
    };

    const handleSliderChange = (e) => {
        const val = Number(e.target.value);
        setBill(val);
        setInputText(String(val));
    };

    const handleTypeSwitch = (type) => {
        setCalcType(type);
        const def = type === "residential" ? 3000 : 100000;
        setBill(def);
        setInputText(String(def));
    };

    const result = useMemo(() => {
        if (bill < sliderMin) return null;
        return calcType === "residential" ? calcResidential(bill, location) : calcCommercial(bill, location);
    }, [bill, location, calcType, sliderMin]);

    const sliderPercent = Math.min(100, Math.max(0, ((bill - sliderMin) / (sliderMax - sliderMin)) * 100));

    /* Animated counters */
    const animAnnualSavings  = useAnimatedValue(result ? result.annualSavings  : 0);
    const animNetInvestment  = useAnimatedValue(result ? result.netInvestment  : 0);
    const animSavings25      = useAnimatedValue(result ? result.savings25Years : 0);

    return (
        <>
            <Navbar />

            {/* ── Hero ── */}
            <div ref={heroRef} className={`page-hero calc-hero ${heroInView ? "animate-typing" : ""}`}>
                <div className="page-hero-overlay" />
                <div className="calc-hero-dots" />
                {/* Animated solar rays behind hero */}
                <div className="calc-hero-rays" aria-hidden="true">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="calc-hero-ray" style={{ "--i": i }} />
                    ))}
                </div>
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Free Estimation Tool</span>
                    <h1 className="page-hero-title">Solar Savings Calculator</h1>
                    <p className="page-hero-sub">
                        Estimate your ideal solar system size, investment, and annual savings in seconds.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>Solar Calculator</span>
                    </nav>
                </div>
            </div>

            {/* ── Calculator Section ── */}
            <section className="calc-section">
                <div className="calc-bg-blob calc-bg-blob-orange" />
                <div className="calc-bg-blob calc-bg-blob-blue" />
                <div className="calc-dot-pattern calc-dot-pattern-1" />
                <div className="calc-dot-pattern calc-dot-pattern-2" />

                <div className="container calc-container" ref={sectionRevealRef}>

                    {/* ── Type Toggle ── */}
                    <div
                        data-reveal
                        data-reveal-delay="0"
                        className="calc-type-toggle-wrap"
                    >
                        <div className="calc-type-toggle" role="group" aria-label="Calculator type">
                            <button
                                className={`calc-type-btn ${calcType === "residential" ? "active" : ""}`}
                                onClick={() => handleTypeSwitch("residential")}
                            >
                                <span className="calc-type-btn-icon"><IconHome /></span>
                                Residential
                            </button>
                            <button
                                className={`calc-type-btn ${calcType === "commercial" ? "active" : ""}`}
                                onClick={() => handleTypeSwitch("commercial")}
                            >
                                <span className="calc-type-btn-icon"><IconBuilding /></span>
                                Commercial
                            </button>
                        </div>
                    </div>

                    {/* ── Heading ── */}
                    <div data-reveal data-reveal-delay="80" className="calc-heading-wrap">
                        <h2 className="calc-heading">
                            {calcType === "residential" ? "Residential" : "Commercial"} Solar Estimator
                        </h2>
                        <p className="calc-subheading">
                            Enter your average monthly electricity bill to get a personalised recommendation.
                        </p>
                    </div>

                    {/* ── Two Column Grid ── */}
                    <div className="calc-grid">

                        {/* LEFT – Inputs */}
                        <div data-reveal data-reveal-delay="160" className="calc-input-card">

                            <div className="calc-field-group">
                                <label className="calc-field-label">
                                    <span className="calc-field-label-icon"><IconPin /></span>
                                    Location
                                </label>
                                <div className="calc-loc-tabs">
                                    {["Tamil Nadu", "Pondicherry"].map((loc) => (
                                        <button
                                            key={loc}
                                            className={`calc-loc-btn ${location === loc ? "active" : ""}`}
                                            onClick={() => setLocation(loc)}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="calc-field-group">
                                <label className="calc-field-label">
                                    <span className="calc-field-label-icon"><IconCalendar /></span>
                                    Billing Cycle
                                </label>
                                <div className="calc-cycle-pill">Monthly Average</div>
                            </div>

                            <div className="calc-field-group">
                                <label className="calc-field-label">Average Electricity Bill</label>
                                <div className="calc-bill-input-row">
                                    <span className="calc-bill-prefix">₹</span>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        className="calc-bill-text-input"
                                        value={inputText}
                                        onChange={handleTextChange}
                                        onBlur={handleTextBlur}
                                        placeholder={String(sliderMin)}
                                        aria-label="Monthly electricity bill amount"
                                    />
                                    <span className="calc-bill-suffix">/month</span>
                                </div>

                                <div className="calc-slider-wrap">
                                    <input
                                        type="range"
                                        className="calc-slider"
                                        min={sliderMin}
                                        max={sliderMax}
                                        step={sliderStep}
                                        value={bill}
                                        onChange={handleSliderChange}
                                        style={{ "--pct": `${sliderPercent}%` }}
                                        aria-label="Bill slider"
                                    />
                                    <div className="calc-slider-ends">
                                        <span>₹{fmt(sliderMin)}</span>
                                        <span>₹{fmt(sliderMax)}+</span>
                                    </div>
                                </div>
                            </div>

                            {result && (
                                <div className="calc-input-metrics">
                                    <div className="calc-input-metric">
                                        <div className="calc-input-metric-val">{fmt(result.consumption)}</div>
                                        <div className="calc-input-metric-lbl">Units / Month</div>
                                    </div>
                                    <div className="calc-input-metric">
                                        <div className="calc-input-metric-val">₹ {result.avgTariff}</div>
                                        <div className="calc-input-metric-lbl">Avg. Tariff / Unit</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT – Results */}
                        <div data-reveal data-reveal-delay="260" className="calc-result-card">
                            {result ? (
                                <>
                                    <div className="calc-system-header">
                                        <div className="calc-system-block">
                                            <div className="calc-system-label">Recommended System Size</div>
                                            <div className="calc-system-size">
                                                {result.displaySystemSize.toFixed(1)}
                                                <span className="calc-system-unit"> kW</span>
                                            </div>
                                            <div className="calc-system-type">{result.systemType}</div>
                                        </div>
                                        <div className="calc-system-block">
                                            <div className="calc-system-label">Roof Area Required</div>
                                            <div className="calc-roof-area">{fmt(result.roofArea)}</div>
                                            <div className="calc-roof-unit">sq. ft.</div>
                                        </div>
                                    </div>

                                    <div className="calc-invest-box">
                                        <h4 className="calc-invest-title">Investment Breakdown</h4>
                                        <div className="calc-invest-row">
                                            <span>System Cost{calcType === "commercial" ? " (₹40,000 / kW)" : ""}</span>
                                            <span className="calc-invest-val">₹ {fmt(result.systemCost)}</span>
                                        </div>
                                        {calcType === "residential" ? (
                                            <div className="calc-invest-row green">
                                                <span>PM Surya Ghar Subsidy</span>
                                                <span className="calc-invest-val">− ₹ {fmt(result.subsidy)}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="calc-invest-row green">
                                                    <span>GST Input Benefit</span>
                                                    <span className="calc-invest-val">− ₹ {fmt(result.gstBenefit)}</span>
                                                </div>
                                                <div className="calc-invest-row green">
                                                    <span>Depreciation Tax Benefit (3 yrs)</span>
                                                    <span className="calc-invest-val">− ₹ {fmt(result.depreciationBenefit)}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="calc-invest-row total">
                                            <span>Net Investment</span>
                                            <span className="calc-invest-val">₹ {fmt(animNetInvestment)}</span>
                                        </div>
                                    </div>

                                    {/* Quick note inside the card */}
                                    <p className="calc-result-note">
                                        <span className="calc-result-note-icon"><IconShield /></span>
                                        Full savings breakdown is shown below.
                                    </p>
                                </>
                            ) : (
                                <div className="calc-placeholder">
                                    <div className="calc-placeholder-graphic">
                                        <IconSun />
                                    </div>
                                    <h3>Enter your bill to get started</h3>
                                    <p>Type your monthly electricity bill or drag the slider to see your personalised solar savings estimate.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── KPI Grid (full-width, scroll-triggered) ── */}
                    {result && (
                        <div ref={kpiRef} className="calc-kpi-section">
                            <div className={`calc-kpi-card kpi-green ${kpiVisible ? "kpi-visible" : ""} hover-glow`} style={{ transitionDelay: "0ms" }}>
                                <div className="calc-kpi-icon-wrap kpi-icon-green"><IconTrend /></div>
                                <div className="calc-kpi-inner">
                                    <div className="calc-kpi-label">Annual Savings</div>
                                    <div className="calc-kpi-value">₹ {fmt(animAnnualSavings)}</div>
                                    <div className="calc-kpi-sub">Estimated electricity bill offset per year</div>
                                </div>
                                <div className="calc-kpi-bar">
                                    <div className="calc-kpi-bar-fill kpi-bar-green" style={{ width: kpiVisible ? "100%" : "0%" }} />
                                </div>
                            </div>

                            <div className={`calc-kpi-card kpi-blue ${kpiVisible ? "kpi-visible" : ""} hover-glow`} style={{ transitionDelay: "130ms" }}>
                                <div className="calc-kpi-icon-wrap kpi-icon-blue"><IconCalendar /></div>
                                <div className="calc-kpi-inner">
                                    <div className="calc-kpi-label">Payback Period</div>
                                    <div className="calc-kpi-value">{result.paybackPeriod} Years</div>
                                    <div className="calc-kpi-sub">Time to recover your net investment</div>
                                </div>
                                <div className="calc-kpi-bar">
                                    <div className="calc-kpi-bar-fill kpi-bar-blue" style={{ width: kpiVisible ? `${Math.min(100, (result.paybackPeriod / 10) * 100)}%` : "0%" }} />
                                </div>
                            </div>

                            <div className={`calc-kpi-card kpi-orange ${kpiVisible ? "kpi-visible" : ""} hover-glow`} style={{ transitionDelay: "260ms" }}>
                                <div className="calc-kpi-icon-wrap kpi-icon-orange"><IconSun /></div>
                                <div className="calc-kpi-inner">
                                    <div className="calc-kpi-label">25-Year Savings</div>
                                    <div className="calc-kpi-value">₹ {(animSavings25 / 100000).toFixed(1)} Lakhs</div>
                                    <div className="calc-kpi-sub">Total lifetime return on solar investment</div>
                                </div>
                                <div className="calc-kpi-bar">
                                    <div className="calc-kpi-bar-fill kpi-bar-orange" style={{ width: kpiVisible ? "100%" : "0%" }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── CTA ── */}
                    <div ref={ctaRevealRef} data-reveal className="calc-cta-wrap">
                        <Link to="/contact" className="btn-primary calc-cta-btn">
                            Get a Free Detailed Quote
                        </Link>
                        <p className="calc-disclaimer">
                            Estimates are based on average solar irradiance data for {location}. Actual savings vary based on roof orientation, shading, and consumption patterns. Contact us for a precise site assessment.
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default SolarCalculator;
