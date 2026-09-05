import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useInView } from "../../hooks/useInView";
import eastmanLogo   from "../../assets/images/clients/Eastmans.png";
import ashapowerLogo from "../../assets/images/clients/asha.webp";
import havellsLogo   from "../../assets/images/clients/Havells1.png";
import vguardLogo    from "../../assets/images/clients/vguard.png";
import racoldLogo    from "../../assets/images/clients/racolds.jpg";
import cromptonLogo  from "../../assets/images/clients/cromptons.png";
import "./Products.css";

const BRANDS = [
    {
        slug:  'eastman',
        name:  'Eastman',
        logo:  eastmanLogo,
        desc:  'India\'s leading solar brand — grid tie & hybrid inverters, LiFePO₄ batteries, tubular batteries, and high-efficiency solar panels.',
        link:  '/products/eastman',
    },
    {
        slug:  'ashapower',
        name:  'Asha Power',
        logo:  ashapowerLogo,
        desc:  'Digital power systems & solar solutions — hybrid inverters, grid tie, off-grid inverters, lithium batteries, solar panels, and water pumps.',
        link:  '/products/ashapower',
    },
    {
        slug:  'havells',
        name:  'Havells',
        logo:  havellsLogo,
        desc:  'Trusted electrical and solar solutions from one of India\'s most recognised household brands.',
        link:  '/products/havells',
    },
    {
        slug:  'vguard',
        name:  'V-Guard',
        logo:  vguardLogo,
        desc:  'Reliable inverters, batteries, and solar products backed by decades of Indian engineering.',
        link:  '/products/vguard',
    },
    {
        slug:  'racold',
        name:  'Racold',
        logo:  racoldLogo,
        desc:  'Energy-efficient solar water heaters and complementary products for every Indian home.',
        link:  '/products/racold',
    },
    // {
    //     slug:  'crompton',
    //     name:  'Crompton',
    //     logo:  cromptonLogo,
    //     desc:  'Premium quality solar water heaters and durable pumping systems from Crompton.',
    //     link:  '/products/crompton',
    // },
];

function BrandCard({ brand, delay = 0 }) {
    const [ref, inView] = useInView();
    return (
        <Link
            ref={ref}
            to={brand.link}
            className={`brand-card fade-in-up${inView ? ' visible' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className="brand-card-logo-wrap">
                <img src={brand.logo} alt={`${brand.name} logo`} className="brand-card-logo" />
            </div>
            <h3 className="brand-card-name">{brand.name}</h3>
            <p className="brand-card-desc">{brand.desc}</p>
            <span className="brand-card-cta">
                Explore Products <span aria-hidden="true">→</span>
            </span>
        </Link>
    );
}

function Products() {
    const [heroRef, heroInView] = useInView();
    const [hdrRef, hdrInView]   = useInView();

    return (
        <>
            <Navbar />

            {/* Hero */}
            <div
                ref={heroRef}
                className={`page-hero products-hero${heroInView ? ' animate-typing' : ''}`}
            >
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Our Brands</span>
                    <h1 className="page-hero-title">Products &amp; Solutions</h1>
                    <p className="page-hero-sub">
                        Premium solar products from India's most trusted brands — inverters, batteries, and high-efficiency panels for every application.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>Products</span>
                    </nav>
                </div>
            </div>

            {/* Brands Grid */}
            <section className="brands-section">
                <div className="container">
                    <div
                        ref={hdrRef}
                        className={`section-header fade-in-up${hdrInView ? ' visible' : ''}`}
                    >
                        <span className="section-tag">Trusted Brands</span>
                        <h2 className="section-title">Brands We Carry</h2>
                        <p className="section-subtitle">
                            We partner with India's leading solar manufacturers to bring you quality products with reliable after-sales support.
                        </p>
                    </div>

                    <div className="brands-grid">
                        {BRANDS.map((brand, i) => (
                            <BrandCard
                                key={brand.slug}
                                brand={brand}
                                delay={Math.min(i * 0.1, 0.4)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Products;
