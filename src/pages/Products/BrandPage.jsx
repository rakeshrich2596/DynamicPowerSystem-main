import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useInView } from "../../hooks/useInView";
import "./Products.css";

const BRAND_INFO = {
    havells: {
        display: 'Havells',
        tagline: 'Trusted electrical and solar solutions from one of India\'s most recognised brands.',
        logo: '/src/assets/images/clients/havells.png',
        color: '#e31e24',
    },
    vguard: {
        display: 'V-Guard',
        tagline: 'Reliable inverters, batteries, and solar products backed by decades of Indian engineering.',
        logo: '/src/assets/images/clients/vguard.png',
        color: '#003d7c',
    },
    racold: {
        display: 'Racold',
        tagline: 'Energy-efficient solar water heaters and related products for every Indian home.',
        logo: '/src/assets/images/clients/racold.png',
        color: '#0072bc',
    },
    crompton: {
        display: 'Crompton',
        tagline: 'High-performance solar water heaters and reliable pumping systems from Crompton.',
        logo: '/src/assets/images/clients/crompton.png',
        color: '#004785',
    },
};

function BrandPage() {
    const { brand } = useParams();
    const info = BRAND_INFO[brand] ?? {
        display: brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'Brand',
        tagline: 'Coming soon — we\'re curating this brand\'s product range for you.',
        logo:  null,
        color: 'var(--primary-orange)',
    };

    const [heroRef, heroInView] = useInView();

    return (
        <>
            <Navbar />

            <div
                ref={heroRef}
                className={`page-hero brand-hero${heroInView ? ' animate-typing' : ''}`}
            >
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Brand Showcase</span>
                    <h1 className="page-hero-title">{info.display} Products</h1>
                    <p className="page-hero-sub">{info.tagline}</p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <Link to="/products">Products</Link>
                        <span>›</span>
                        <span>{info.display}</span>
                    </nav>
                </div>
            </div>

            <section className="brand-coming-soon">
                <div className="container brand-coming-inner">
                    <div className="brand-coming-icon">🔧</div>
                    <h2 className="brand-coming-title">Coming Soon</h2>
                    <p className="brand-coming-sub">
                        We're building out the complete {info.display} product catalogue. Check back shortly
                        or contact us directly and we'll guide you to the right product for your needs.
                    </p>
                    <div className="brand-coming-actions">
                        <Link to="/contact" className="btn-primary">
                            Contact Us
                        </Link>
                        <Link to="/products" className="btn-outline">
                            View All Brands
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default BrandPage;
