import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./ProductCards.css";

import imgPm1 from "../../assets/images/prod-pm1.png";
import imgPm2 from "../../assets/images/prod-pm2.png";
import imgPlant from "../../assets/images/prod-solar-plant.png";
import imgHeater from "../../assets/images/prod-water-heater.png";
import imgHeater2 from "../../assets/images/prod-water-heater-2.png";
import imgPump from "../../assets/images/prod-water-pump.png";
import imgPump1 from "../../assets/images/prod-water-pump1.png";
import imgPump2 from "../../assets/images/prod-water-pump2.png";
import imgStreet from "../../assets/images/prod-street-light.png";
import imgStreet1 from "../../assets/images/prod-street-light1.png";
import imgStreet2 from "../../assets/images/prod-street-light2.png";
import imgUPS1 from "../../assets/images/prod-home-ups1.jpeg";
import imgUPS from "../../assets/images/prod-home-ups.png";
import imgInverter from "../../assets/images/prod-inverter.png";
import imgEastman from "../../assets/images/prod-eastman-inverter.png";
import imgEastmanYellowBattery from "../../assets/images/prod-eastman-yellow-battery.png";
import imgCommercial from "../../assets/images/prod-commercial.jpeg";
import imgVGuardBattery from "../../assets/images/prod-vguard-battery.png";

const products = [
  // =====================================================
  // 1. PM SURYA GHAR
  // =====================================================
  {
    id: 1,
    tag: "Government Scheme",
    title: "PM Surya Ghar Yojana",
    desc: "A rooftop solar initiative that helps eligible households adopt solar power and reduce their electricity expenses with government financial assistance.",
    points: [
      "Government support for eligible residential households",
      "Rooftop solar installation for homes",
      "Subsidy assistance and application guidance",
      "Loan and financing assistance available",
    ],
    imgs: [imgPm1, imgPm2],
    bg: "#0b1f3a",
    accent: "#f47b20",
  },

  // =====================================================
  // 2. SOLAR POWER PLANT
  // =====================================================
  {
    id: 2,
    tag: "Most Popular",
    title: "Solar Power Plant",
    desc: "Generate your own clean electricity with grid-tied or off-grid rooftop solar power plants. Ideal for homes, institutions, industries, and farmhouses.",
    points: [
      "On-Grid, Off-Grid & Hybrid systems",
      "Customized for residential, commercial, industrial & agricultural use",
      "High-quality systems with long life and minimal maintenance",
      "25+ years of engineering & construction expertise",
    ],
    img: imgPlant,
    bg: "#0f172a",
    accent: "#f47b20",
  },

  // =====================================================
  // 3. SOLAR WATER HEATER
  // =====================================================
  {
    id: 3,
    tag: "Eco-Friendly",
    title: "Solar Water Heater",
    desc: "Replace conventional geysers with high-efficiency flat-plate and evacuated tube solar water heating systems. Perfect for homes, hostels, hospitals, and industries that need reliable hot water throughout the year.",
    points: [
      "Flat-plate & evacuated tube collectors",
      "Zero electricity cost for water heating",
      "BIS-certified systems",
      "Available in 100 LPD – 5000 LPD capacities",
    ],
    imgs: [imgHeater, imgHeater2],
    bg: "#1a0833",
    accent: "#f47b20",
    fit: "contain",
    imgBg: "#ffffff",
  },

  // =====================================================
  // 4. SOLAR WATER PUMPING SYSTEMS
  // =====================================================
  {
    id: 4,
    tag: "Agriculture",
    title: "Solar Water Pumping Systems",
    desc: "Autonomous solar-powered water pumps for irrigation, drinking water supply, and agriculture. Eliminate diesel generator costs and pump water reliably even in remote off-grid locations.",
    points: [
      "DC & AC solar pump systems",
      "Submersible & surface pump options",
      "No fuel cost, fully autonomous operation",
      "PM-KUSUM scheme eligible",
    ],
    imgs: [imgPump, imgPump1, imgPump2],
    bg: "#0f2027",
    accent: "#f47b20",
  },

  // =====================================================
  // 5. SOLAR STREET LIGHTS
  // =====================================================
  {
    id: 5,
    tag: "Infrastructure",
    title: "Solar Street Lights",
    desc: "Autonomous solar street lighting solutions for roads, residential colonies, parks, and industrial campuses. Motion-sensor enabled, dusk-to-dawn operation with zero electricity bills.",
    points: [
      "All-in-one & split-type models",
      "Motion sensor & dusk-to-dawn control",
      "High-lumen LED with LiFePO4 battery",
      "Ideal for roads, colonies & campuses",
    ],
    imgs: [imgStreet, imgStreet1, imgStreet2],
    bg: "#0a1628",
    accent: "#f47b20",
  },

  // =====================================================
  // 6. SOLAR HOME UPS
  // =====================================================
  {
    id: 6,
    tag: "Backup Power",
    title: "Solar Home UPS",
    desc: "Integrated solar-plus-battery home UPS systems that keep your home powered 24/7 using solar energy during the day and battery backup at night. The smartest way to handle power cuts.",
    points: [
      "MPPT & PWM charge controller options",
      "Works with existing solar panels",
      "Pure sine wave output for all appliances",
      "Scalable battery bank capacity",
    ],
    imgs: [imgUPS, imgUPS1,imgEastmanYellowBattery, imgVGuardBattery],
    bg: "#150a2e",
    accent: "#f47b20",
    fit: "contain",
    imgBg: "#ffffff",
  },

  // =====================================================
  // 7. INVERTER & BATTERY SYSTEMS
  // =====================================================
  {
    id: 7,
    tag: "Commercial Power Backup",
    title: "Solar Commercial UPS",
    desc: "Reliable solar-powered UPS solutions designed for shops, offices, institutions, and commercial spaces, providing efficient backup power and better energy management.",
    points: [
      "Solar-compatible UPS systems for commercial applications",
      "Reliable backup for offices, shops & institutions",
      "Pure sine wave output for sensitive equipment",
      "Scalable battery capacity for different power needs",
    ],
    imgs: [imgCommercial],
    bg: "#0d1117",
    accent: "#f47b20",
    fit: "contain",
    imgBg: "#ffffff",
  },
];

// =====================================================
// IMAGE SLIDER
// =====================================================

function ImageSlider({ imgs, title, fit, imgBg }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef(null);

  const startSliding = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % imgs.length);
    }, 1200);
  };

  const stopSliding = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleNextImage = () => {
    setActiveIdx((prev) => (prev + 1) % imgs.length);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div
      className="pc-slider"
      onMouseEnter={startSliding}
      onMouseLeave={stopSliding}
      onClick={handleNextImage}
      title="Click to change image"
    >
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} ${i + 1}`}
          className={`pc-slider-img${
            i === activeIdx ? " pc-slider-img--active" : ""
          }`}
          style={{
            objectFit: fit || "cover",
            backgroundColor: imgBg || "transparent",
            padding: fit === "contain" ? "20px" : "0",
          }}
        />
      ))}

      {/* Dot indicators */}
      <div className="pc-slider-dots">
        {imgs.map((_, i) => (
          <button
            key={i}
            className={`pc-slider-dot${
              i === activeIdx ? " pc-slider-dot--active" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();

              setActiveIdx(i);
            }}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// =====================================================
// PRODUCT CARDS COMPONENT
// =====================================================

function ProductCards() {
  return (
    <section className="pc-section">
      {/* Heading above the sticky cards */}
      <div className="pc-heading-wrap container">
        <span className="section-tag">Our Products</span>

        <h2 className="section-title pc-main-title">
          Complete <span>Solar Solutions</span>
        </h2>

        <p className="section-subtitle pc-subtitle">
          On-Grid and Off-Grid Solar Systems, Inverters, Batteries, and Solar
          Water Heaters — tailored for individuals, institutions, industries,
          and farmhouses.
        </p>
      </div>

      {/* Sticky stacking cards */}
      <div className="pc-cards-container">
        {products.map((p, i) => (
          <div
            className="pc-card"
            key={p.id}
            style={{
              top: `${80 + i * 20}px`,
              background: p.bg,
              "--accent": p.accent,
              zIndex: i + 1,
            }}
          >
            <div className="pc-card-inner container">
              {/* =================================
                                LEFT: CONTENT
                            ================================= */}

              <div className="pc-content">
                <div className="pc-top-row">
                  <span className="pc-num">
                    {String(p.id).padStart(2, "0")}
                  </span>

                  <span className="pc-tag">{p.tag}</span>
                </div>

                <h3 className="pc-title">{p.title}</h3>

                <p className="pc-desc">{p.desc}</p>

                <ul className="pc-points">
                  {p.points.map((pt, j) => (
                    <li key={j}>
                      <span className="pc-arrow">→</span>

                      {pt}
                    </li>
                  ))}
                </ul>

                {/* CTA BUTTONS */}
                <div className="pc-cta-row">
                  <Link to="/contact" className="pc-cta pc-cta--quote">
                    Get a Quote
                  </Link>

                  <a
                    href="https://wa.me/919841582874"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-cta pc-cta--whatsapp"
                    aria-label="Chat on WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="15"
                      height="15"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.816 5.816 0 0 0-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>

                  <a
                    href="tel:+919841582874"
                    className="pc-cta pc-cta--call"
                    aria-label="Call us now"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="15"
                      height="15"
                      aria-hidden="true"
                    >
                      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55-.45-1-1-1h-3.5c-.55 0-1 .45-1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79Z" />
                    </svg>
                    Call
                  </a>
                </div>
              </div>

              {/* =================================
                                RIGHT: IMAGE
                            ================================= */}

              <div
                className="pc-img-wrap"
                style={{
                  backgroundColor: p.imgBg || "transparent",
                }}
              >
                {p.imgs ? (
                  <ImageSlider
                    imgs={p.imgs}
                    title={p.title}
                    fit={p.fit}
                    imgBg={p.imgBg}
                  />
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    className="pc-img"
                    style={{
                      objectFit: p.fit || "cover",
                      padding: p.fit === "contain" ? "20px" : "0",
                    }}
                  />
                )}

                <div className="pc-img-badge">{p.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer so cards unstick after section */}
      <div className="pc-spacer" />
    </section>
  );
}

export default ProductCards;
