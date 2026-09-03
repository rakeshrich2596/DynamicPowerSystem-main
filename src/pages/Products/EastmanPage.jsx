import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useInView } from "../../hooks/useInView";
import { EASTMAN_NAV, EASTMAN_SECTIONS } from "../../data/eastmanData";
import "./EastmanPage.css";

const SCROLL_OFFSET = 170;

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Product Card (reference design: image left + info right) ── */
function ProductCard({ product, delay = 0, index = 0 }) {
    const [imgError, setImgError] = useState(false);
    const [cardRef, inView] = useInView();

    const showFallback = !product.image || imgError;

    return (
        <article
            ref={cardRef}
            className={`prod-card fade-in-up${inView ? ' visible' : ''}`}
            style={{
                transitionDelay: `${delay}s`,
                top: `${80 + index * 22}px`,
                zIndex: index + 1,
            }}
        >
            {product.badge && (
                <span className="prod-badge">{product.badge}</span>
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
            <div className="prod-img-wrap">
                {showFallback ? (
                    <div className="prod-img-fallback">
                        <span className="prod-img-icon">☀️</span>
                        <span className="prod-img-label">{product.name}</span>
                    </div>
                ) : (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="prod-img"
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Content area */}
            <div className="prod-body">
                <p className="prod-subtitle">{product.subtitle}</p>
                <h3 className="prod-name">{product.name}</h3>

                {/* Range + Warranty boxes */}
                <div className="prod-info-boxes">
                    {product.range && (
                        <div className="prod-info-box prod-info-box--range">
                            <svg
                                className="prod-info-icon"
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
                                <span className="prod-info-value">{product.range}</span>
                                <span className="prod-info-label">Range</span>
                            </div>
                        </div>
                    )}
                    {product.warranty && (
                        <div className="prod-info-box prod-info-box--warranty">
                            <svg
                                className="prod-info-icon"
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
                                <span className="prod-info-value">{product.warranty}</span>
                                <span className="prod-info-label">Years Warranty*</span>
                            </div>
                        </div>
                    )}
                </div>

                {product.warranty && (
                    <p className="prod-tc">*T&C Apply</p>
                )}

                <p className="prod-desc">{product.description}</p>

                <ul className="prod-specs">
                    {product.specs.map(({ label, value }) => (
                        <li key={label} className="prod-spec-row">
                            <span className="prod-spec-label">{label}</span>
                            <span className="prod-spec-value">{value}</span>
                        </li>
                    ))}
                </ul>

                <ul className="prod-highlights">
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
        <section id={section.id} className="prod-section">
            <div className="container">
                <div
                    ref={hdrRef}
                    className={`section-header fade-in-up${hdrInView ? ' visible' : ''}`}
                >
                    <span className="section-tag">{section.tag}</span>
                    <h2 className="section-title">{section.title}</h2>
                    <p className="section-subtitle">{section.tagline}</p>
                </div>

                <div className="prod-list">
                    {section.products.map((product, i) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            delay={Math.min(i * 0.1, 0.4)}
                            index={i}
                        />
                    ))}
                </div>
                <div className="prod-list-spacer" />
            </div>
        </section>
    );
}

/* ── Sticky Category Nav ── */
function CategoryNav({ activeId }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const inverterIds = [
        'section-grid-tie',
        'section-hybrid-lv',
        'section-hybrid-hv',
        'section-off-grid'
    ];

    const inverters = [
        { id: 'section-grid-tie',   label: 'Solar Grid Tie Inverter'                    },
        { id: 'section-hybrid-lv',  label: 'Solar Hybrid Inverter IP65 - Low Voltage'   },
        { id: 'section-hybrid-hv',  label: 'Solar Hybrid Inverter IP65 - High Voltage'  },
        { id: 'section-off-grid',   label: 'Solar Off-Grid Inverter'                    },
    ];

    const otherCategories = [
        { id: 'section-lithium',    label: 'Solar Lithium Battery'                      },
        { id: 'section-tubular',    label: 'Solar Conventional Tubular Battery'         },
        { id: 'section-panels',     label: 'Solar Panels'                               },
    ];

    const isInverterActive = inverterIds.includes(activeId);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInverterClick = (id) => {
        scrollToSection(id);
        setDropdownOpen(false);
    };

    return (
        <div className="prod-cat-nav" role="navigation" aria-label="Eastman product categories">
            <div className="container prod-cat-inner">
                {/* Solar Inverter Dropdown */}
                <div 
                    className="cat-inverter-wrap" 
                    ref={dropdownRef}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button
                        className={`prod-cat-btn${isInverterActive ? ' prod-cat-btn--active' : ''}`}
                        onClick={() => setDropdownOpen((o) => !o)}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                    >
                        <span>Solar Inverter</span>
                        <svg
                            className={`cat-chevron${dropdownOpen ? ' cat-chevron--open' : ''}`}
                            width="12" height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <div className={`prod-cat-dropdown-menu${dropdownOpen ? ' prod-cat-dropdown-menu--open' : ''}`} role="menu">
                        {inverters.map(({ id, label }) => (
                            <button
                                key={id}
                                className={`prod-cat-dropdown-item${activeId === id ? ' prod-cat-dropdown-item--active' : ''}`}
                                onClick={() => handleInverterClick(id)}
                                role="menuitem"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Other Categories */}
                {otherCategories.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`prod-cat-btn${activeId === id ? ' prod-cat-btn--active' : ''}`}
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

/* ── Main Eastman Page ── */
function EastmanPage() {
    const [heroRef, heroInView] = useInView();
    const [activeId, setActiveId] = useState(EASTMAN_NAV[0].id);
    const location = useLocation();

    /* Scroll to hash on first mount or when hash changes */
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (!hash) return;
        const valid = EASTMAN_NAV.some(({ id }) => id === hash);
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
        EASTMAN_NAV.forEach(({ id }) => {
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
                className={`page-hero eastman-hero${heroInView ? ' animate-typing' : ''}`}
            >
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Brand Showcase</span>
                    <h1 className="page-hero-title">Eastman Solar Products</h1>
                    <p className="page-hero-sub">
                        India's #1 solar brand — grid tie inverters, hybrid inverters, lithium batteries, tubular batteries, and high-efficiency panels.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <Link to="/products">Products</Link>
                        <span>›</span>
                        <span>Eastman</span>
                    </nav>
                </div>
            </div>

            {/* Sticky Category Nav */}
            <CategoryNav activeId={activeId} />

            {/* Product Sections */}
            {EASTMAN_SECTIONS.map((section) => (
                <ProductSection key={section.id} section={section} />
            ))}

            <Footer />
        </>
    );
}

export default EastmanPage;
