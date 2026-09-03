import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./EnquiryCalculator.css";
import enquiryBg from "../../assets/images/enquiry-bg.png";

/* ── Tariffs ── */
const TARIFFS = {
    residential: { "Tamil Nadu": 6.5, "Pondicherry": 5.5 },
    commercial: { "Tamil Nadu": 11.0, "Pondicherry": 8.0 },
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

/* ── SVG Icons ── */
const IconPhone = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
);

const IconSolar = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const IconHome = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
    </svg>
);

const IconBuilding = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
);


function EnquiryCalculator() {
    const sectionRef = useRef(null);
    const [calcType, setCalcType] = useState("residential");
    const [location, setLocation] = useState("Tamil Nadu");
    const [bill, setBill] = useState(3000);
    const [inputText, setInputText] = useState("3000");

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

    /* Intersection observer for entrance animation */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="enquiry-calc" ref={sectionRef} id="enquiry-calc">
            {/* Background Image */}
            <div className="enquiry-calc__bg">
                <img src={enquiryBg} alt="" className="enquiry-calc__bg-img" loading="lazy" />
                <div className="enquiry-calc__bg-overlay" />
            </div>

            <div className="container enquiry-calc__grid">
                {/* ── Left Side: Enquiry Info ── */}
                <div className="enquiry-calc__left fade-in-left">
                    <h2 className="enquiry-calc__heading">
                        Interested in{" "}
                        <span className="enquiry-calc__heading-accent">going solar?</span>
                    </h2>
                    <p className="enquiry-calc__sub">
                        Use the calculator or call us on:
                    </p>
                    <a href="https://wa.me/919841582874" target="_blank" rel="noopener noreferrer" className="enquiry-calc__phone" id="enquiry-phone-link">
                        <span className="enquiry-calc__phone-icon"><IconPhone /></span>
                        9841582874
                    </a>
                </div>

                {/* ── Right Side: Mini Calculator ── */}
                <div className="enquiry-calc__right fade-in-right">
                    <div className="enquiry-calc__card">
                        {/* Card Header */}
                        <div className="enquiry-calc__card-header">
                            <div className="enquiry-calc__card-header-icon">
                                <IconSolar />
                            </div>
                            <div>
                                <h3 className="enquiry-calc__card-title">
                                    Calculate Your Savings
                                </h3>
                                <p className="enquiry-calc__card-subtitle">
                                    Up to <span className="enquiry-calc__subsidy-amt">₹78,000*</span> subsidy available
                                </p>
                            </div>
                        </div>

                        {/* Type Toggle */}
                        <div className="enquiry-calc__type-toggle">
                            <button
                                className={`enquiry-calc__type-btn ${calcType === "residential" ? "enquiry-calc__type-btn--active" : ""}`}
                                onClick={() => handleTypeSwitch("residential")}
                                id="enquiry-calc-residential-btn"
                            >
                                <IconHome /> Residential
                            </button>
                            <button
                                className={`enquiry-calc__type-btn ${calcType === "commercial" ? "enquiry-calc__type-btn--active" : ""}`}
                                onClick={() => handleTypeSwitch("commercial")}
                                id="enquiry-calc-commercial-btn"
                            >
                                <IconBuilding /> Commercial
                            </button>
                        </div>

                        {/* Location */}
                        <div className="enquiry-calc__field">
                            <label className="enquiry-calc__label">Location</label>
                            <div className="enquiry-calc__loc-row">
                                {["Tamil Nadu", "Pondicherry"].map((loc) => (
                                    <button
                                        key={loc}
                                        className={`enquiry-calc__loc-btn ${location === loc ? "enquiry-calc__loc-btn--active" : ""}`}
                                        onClick={() => setLocation(loc)}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bill Input */}
                        <div className="enquiry-calc__field">
                            <label className="enquiry-calc__label">Monthly Electricity Bill</label>
                            <div className="enquiry-calc__bill-row">
                                <span className="enquiry-calc__bill-prefix">₹</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    className="enquiry-calc__bill-input"
                                    value={inputText}
                                    onChange={handleTextChange}
                                    onBlur={handleTextBlur}
                                    placeholder={String(sliderMin)}
                                    aria-label="Monthly electricity bill"
                                    id="enquiry-calc-bill-input"
                                />
                                <span className="enquiry-calc__bill-suffix">/month</span>
                            </div>
                            <div className="enquiry-calc__slider-wrap">
                                <input
                                    type="range"
                                    className="enquiry-calc__slider"
                                    min={sliderMin}
                                    max={sliderMax}
                                    step={sliderStep}
                                    value={bill}
                                    onChange={handleSliderChange}
                                    style={{ "--pct": `${sliderPercent}%` }}
                                    aria-label="Bill slider"
                                    id="enquiry-calc-slider"
                                />
                                <div className="enquiry-calc__slider-ends">
                                    <span>₹{fmt(sliderMin)}</span>
                                    <span>₹{fmt(sliderMax)}+</span>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        {result && (
                            <div className="enquiry-calc__results">
                                <div className="enquiry-calc__result-row">
                                    <div className="enquiry-calc__result-item">
                                        <span className="enquiry-calc__result-label">System Size</span>
                                        <span className="enquiry-calc__result-value">{result.displaySystemSize.toFixed(1)} kW</span>
                                    </div>
                                    <div className="enquiry-calc__result-item">
                                        <span className="enquiry-calc__result-label">Annual Savings</span>
                                        <span className="enquiry-calc__result-value enquiry-calc__result-value--green">₹{fmt(result.annualSavings)}</span>
                                    </div>
                                </div>
                                <div className="enquiry-calc__result-row">
                                    <div className="enquiry-calc__result-item">
                                        <span className="enquiry-calc__result-label">Net Investment</span>
                                        <span className="enquiry-calc__result-value">₹{fmt(result.netInvestment)}</span>
                                    </div>
                                    <div className="enquiry-calc__result-item">
                                        <span className="enquiry-calc__result-label">Payback</span>
                                        <span className="enquiry-calc__result-value enquiry-calc__result-value--blue">{result.paybackPeriod} yrs</span>
                                    </div>
                                </div>
                                {calcType === "residential" && result.subsidy > 0 && (
                                    <div className="enquiry-calc__subsidy-badge">
                                        🏛️ PM Surya Ghar Subsidy: <strong>₹{fmt(result.subsidy)}</strong>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Submit / CTA */}
                        <Link to="/solar-calculator" className="enquiry-calc__submit-btn" id="enquiry-calc-submit">
                            Get Detailed Estimate →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EnquiryCalculator;
