import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useInView } from "../../hooks/useInView";
import { ASHA_NAV, ASHA_SECTIONS } from "../../data/ashaPowerData";
import "./AshaPage.css";

const SCROLL_OFFSET = 170;

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Product Card (same design as EastmanPage) ── */
function ProductCard({ product, delay = 0, index = 0 }) {
    const [imgError, setImgError] = useState(false);
    const [cardRef, inView] = useInView();

    const showFallback = !product.image || imgError;

    return (
        <article
            ref={cardRef}
            className={`asha-prod-card fade-in-up${inView ? ' visible' : ''}`}
            style={{
                transitionDelay: `${delay}s`,
                top: `${80 + index * 22}px`,
                zIndex: index + 1,
            }}
        >
            {product.badge && (
                <span className="asha-prod-badge">{product.badge}</span>
            )}

            {/* Get Enquiry WhatsApp button */}
            <a
                href={`https://wa.me/919841582874?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}. Please share details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="prod-enquiry-btn"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.816 5.816 0 0 0-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Get Enquiry
            </a>

            {/* Image area */}
            <div className="asha-prod-img-wrap">
                {showFallback ? (
                    <div className="asha-prod-img-fallback">
                        <span className="asha-prod-img-icon">⚡</span>
                        <span className="asha-prod-img-label">{product.name}</span>
                    </div>
                ) : (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="asha-prod-img"
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Content area */}
            <div className="asha-prod-body">
                <p className="asha-prod-subtitle">{product.subtitle}</p>
                <h3 className="asha-prod-name">{product.name}</h3>

                {/* Range + Warranty boxes */}
                <div className="asha-prod-info-boxes">
                    {product.range && (
                        <div className="asha-prod-info-box asha-prod-info-box--range">
                            <svg
                                className="asha-prod-info-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M13 2L4.09 12.6H11L10 22L19.91 11.4H13L13 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <div>
                                <span className="asha-prod-info-value">{product.range}</span>
                                <span className="asha-prod-info-label">Range</span>
                            </div>
                        </div>
                    )}
                    {product.warranty && (
                        <div className="asha-prod-info-box asha-prod-info-box--warranty">
                            <svg
                                className="asha-prod-info-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 12l2 2 4-4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div>
                                <span className="asha-prod-info-value">{product.warranty}</span>
                                <span className="asha-prod-info-label">Years Warranty*</span>
                            </div>
                        </div>
                    )}
                </div>

                {product.warranty && (
                    <p className="asha-prod-tc">*T&C Apply</p>
                )}

                <p className="asha-prod-desc">{product.description}</p>

                <ul className="asha-prod-specs">
                    {product.specs.map(({ label, value }) => (
                        <li key={label} className="asha-prod-spec-row">
                            <span className="asha-prod-spec-label">{label}</span>
                            <span className="asha-prod-spec-value">{value}</span>
                        </li>
                    ))}
                </ul>

                <ul className="asha-prod-highlights">
                    {product.highlights.map((h) => (
                        <li key={h}>{h}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/* ── Product Section ── */
function ProductSection({ section }) {
    const [hdrRef, hdrInView] = useInView();

    return (
        <section id={section.id} className="asha-prod-section">
            <div className="container">
                <div
                    ref={hdrRef}
                    className={`section-header fade-in-up${hdrInView ? ' visible' : ''}`}
                >
                    <span className="section-tag">{section.tag}</span>
                    <h2 className="section-title">{section.title}</h2>
                    <p className="section-subtitle">{section.tagline}</p>
                </div>

                <div className="asha-prod-list">
                    {section.products.map((product, i) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            delay={Math.min(i * 0.1, 0.4)}
                            index={i}
                        />
                    ))}
                </div>
                <div className="asha-prod-list-spacer" />
            </div>
        </section>
    );
}

/* ── Sticky Category Nav ── */
function CategoryNav({ activeId }) {
    return (
        <div className="asha-cat-nav" role="navigation" aria-label="Asha Power product categories">
            <div className="container asha-cat-inner">
                {ASHA_NAV.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`asha-cat-btn${activeId === id ? ' asha-cat-btn--active' : ''}`}
                        onClick={() => scrollToSection(id)}
                        aria-current={activeId === id ? 'true' : undefined}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ── Main Asha Power Page ── */
function AshaPage() {
    const [heroRef, heroInView] = useInView();
    const [activeId, setActiveId] = useState(ASHA_NAV[0].id);
    const location = useLocation();

    /* Scroll to hash on first mount or when hash changes */
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (!hash) return;
        const valid = ASHA_NAV.some(({ id }) => id === hash);
        if (!valid) return;
        const tryScroll = () => {
            const el = document.getElementById(hash);
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        };
        setTimeout(tryScroll, 120);
    }, [location.hash]);

    /* IntersectionObserver — highlights active category in sticky nav */
    useEffect(() => {
        const observers = [];
        ASHA_NAV.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
                { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <>
            <Navbar />

            {/* Hero */}
            <div
                ref={heroRef}
                className={`page-hero asha-hero${heroInView ? ' animate-typing' : ''}`}
            >
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Brand Showcase</span>
                    <h1 className="page-hero-title">Asha Power Products</h1>
                    <p className="page-hero-sub">
                        Digital power systems & solar solutions — hybrid inverters, grid tie, off-grid, lithium batteries, panels, and solar water pumps.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <Link to="/products">Products</Link>
                        <span>›</span>
                        <span>Asha Power</span>
                    </nav>
                </div>
            </div>

            {/* Sticky Category Nav */}
            <CategoryNav activeId={activeId} />

            {/* Product Sections */}
            {ASHA_SECTIONS.map((section) => (
                <ProductSection key={section.id} section={section} />
            ))}

            <Footer />
        </>
    );
}

export default AshaPage;
