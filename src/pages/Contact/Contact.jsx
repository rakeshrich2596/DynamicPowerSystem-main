import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Contact.css";

/* =========================================================
   ADDRESS DETAILS
========================================================= */

const addresses = [
  {
    Icon: MapPin,
    label: "Address 1",
    value:
      "Gandhi Rd, Tambaram West,\nTambaram, Chennai – 600045",
  },
  {
    Icon: MapPin,
    label: "Address 2",
    value:
      "No.20 Priya Nagar, Amin Road,\nUrapakkam, Chennai – 603210",
  },
  {
    Icon: MapPin,
    label: "Address 3",
    value:
      "Pallikkoodathan St,\nKanchipuram, Tamilnadu – 631501",
  },
];

/* =========================================================
   CONTACT DETAILS
========================================================= */

const contactInfo = [
  {
    Icon: Phone,
    label: "Sales",
    value: "+91 72999 85357",
    link: "tel:+917299985357",
  },
  {
    Icon: Phone,
    label: "Support",
    value: "+91 98416 85357",
    link: "tel:+919841685357",
  },
  {
    Icon: Phone,
    label: "Enquiry",
    value: "+91 90030 85357",
    link: "tel:+919003085357",
  },
  {
    Icon: Mail,
    label: "Admin",
    value: "admin@dynamicsolar.in",
    link: "mailto:admin@dynamicsolar.in",
  },
  {
    Icon: Mail,
    label: "Enquiry Email",
    value: "enquiry@dynamicsolar.in",
    link: "mailto:enquiry@dynamicsolar.in",
  },
  {
    Icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed",
    link: null,
  },
];

/* =========================================================
   SERVICES
========================================================= */

const services = [
  "Solar Power Plant",
  "Solar Water Heater",
  "Solar Water Pumping",
  "Solar Street Lights",
  "Solar Home UPS",
  "Inverter & Battery",
  "Online UPS",
  "RO Systems",
  "General Inquiry",
];

/* =========================================================
   WHATSAPP
========================================================= */

const WHATSAPP_NUMBER = "919841582874";

/* =========================================================
   ANIMATION SECTION
========================================================= */

function AnimSection({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(
                ".fade-in-up, .fade-in-left, .fade-in-right, .scale-up"
              )
              .forEach((el) => {
                el.classList.add("visible");
              });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* =========================================================
   CONTACT COMPONENT
========================================================= */

function Contact() {
  const [heroRef, heroInView] = useInView();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    budget: "",
    ebNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = "Name is required";
    }

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Valid email required";
    }

    if (
      !form.phone.trim() ||
      !/^\+?[\d\s\-()]{8,15}$/.test(form.phone)
    ) {
      e.phone = "Valid phone number required";
    }

    if (!form.service) {
      e.service = "Please select a service";
    }

    if (!form.message.trim() || form.message.length < 20) {
      e.message = "Message must be at least 20 characters";
    }

    return e;
  };

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message =
      `📋 *New Inquiry – Dynamic Solar*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `🔧 *Service:* ${form.service}\n` +
      (form.budget
        ? `💰 *Budget:* ${form.budget}\n`
        : "") +
      (form.ebNumber
        ? `🔢 *EB Number:* ${form.ebNumber}\n`
        : "") +
      `\n💬 *Message:*\n${form.message}`;

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);
  };

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setSubmitted(false);

    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      budget: "",
      ebNumber: "",
    });

    setErrors({});
  };

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <>
      <Navbar />

      {/* ===================================================
          HERO
      =================================================== */}

      <div
        ref={heroRef}
        className={`page-hero contact-hero ${
          heroInView ? "animate-typing" : ""
        }`}
      >
        <div className="page-hero-overlay"></div>

        <div className="container page-hero-content">
          <span className="page-hero-tag">
            Get In Touch
          </span>

          <h1 className="page-hero-title">
            Contact Dynamic Solar
          </h1>

          <p className="page-hero-sub">
            Ready to go solar? Our experts are here to
            help you every step of the way.
          </p>

          <nav
            className="breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>

            <span>›</span>

            <span>Contact</span>
          </nav>
        </div>
      </div>

      {/* ===================================================
          CONTACT SECTION
      =================================================== */}

      <section className="contact-section">

        {/* =================================================
            CENTER INTRO
        ================================================= */}

        <div className="container contact-intro">

          <span className="section-tag">
            Reach Us
          </span>

          <h2 className="contact-info-heading">
            Let's Build Your{" "}
            <span>Solar Future</span>{" "}
            Together
          </h2>

          <p className="contact-info-body">
            Whether you're exploring solar for the
            first time or looking to expand an existing
            system, our certified solar consultants are
            ready to assist with a free assessment and
            personalised quote.
          </p>

        </div>

        {/* =================================================
            ADDRESS SECTION
        ================================================= */}

        <div className="contact-address-section">

          <div className="container contact-address-grid">

            {addresses.map((address) => {
              const Icon = address.Icon;

              return (
                <div
                  className="contact-address-card"
                  key={address.label}
                >

                  <div className="contact-card-icon">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="contact-address-content">

                    <div className="contact-card-label">
                      {address.label}
                    </div>

                    <p className="contact-card-value">
                      {address.value
                        .split("\n")
                        .map((line, index) => (
                          <span key={index}>
                            {line}

                            {index <
                              address.value.split("\n").length -
                                1 && <br />}
                          </span>
                        ))}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* =================================================
            CONTACT DETAILS + FORM
        ================================================= */}

        <div className="container contact-main-grid">

          {/* ===============================================
              LEFT SIDE
          =============================================== */}

          <AnimSection className="contact-details-column">

            <div className="contact-cards">

              {contactInfo.map((contact) => {
                const Icon = contact.Icon;

                return (
                  <div
                    className="contact-card"
                    key={contact.label}
                  >

                    <div className="contact-card-icon">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>

                      <div className="contact-card-label">
                        {contact.label}
                      </div>

                      {contact.link ? (
                        <a
                          href={contact.link}
                          className="contact-card-value contact-card-link"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="contact-card-value">
                          {contact.value
                            .split("\n")
                            .map((line, index) => (
                              <span key={index}>
                                {line}

                                {index <
                                  contact.value.split("\n").length -
                                    1 && <br />}
                              </span>
                            ))}
                        </p>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

            {/* =============================================
                SOCIAL MEDIA
            ============================================= */}

            <div className="contact-social">

              <span className="contact-social-label">
                Follow Us
              </span>

              {[
                "Facebook",
                "Instagram",
                "YouTube",
                "LinkedIn",
              ].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="contact-social-btn"
                  aria-label={social}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social[0]}
                </a>
              ))}

            </div>

          </AnimSection>

          {/* ===============================================
              RIGHT SIDE - FORM
          =============================================== */}

          <AnimSection className="contact-form-panel">

            {submitted ? (

              <div className="contact-success">

                <div className="success-icon">
                  ✅
                </div>

                <h3>
                  Thank You!
                </h3>

                <p>
                  Your inquiry has been received.
                  A Dynamic Solar consultant will
                  contact you within 24 hours to
                  schedule your free site assessment.
                </p>

                <button
                  className="btn-primary"
                  onClick={resetForm}
                >
                  Submit Another Inquiry
                </button>

              </div>

            ) : (

              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >

                {/* FORM HEADER */}

                <div className="form-header">

                  <h3 className="form-title">
                    Request a Free Quote
                  </h3>

                  <p className="form-subtitle">
                    Fill in the details below and
                    we'll get back to you within
                    24 hours.
                  </p>

                </div>

                {/* NAME + EMAIL */}

                <div className="form-row">

                  <div
                    className={`form-group ${
                      errors.name
                        ? "form-group--error"
                        : ""
                    }`}
                  >

                    <label htmlFor="contact-name">
                      Full Name *
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="e.g. Rajesh Kumar"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />

                    {errors.name && (
                      <span className="form-error">
                        {errors.name}
                      </span>
                    )}

                  </div>

                  <div
                    className={`form-group ${
                      errors.email
                        ? "form-group--error"
                        : ""
                    }`}
                  >

                    <label htmlFor="contact-email">
                      Email Address *
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />

                    {errors.email && (
                      <span className="form-error">
                        {errors.email}
                      </span>
                    )}

                  </div>

                </div>

                {/* PHONE + SERVICE */}

                <div className="form-row">

                  <div
                    className={`form-group ${
                      errors.phone
                        ? "form-group--error"
                        : ""
                    }`}
                  >

                    <label htmlFor="contact-phone">
                      Phone Number *
                    </label>

                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />

                    {errors.phone && (
                      <span className="form-error">
                        {errors.phone}
                      </span>
                    )}

                  </div>

                  <div
                    className={`form-group ${
                      errors.service
                        ? "form-group--error"
                        : ""
                    }`}
                  >

                    <label htmlFor="contact-service">
                      Service Required *
                    </label>

                    <select
                      id="contact-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select a service…
                      </option>

                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}

                    </select>

                    {errors.service && (
                      <span className="form-error">
                        {errors.service}
                      </span>
                    )}

                  </div>

                </div>

                {/* BUDGET */}

                <div className="form-group">

                  <label htmlFor="contact-budget">
                    Approximate Budget (Optional)
                  </label>

                  <select
                    id="contact-budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select a budget range…
                    </option>

                    <option value="Under ₹1 Lakh">
                      Under ₹1 Lakh
                    </option>

                    <option value="₹1 – ₹3 Lakhs">
                      ₹1 – ₹3 Lakhs
                    </option>

                    <option value="₹3 – ₹10 Lakhs">
                      ₹3 – ₹10 Lakhs
                    </option>

                    <option value="₹10 – ₹50 Lakhs">
                      ₹10 – ₹50 Lakhs
                    </option>

                    <option value="Above ₹50 Lakhs">
                      Above ₹50 Lakhs
                    </option>

                  </select>

                </div>

                {/* EB NUMBER */}

                <div className="form-group">

                  <label htmlFor="contact-ebNumber">
                    EB Number (Optional)
                  </label>

                  <input
                    id="contact-ebNumber"
                    type="text"
                    name="ebNumber"
                    placeholder="Enter your EB number"
                    value={form.ebNumber}
                    onChange={handleChange}
                  />

                </div>

                {/* MESSAGE */}

                <div
                  className={`form-group ${
                    errors.message
                      ? "form-group--error"
                      : ""
                  }`}
                >

                  <label htmlFor="contact-message">
                    Your Message *
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your property, electricity consumption, or any specific requirements…"
                    value={form.message}
                    onChange={handleChange}
                  />

                  {errors.message && (
                    <span className="form-error">
                      {errors.message}
                    </span>
                  )}

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="btn-primary form-submit"
                >
                  📲 Send via WhatsApp
                </button>

                <p className="form-note">
                  💬 Clicking Send will open WhatsApp
                  with your details pre-filled so
                  our team can respond instantly.
                </p>

              </form>

            )}

          </AnimSection>

        </div>

      </section>

      {/* ===================================================
          MAP
      =================================================== */}

      <div className="contact-map-placeholder">

        <div className="map-overlay-text">

          <span>📍</span>

          <strong>
            Gandhi Rd, Tambaram West, Chennai
          </strong>

          <a
            href="https://wa.me/919841582874"
            target="_blank"
            rel="noopener noreferrer"
            className="map-directions-btn"
          >
            Get Directions →
          </a>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Contact;