import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import bannerResidential from "../../assets/images/hero/banner-residential.png";
import bannerOngrid from "../../assets/images/hero/banner-ongrid.png";
import bannerOffgrid from "../../assets/images/hero/banner-offgrid.png";
import bannerSubsidy from "../../assets/images/hero/banner-subsidy.png";
import bannerSaveElectricity from "../../assets/images/hero/banner-save-electricity.png";

const slides = [
    {
        image: bannerResidential,
        headline: ["Trusted Solar", "Solutions Since 1995"],
        subhead: "Power For Ever — 25+ years of reliable, efficient solar power for homes, institutions, industries and farms.",
        cta: { text: "Making Rooftops Profitable", href: "/solar-calculator" },
        hashtag: true,
        align: "left",
    },
    {
        image: bannerOffgrid,
        headline: ["Solar On-Grid, Off-Grid", "& Hybrid Solution"],
        headingSize: "clamp(2rem, 4.2vw, 3.8rem)",
        cta: { text: "Making Rooftops Profitable", href: "/solar-calculator" },
        hashtag: true,
        align: "left",
    },
    {
        image: bannerSaveElectricity,
        headline: ["Save 95% on", "Electricity bills"],
        subhead: "Schedule a FREE Solar consultation at home",
        cta: null,
        hashtag: true,
        align: "left",
        compact: true,
    },
    {
        image: bannerSubsidy,
        isSubsidySlide: true,
    },
];

const INTERVAL = 5000;

function Hero() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [textVisible, setTextVisible] = useState(true);

    const goTo = useCallback(
        (idx) => {
            if (animating || idx === current) return;
            setAnimating(true);
            setTextVisible(false);
            setTimeout(() => {
                setCurrent(idx);
                setTimeout(() => {
                    setTextVisible(true);
                    setAnimating(false);
                }, 100);
            }, 400);
        },
        [animating, current]
    );

    const next = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    return (
        <section className="hero-banner" aria-label="Hero banner carousel" id="hero-banner">

            {/* ── Background Slides ── */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className={`hero-banner__slide ${i === current ? "hero-banner__slide--active" : ""}`}
                    aria-hidden={i !== current}
                >
                    <img
                        src={s.image}
                        alt={s.headline ? s.headline.join(" ") : "Dynamic Solar Power"}
                        className={`hero-banner__bg${s.isSubsidySlide ? " hero-banner__bg--subsidy" : ""}`}
                    />
                </div>
            ))}

            {/* ── Overlay ── */}
            {!slide.isSubsidySlide && (
                <div className="hero-banner__overlay" />
            )}

            {/* ── Hexagon Pattern (only on regular slides) ── */}
            {!slide.isSubsidySlide && (
                <div className="hero-banner__hex-pattern" aria-hidden="true">
                    <svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hexPattern" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                                <polygon points="30,0 60,15 60,37 30,52 0,37 0,15" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="400" height="700" fill="url(#hexPattern)" />
                    </svg>
                </div>
            )}

            {/* ══════════════════════════════════════════
                SUBSIDY SLIDE – full custom layout
                ══════════════════════════════════════════ */}
            {slide.isSubsidySlide && (
                <div className={`hero-banner__subsidy-wrap ${textVisible ? "hero-banner__content--visible" : ""}`}>

                    {/* ── Top-right Govt Badge (absolute) ── */}
                    <div className="hero-banner__govt-badge" aria-label="Government subsidy information">
                        <div className="hero-banner__govt-badge-text" style={{alignItems: "center", textAlign: "center", width: "100%"}}>
                            <span className="hero-banner__govt-badge-title" style={{fontSize: "0.75rem", marginBottom: "4px"}}>GOVT. SUBSIDY AVAILABLE</span>
                            <span className="hero-banner__govt-badge-amount" style={{fontSize: "1.1rem"}}>SAVE UP TO ₹78,000*</span>
                        </div>
                    </div>

                    {/* ── Left content column ── */}
                    <div className="hero-banner__subsidy-content">

                        {/* MNRE badge */}
                        <div className="hero-banner__mnre-badge" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px", border: "none", background: "transparent", padding: "0 0 10px 0"}}>
                            <span style={{fontSize: "0.85rem", fontWeight: 700, color: "#333", background: "#fff", padding: "2px 8px", borderRadius: "4px"}}>Government Approval</span>
                            <span style={{fontSize: "1.1rem", fontWeight: 900, color: "#166534", letterSpacing: "0.5px", marginTop: "4px"}}>MNRE APPROVED VENDOR</span>
                            <span style={{fontSize: "0.9rem", fontWeight: 700, color: "#000"}}>GOVERNMENT OF INDIA</span>
                        </div>

                        {/* Main heading */}
                        <h1 className="hero-banner__subsidy-heading">
                            POWER YOUR HOME WITH <br /><span className="hero-banner__subsidy-solar">SOLAR</span>
                        </h1>

                        {/* Tagline */}
                        <p className="hero-banner__subsidy-tagline">
                            Save More. Live Better. Go Green.
                        </p>

                        {/* Subsidy info box */}
                        <div className="hero-banner__subsidy-box" style={{alignItems: "center", textAlign: "center", padding: "16px 30px"}}>
                            <p className="hero-banner__subsidy-box-label" style={{fontSize: "1rem"}}>Get Subsidy up to</p>
                            <p className="hero-banner__subsidy-box-amount" style={{margin: "4px 0"}}>₹78,000<sup>*</sup></p>
                            <span className="hero-banner__subsidy-box-days" style={{margin: "6px 0"}}>in 15 days</span>
                            <p className="hero-banner__subsidy-box-note" style={{fontSize: "0.85rem", fontWeight: 600}}>End to end services with no tension</p>
                        </div>

                        {/* CTA */}
                        <Link className="hero-banner__subsidy-cta" to="/contact" id="hero-subsidy-cta-btn">
                            GET FREE QUOTE
                        </Link>
                    </div>

                    {/* ── Full-width bottom bar (absolute) ── */}
                    <div className="hero-banner__subsidy-bar">
                        <span>Chennai&apos;s #1 Trusted Solar Company</span>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════
                REGULAR SLIDES – original layout
                ══════════════════════════════════════════ */}
            {!slide.isSubsidySlide && (
                <div className={`hero-banner__content ${textVisible ? "hero-banner__content--visible" : ""}`}>
                    <div className={`hero-banner__container ${slide.align === "center" ? "hero-banner__container--center" : ""} ${slide.compact ? "hero-banner__container--compact" : ""}`}>
                        {slide.headline && (
                            <div className="hero-banner__title">
                                <h1
                                    className={`hero-banner__heading ${!slide.cta ? "hero-banner__heading--underline" : "hero-banner__heading--no-border"}`}
                                    style={slide.headingSize ? { fontSize: slide.headingSize } : {}}
                                >
                                    {slide.headline[0]}
                                    <br />
                                    {slide.headline[1]}
                                </h1>
                                {slide.subhead && (
                                    <p className="hero-banner__subhead" style={{ color: '#fff', fontSize: '1.2rem', maxWidth: '600px', margin: '15px 0 25px', lineHeight: '1.5' }}>
                                        {slide.subhead}
                                    </p>
                                )}
                                {slide.cta && (
                                    <div className="hero-banner__action">
                                        <Link className="hero-banner__btn" to={slide.cta.href} id="hero-cta-btn">
                                            {slide.cta.text}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {slide.hashtag && (
                            <div className="hero-banner__hashtag">Power For Ever</div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Dot Navigation ── */}
            <div className="hero-banner__dots" role="tablist">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`hero-banner__dot ${i === current ? "hero-banner__dot--active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        role="tab"
                        aria-selected={i === current}
                        id={`hero-banner-dot-${i}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Hero;