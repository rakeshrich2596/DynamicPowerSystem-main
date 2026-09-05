import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import "./Footer.css";

/* =========================================================
   IMPORTANT PRODUCTS ONLY
========================================================= */

const services = [
  "Solar Power Plant",
  "Solar Water Heater",
  "Solar Water Pumping",
  "Solar Street Lights",
  "Solar Home UPS",
];

/* =========================================================
   QUICK LINKS
========================================================= */

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Solar Calculator", path: "/solar-calculator" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

/* =========================================================
   SOCIAL MEDIA
========================================================= */

const socials = [
  {
    name: "Facebook",
    short: "f",
    link: "#",
  },
  {
    name: "Instagram",
    short: "in",
    link: "#",
  },
  {
    name: "YouTube",
    short: "▶",
    link: "#",
  },
  {
    name: "LinkedIn",
    short: "li",
    link: "#",
  },
];

/* =========================================================
   PHONE NUMBERS
========================================================= */

const contactNumbers = [
  {
    label: "Sales",
    number: "+91 72999 85357",
    link: "tel:+917299985357",
  },
  {
    label: "Support",
    number: "+91 98416 85357",
    link: "tel:+919841685357",
  },
  {
    label: "Enquiry",
    number: "+91 90030 85357",
    link: "tel:+919003085357",
  },
];

/* =========================================================
   EMAILS
========================================================= */

const emails = [
  {
    label: "Admin",
    email: "admin@dynamicsolar.in",
    link: "mailto:admin@dynamicsolar.in",
  },
  {
    label: "Enquiry",
    email: "Enquiry@dynamicsolar.in",
    link: "mailto:Enquiry@dynamicsolar.in",
  },
];

/* =========================================================
   FOOTER
========================================================= */

const Footer = () => {
  return (
    <footer className="footer">

      {/* =====================================================
          FOOTER TOP
      ===================================================== */}

      <div className="footer-top">
        <div className="container">

          <div className="footer-grid">

            {/* =================================================
                COLUMN 1 - BRAND
            ================================================= */}

            <div className="footer-col footer-brand">

              <div className="footer-col-content">

                {/* Logo */}
                <Link to="/" className="footer-logo">
                  <img
                    src="/logo.png"
                    alt="Dynamic Solar"
                  />
                </Link>

                {/* Description */}
                <p className="footer-tagline">
                  Discover a Sustainable Lifestyle with
                  cutting-edge power systems. Empowering
                  Tamil Nadu with clean, affordable solar
                  energy since 1995.
                </p>

                {/* Social Media */}
                <div className="socials">

                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      className="social-link"
                      aria-label={social.name}
                    >
                      {social.short}
                    </a>
                  ))}

                </div>

                {/* Tambaram Address */}
                <div className="brand-address">

                  <MapPin size={17} />

                  <div>
                    <strong>Tambaram</strong>

                    <p>
                      1, Gandhi Rd, Tambaram West,
                      <br />
                      Tambaram, Chennai – 600045
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                COLUMN 2 - QUICK LINKS
            ================================================= */}

            <div className="footer-col">

              <div className="footer-col-content">

                <h3 className="footer-title">
                  Quick Links
                </h3>

                <ul className="footer-list">

                  {quickLinks.map((link) => (
                    <li key={link.name}>

                      <NavLink
                        to={link.path}
                        className="footer-link"
                      >
                        {link.name}
                      </NavLink>

                    </li>
                  ))}

                </ul>

              </div>

            </div>


            {/* =================================================
                COLUMN 3 - PRODUCTS
            ================================================= */}

            <div className="footer-col">

              <div className="footer-col-content">

                <h3 className="footer-title">
                  Our Products
                </h3>

                <ul className="footer-list">

                  {services.map((service) => (
                    <li key={service}>

                      <Link
                        to="/products"
                        className="footer-link"
                      >
                        {service}
                      </Link>

                    </li>
                  ))}

                </ul>

              </div>

            </div>


            {/* =================================================
                COLUMN 4 - CONTACT
            ================================================= */}

            <div className="footer-col footer-contact">

              <div className="footer-col-content">

                <h3 className="footer-title">
                  Contact Us
                </h3>


                {/* ================= PHONE NUMBERS ================= */}

                <div className="contact-group">

                  {contactNumbers.map((item) => (
                    <a
                      href={item.link}
                      className="contact-item contact-link"
                      key={item.label}
                    >

                      <Phone size={16} />

                      <div>

                        <strong>
                          {item.label}
                        </strong>

                        <span>
                          {item.number}
                        </span>

                      </div>

                    </a>
                  ))}

                </div>


                {/* ================= EMAILS ================= */}

                <div className="contact-group">

                  {emails.map((item) => (
                    <a
                      href={item.link}
                      className="contact-item contact-link"
                      key={item.label}
                    >

                      <Mail size={16} />

                      <div>

                        <strong>
                          {item.label}
                        </strong>

                        <span>
                          {item.email}
                        </span>

                      </div>

                    </a>
                  ))}

                </div>


                {/* ================= WORKING HOURS ================= */}

                <div className="contact-item working-hours">

                  <Clock size={16} />

                  <div>

                    <strong>
                      Working Hours
                    </strong>

                    <span>
                      Mon – Sat: 9:00 AM – 6:00 PM
                    </span>

                    <span>
                      Sunday: Closed
                    </span>

                  </div>

                </div>

              </div>


              {/* ================= QUOTE BUTTON ================= */}

              <Link
                to="/contact"
                className="quote-btn"
              >
                Get a Free Quote
              </Link>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          FOOTER BOTTOM
      ===================================================== */}

      <div className="footer-bottom">

        <div className="container footer-bottom-inner">

          <p>
            © {new Date().getFullYear()} Dynamic Solar.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/sitemap">
              Sitemap
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;