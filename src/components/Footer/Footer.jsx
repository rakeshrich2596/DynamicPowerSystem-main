import { Link, NavLink } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import "./Footer.css";

const services = [
    "Solar Power Plant",
    "Solar Water Heater",
    "Solar Water Pumping",
    "Solar Street Lights",
    "Solar Home UPS",
    "Inverter & Battery",
    "Online UPS",
    "RO Systems",
];

const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Solar Calculator", to: "/solar-calculator" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

const socials = [
    { label: "Facebook", icon: "f", href: "#" },
    { label: "Instagram", icon: "in", href: "#" },
    { label: "YouTube", icon: "▶", href: "#" },
    { label: "LinkedIn", icon: "li", href: "#" },
];

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">

                    {/* Brand Column */}
                    <div className="footer-col footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src="/logo.png" alt="Dynamic Power Systems Logo" className="footer-logo-img" />
                        </Link>
                        <p className="footer-tagline">
                            Discover a Sustainable Lifestyle with cutting-edge power systems.
                            Empowering Tamil Nadu with clean, affordable solar energy since 1995.
                        </p>
                        <div className="footer-socials">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    className="footer-social-btn"
                                    aria-label={s.label}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-list">
                            {quickLinks.map((l) => (
                                <li key={l.to}>
                                    <NavLink to={l.to} end={l.to === "/"}>
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Our Products</h4>
                        <ul className="footer-list">
                            {services.map((s) => (
                                <li key={s}>
                                    <Link to="/products">{s}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Contact Us</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="footer-contact-icon"><MapPin size={16} strokeWidth={1.8} /></span>
                                <span>Gandhi Rd, Tambaram West,<br />Tambaram, Chennai – 600045</span>
                            </li>
                            <li>
                                <span className="footer-contact-icon"><Phone size={16} strokeWidth={1.8} /></span>
                                <a href="https://wa.me/919841582874" target="_blank" rel="noopener noreferrer">+91 98415 82874</a>
                            </li>
                            <li>
                                <span className="footer-contact-icon"><Mail size={16} strokeWidth={1.8} /></span>
                                <a href="mailto:info@dynamicsolar.in">info@dynamicsolar.in</a>
                            </li>
                            <li>
                                <span className="footer-contact-icon"><Clock size={16} strokeWidth={1.8} /></span>
                                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                            </li>
                        </ul>
                        <Link to="/contact" className="footer-quote-btn">
                            Get a Free Quote →
                        </Link>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} Dynamic Solar. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <span>·</span>
                        <a href="#">Terms of Service</a>
                        <span>·</span>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
