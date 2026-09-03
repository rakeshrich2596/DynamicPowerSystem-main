import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useInView } from "../../hooks/useInView";
import { RACOLD_NAV, RACOLD_SECTIONS } from "../../data/racoldData";
import "./RacoldPage.css";

const SCROLL_OFFSET = 170;

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Product Card (same design as Eastman/Asha) ── */
function ProductCard({ product, delay = 0, index = 0 }) {
    const [imgError, setImgError] = useState(false);
    const [cardRef, inView] = useInView();

    const showFallback = !product.image || imgError;

    return (
        <div 
            ref={cardRef} 
            className={`racold-prod-card fade-in-up ${inView ? 'visible' : ''}`}
            style={{ 
                transitionDelay: `${delay}ms`,
                top: `${140 + (index * 20)}px`,
                zIndex: index + 10
            }}
        >
            <div className="racold-prod-badge">{product.badge}</div>

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
            
            <div className="racold-prod-img-wrap">
                {showFallback ? (
                    <div className="racold-prod-img-fallback">
                        <span className="racold-prod-img-icon">🌡️</span>
                        <span className="racold-prod-img-label">{product.name}</span>
                    </div>
                ) : (
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="racold-prod-img"
                        onError={() => setImgError(true)}
                    />
                )}
            </div>

            <div className="racold-prod-body">
                <h4 className="racold-prod-subtitle">{product.subtitle}</h4>
                <h3 className="racold-prod-name">{product.name}</h3>
                
                <div className="racold-prod-info-boxes">
                    <div className="racold-prod-info-box racold-prod-info-box--range">
                        <svg className="racold-prod-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div>
                            <span className="racold-prod-info-value">{product.range}</span>
                            <span className="racold-prod-info-label">Capacity</span>
                        </div>
                    </div>
                    <div className="racold-prod-info-box racold-prod-info-box--warranty">
                        <svg className="racold-prod-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div>
                            <span className="racold-prod-info-value">{product.warranty}</span>
                            <span className="racold-prod-info-label">Years Warranty*</span>
                        </div>
                    </div>
                </div>
                <p className="racold-prod-tc">*T&C Apply</p>

                <p className="racold-prod-desc">{product.description}</p>

                <ul className="racold-prod-specs">
                    {product.specs.map((spec, i) => (
                        <li key={i} className="racold-prod-spec-row">
                            <span className="racold-prod-spec-label">{spec.label}</span>
                            <span className="racold-prod-spec-value">{spec.value}</span>
                        </li>
                    ))}
                </ul>

                <ul className="racold-prod-highlights">
                    {product.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ── Product Section ── */
function ProductSection({ section }) {
    const [sectionRef, inView] = useInView({ threshold: 0.1 });

    return (
        <section id={section.id} className="racold-prod-section">
            <div className="container">
                <div ref={sectionRef} className={`section-header text-center fade-in-up ${inView ? 'visible' : ''}`}>
                    <span className="section-tag">{section.tag}</span>
                    <h2 className="section-title">{section.title}</h2>
                    <p className="section-sub mx-auto">{section.tagline}</p>
                    <div className="section-divider mx-auto"></div>
                </div>

                <div className="racold-prod-list">
                    {section.products.map((prod, idx) => (
                        <ProductCard 
                            key={prod.id} 
                            product={prod} 
                            delay={idx * 150} 
                            index={idx}
                        />
                    ))}
                    <div className="racold-prod-list-spacer"></div>
                </div>
            </div>
        </section>
    );
}

export default function RacoldPage() {
    const [heroRef, heroInView] = useInView({ threshold: 0.1 });
    const location = useLocation();
    const [activeSection, setActiveSection] = useState(RACOLD_NAV[0].id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + SCROLL_OFFSET + 100;
            let current = activeSection;

            for (const nav of RACOLD_NAV) {
                const el = document.getElementById(nav.id);
                if (el && el.offsetTop <= scrollPos) {
                    current = nav.id;
                }
            }
            if (current !== activeSection) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    return (
        <div className="racold-page page-layout">
            <Navbar />
            
            <main>
                <div 
                    ref={heroRef} 
                    className={`page-hero racold-hero${heroInView ? ' animate-typing' : ''}`}
                >
                    <div className="page-hero-overlay" />
                    <div className="container page-hero-content">
                        <span className="page-hero-tag">Brand Showcase</span>
                        <h1 className="page-hero-title">Racold Products</h1>
                        <p className="page-hero-sub">
                            Energy-efficient solar water heaters and heat pumps for every Indian home.
                        </p>
                        <div className="breadcrumb">
                            <Link to="/">Home</Link>
                            <span>›</span>
                            <Link to="/products">Products</Link>
                            <span>›</span>
                            <span>Racold</span>
                        </div>
                    </div>
                </div>

                <div className="racold-cat-nav">
                    <div className="container">
                        <div className="racold-cat-scroll">
                            <div className="racold-cat-inner">
                                {RACOLD_NAV.map((nav) => (
                                    <button 
                                        key={nav.id}
                                        className={`racold-cat-btn ${activeSection === nav.id ? 'racold-cat-btn--active' : ''}`}
                                        onClick={() => scrollToSection(nav.id)}
                                    >
                                        {nav.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="racold-sections-wrapper">
                    {RACOLD_SECTIONS.map(section => (
                        <ProductSection key={section.id} section={section} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
