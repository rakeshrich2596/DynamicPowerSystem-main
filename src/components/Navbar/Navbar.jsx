import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const BRANDS = [
    { slug: 'eastman',   label: 'Eastman'    },
    { slug: 'ashapower', label: 'Asha Power' },
    { slug: 'havells',   label: 'Havells'    },
    { slug: 'vguard',    label: 'V-Guard'    },
    { slug: 'racold',    label: 'Racold'     },
    { slug: 'crompton',  label: 'Crompton'   },
];

function Navbar() {
    const [scrolled,       setScrolled]       = useState(() => window.scrollY > 50);

    const [menuOpen,       setMenuOpen]       = useState(false);
    const [dropdownOpen,   setDropdownOpen]   = useState(false);
    const [mobileProdOpen, setMobileProdOpen] = useState(false);
    const [mobileEastmanOpen, setMobileEastmanOpen] = useState(false);
    const [mobileInverterOpen, setMobileInverterOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeAll = () => {
        setMenuOpen(false);
        setMobileProdOpen(false);
        setDropdownOpen(false);
        setMobileEastmanOpen(false);
        setMobileInverterOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="container navbar-inner">

                {/* Logo */}
                <Link to="/" className="logo" onClick={closeAll}>
                    <img src="/logo.png" alt="Dynamic Power Systems Logo" className="logo-img" />
                </Link>

                {/* Desktop Nav */}
                <ul className="nav-links">
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>

                    {/* Products hover dropdown — brands only */}
                    <li
                        className={`nav-dropdown${dropdownOpen ? ' nav-dropdown--open' : ''}`}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <NavLink to="/products">
                            Products
                            <svg
                                className="nav-dropdown-chevron"
                                width="12" height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </NavLink>

                        <div className="nav-dropdown-menu" role="menu">
                            {BRANDS.map(({ slug, label }) => (
                                <Link
                                    key={slug}
                                    to={`/products/${slug}`}
                                    className="nav-dropdown-item"
                                    role="menuitem"
                                    onClick={closeAll}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </li>

                    <li><NavLink to="/solar-calculator">Solar Calculator</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>

                {/* CTA */}
                <Link to="/contact" className="nav-cta" onClick={closeAll}>
                    Get a Quote
                </Link>

                {/* Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
                <ul>
                    <li><NavLink to="/" end onClick={closeAll}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={closeAll}>About Us</NavLink></li>

                    <li className="mobile-products-item">
                        <button
                            className="mobile-products-toggle"
                            onClick={() => setMobileProdOpen((o) => !o)}
                            aria-expanded={mobileProdOpen}
                        >
                            <span>Products</span>
                            <svg
                                className={`mobile-chevron${mobileProdOpen ? ' rotated' : ''}`}
                                width="14" height="14"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        {mobileProdOpen && (
                            <ul className="mobile-sub-menu">
                                <li>
                                    <NavLink to="/products" onClick={closeAll}>All Brands</NavLink>
                                </li>
                                {BRANDS.map(({ slug, label }) => (
                                    <li key={slug}>
                                        <Link
                                            to={`/products/${slug}`}
                                            className="mobile-sub-item"
                                            onClick={closeAll}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <li><NavLink to="/solar-calculator" onClick={closeAll}>Solar Calculator</NavLink></li>
                    <li><NavLink to="/blog" onClick={closeAll}>Blog</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeAll}>Contact</NavLink></li>
                    <li>
                        <Link to="/contact" className="mobile-cta" onClick={closeAll}>
                            Get a Quote
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
