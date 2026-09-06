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
    link: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 8H16V4.5h-2.5C10.46 4.5 9 6.02 9 9.12V11H6.5v3.5H9V21h3.5v-6.5H15L15.5 11h-3V9.45c0-1 .28-1.45 1-1.45Z"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    link: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          ry="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    link: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    link: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.2 7.3A2.2 2.2 0 1 0 5.2 3a2.2 2.2 0 0 0 0 4.3ZM3.3 21h3.8V9H3.3v12ZM9.3 9v12H13v-5.9c0-1.55.3-3.05 2.2-3.05 1.87 0 1.9 1.77 1.9 3.17V21H21v-6.55c0-3.22-.7-5.7-4.5-5.7-1.83 0-3.05 1-3.55 1.95h-.05V9H9.3Z"
        />
      </svg>
    ),
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
                      {social.icon}
                    </a>
                  ))}

                </div>

                {/* =================================================
                    SALES / WHATSAPP
                ================================================= */}

                <a
                  href="tel:+917299985357"
                  className="brand-contact-row"
                >
                  <span className="whatsapp-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.4-1.7a12 12 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.1 6.3 6.6 1.9 12.1 1.9c2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.5-4.4 9.9-9.9 9.9Zm5.4-7.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.2-.2-.4-.3-.7-.4Z"
                      />
                    </svg>
                  </span>

                  <span className="brand-contact-text">
                    {/* <small>Sales / WhatsApp</small> */}
                    <strong>+91 72999 85357</strong>
                  </span>
                </a>

                {/* =================================================
                    ENQUIRY EMAIL
                ================================================= */}

                <a
                  href="mailto:Enquiry@dynamicsolar.in"
                  className="brand-contact-row"
                >
                  <Mail size={19} />

                  <span className="brand-contact-text">
                    {/* <small>Enquiry Email</small> */}
                    <strong>Enquiry@dynamicsolar.in</strong>
                  </span>
                </a>

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

                {/* Office Phone */}
                <a
                  href="tel:04442044405"
                  className="contact-row"
                >
                  <Phone size={16} />

                  <span>
                    <small>Office</small>
                    044 42044405
                  </span>
                </a>

                {/* Support */}
                <a
                  href="tel:+919841685357"
                  className="contact-row"
                >
                  <Phone size={16} />

                  <span>
                    <small>Support</small>
                    +91 98416 85357
                  </span>
                </a>

                {/* Admin Email */}
                <a
                  href="mailto:admin@dynamicsolar.in"
                  className="contact-row"
                >
                  <Mail size={16} />

                  <span>
                    <small>Admin</small>
                    admin@dynamicsolar.in
                  </span>
                </a>

                {/* Working Hours */}
                <div className="contact-row working-hours">

                  <Clock size={16} />

                  <span>
                    <small>Working Hours</small>
                    Mon – Sat: 9:00 AM – 7:00 PM
                    <br />
                    Sunday: Closed
                  </span>

                </div>

              </div>


              {/* Quote Button */}

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