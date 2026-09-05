import { useState, useEffect, useRef } from "react";
import "./MapSection.css";
import tamilnaduMap from "../../assets/images/tamilnadu-map-orange.png";

/* ─────────────────────────────────────────
   STATS DATA
───────────────────────────────────────── */

const STATS = [
    {
        label: "Annual Co2 Mitigated",
        end: 2280,
        prefix: "",
        suffix: " tons",
        icon: "leaf",
    },
    {
        label: "Annual Customer Savings",
        end: 20428800,
        prefix: "₹",
        suffix: "",
        icon: "rupee",
    },
    {
        label: "Annual Equivalent Trees",
        end: 83904,
        prefix: "",
        suffix: "",
        icon: "tree",
    },
];

/* ─────────────────────────────────────────
   MAP PINS
   IMPORTANT:
   These percentages are relative ONLY
   to the Tamil Nadu map image.
───────────────────────────────────────── */

const MAP_PINS = [
    /* ───── CHENNAI — EXTRA DENSITY ───── */

    { name: "Chennai", x: 87.5, y: 9.5, major: true },
    { name: "Chennai", x: 84.5, y: 11.5 },
    { name: "Chennai", x: 89.5, y: 12.5 },
    { name: "Chennai", x: 82.5, y: 14.0 },
    { name: "Chennai", x: 87.0, y: 15.0 },
    { name: "Chennai", x: 91.0, y: 16.0 },
    { name: "Chennai", x: 84.0, y: 17.5 },
    { name: "Chennai", x: 88.0, y: 18.5 },
    { name: "Chennai", x: 92.0, y: 19.5 },
    { name: "Chennai", x: 86.0, y: 21.0 },
    { name: "Chennai", x: 90.0, y: 22.0 },

    /* ───── NORTH ───── */

    { name: "Tiruvallur", x: 76.0, y: 13.5, major: true },
    { name: "Tiruvallur", x: 73.0, y: 17.0 },
    { name: "Tiruvallur", x: 78.0, y: 19.0 },

    { name: "Kanchipuram", x: 70.0, y: 25.0, major: true },
    { name: "Kanchipuram", x: 67.0, y: 28.0 },
    { name: "Kanchipuram", x: 73.0, y: 30.0 },

    { name: "Vellore", x: 57.0, y: 20.5, major: true },
    { name: "Vellore", x: 61.0, y: 24.0 },
    { name: "Ranipet", x: 65.0, y: 23.0 },

    { name: "Tirupattur", x: 53.0, y: 29.0 },
    { name: "Tiruvannamalai", x: 61.0, y: 35.0 },

    { name: "Krishnagiri", x: 45.0, y: 25.0 },
    { name: "Hosur", x: 39.0, y: 29.0 },
    { name: "Dharmapuri", x: 47.0, y: 35.0 },

    /* ───── WEST ───── */

    { name: "Salem", x: 45.0, y: 43.0, major: true },
    { name: "Salem", x: 50.0, y: 46.0 },
    { name: "Salem", x: 42.0, y: 48.0 },

    { name: "Erode", x: 34.0, y: 46.0, major: true },
    { name: "Erode", x: 38.0, y: 50.0 },

    { name: "Tiruppur", x: 32.0, y: 53.0, major: true },
    { name: "Tiruppur", x: 36.0, y: 56.0 },

    { name: "Coimbatore", x: 23.0, y: 51.0, major: true },
    { name: "Coimbatore", x: 27.0, y: 55.0 },
    { name: "Coimbatore", x: 30.0, y: 58.0 },

    { name: "Ooty", x: 23.0, y: 43.0 },

    /* ───── CENTRAL ───── */

    { name: "Namakkal", x: 43.0, y: 51.0 },
    { name: "Karur", x: 42.0, y: 58.0 },

    { name: "Trichy", x: 51.0, y: 62.0, major: true },
    { name: "Trichy", x: 47.0, y: 65.0 },
    { name: "Trichy", x: 54.0, y: 66.0 },

    { name: "Perambalur", x: 55.0, y: 55.0 },
    { name: "Ariyalur", x: 59.0, y: 58.0 },

    /* ───── EAST / DELTA ───── */

    { name: "Cuddalore", x: 69.0, y: 50.0, major: true },
    { name: "Cuddalore", x: 67.0, y: 54.0 },

    { name: "Chidambaram", x: 69.0, y: 58.0 },

    { name: "Thanjavur", x: 62.0, y: 66.0, major: true },
    { name: "Thanjavur", x: 65.0, y: 69.0 },

    { name: "Kumbakonam", x: 68.0, y: 64.0 },
    // { name: "Mayiladuthurai", x: 73.0, y: 63.0 },

    // { name: "Nagapattinam", x: 75.0, y: 69.0 },
    { name: "Puducherry", x: 74.0, y: 56.0 },

    /* ───── SOUTH ───── */

    { name: "Dindigul", x: 43.0, y: 67.0 },

    { name: "Madurai", x: 47.0, y: 73.0, major: true },
    { name: "Madurai", x: 43.0, y: 76.0 },
    { name: "Madurai", x: 51.0, y: 77.0 },

    { name: "Sivagangai", x: 57.0, y: 75.0 },

    // { name: "Ramanathapuram", x: 68.0, y: 78.0 },

    { name: "Virudhunagar", x: 43.0, y: 82.0 },

    { name: "Tenkasi", x: 36.0, y: 87.0 },

    // { name: "Thoothukudi", x: 59.0, y: 88.0, major: true },
    // { name: "Thoothukudi", x: 63.0, y: 91.0 },

    // { name: "Tirunelveli", x: 49.0, y: 91.0, major: true },
    // { name: "Tirunelveli", x: 45.0, y: 94.0 },

    // { name: "Nagercoil", x: 43.0, y: 97.0 },
];

/* ─────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────── */

function useCounter(end, duration, active) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) {
            setCount(0);
            return;
        }

        let start = 0;

        const step = end / (duration / 16);

        const timer = setInterval(() => {
            start += step;

            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [active, end, duration]);

    return count;
}

/* ─────────────────────────────────────────
   MAP PIN
───────────────────────────────────────── */

function MapPin({ pin, index }) {
    return (
        <div
            className={`map-pin ${
                pin.major ? "map-pin-major" : ""
            }`}
            style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                animationDelay: `${(index % 8) * 0.18}s`,
            }}
            title={pin.name}
        >
            <span className="map-pin-pulse"></span>

            <span className="map-pin-icon">
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2.5C7.9 2.5 4.6 5.7 4.6 9.7c0 5.2 7.4 11.8 7.4 11.8s7.4-6.6 7.4-11.8C19.4 5.7 16.1 2.5 12 2.5Z"
                        fill="#f47b20"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                    />

                    <circle
                        cx="12"
                        cy="9.6"
                        r="2.7"
                        fill="#ffffff"
                    />
                </svg>
            </span>
        </div>
    );
}

/* ─────────────────────────────────────────
   CITY LABEL
───────────────────────────────────────── */

const CITY_LABELS = [
    {
        name: "Vellore",
        side: "left",
        top: "21%",
        
    },
    {
        name: "Tiruvallur",
        side: "left",
        top: "29%",
    },
    {
        name: "Kanchipuram",
        side: "left",
        top: "37%",
    },
    {
        name: "Salem",
        side: "left",
        top: "48%",
    },
    {
        name: "Coimbatore",
        side: "left",
        top: "57%",
    },
    {
        name: "Madurai",
        side: "left",
        top: "76%",
    },
    {
        name: "Tirunelveli",
        side: "left",
        top: "91%",
    },

    {
        name: "Chennai",
        side: "right",
        top: "13%",
    },
    {
        name: "Cuddalore",
        side: "right",
        top: "50%",
    },
    {
        name: "Trichy",
        side: "right",
        top: "63%",
    },
    {
        name: "Thanjavur",
        side: "right",
        top: "70%",
    },
    {
        name: "Thoothukudi",
        side: "right",
        top: "88%",
    },
];

/* ─────────────────────────────────────────
   CITY LABEL COMPONENT
───────────────────────────────────────── */

function CityLabel({ city }) {
    return (
        <div
            className={`city-label city-label-${city.side}`}
            style={{ top: city.top }}
        >
            {city.side === "right" && (
                <span className="city-label-line">
                    <span className="city-label-dot"></span>
                </span>
            )}

            <span className="city-label-box">
                {city.name}
            </span>

            {city.side === "left" && (
                <span className="city-label-line">
                    <span className="city-label-dot"></span>
                </span>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────
   TAMIL NADU MAP
───────────────────────────────────────── */

function TamilNaduMap() {
    return (
        <div className="map-visual">

            {/* City labels are outside the image but
                positioned relative to the map visual */}
            <div className="city-labels-layer">
                {CITY_LABELS.map((city, index) => (
                    <CityLabel
                        city={city}
                        key={`${city.name}-${index}`}
                    />
                ))}
            </div>

            {/* EXACT MAP STAGE */}
            <div className="map-image-stage">

                <img
                    src={tamilnaduMap}
                    alt="Tamil Nadu solar installation map"
                    className="map-image"
                />

                {/* Pins are clipped to map image area */}
                <div className="map-pin-layer">
                    {MAP_PINS.map((pin, index) => (
                        <MapPin
                            key={`${pin.name}-${index}`}
                            pin={pin}
                            index={index}
                        />
                    ))}
                </div>

                {/* Chennai highlight */}
                <div
                    className="chennai-highlight"
                    style={{
                        left: "87.5%",
                        top: "9.5%",
                    }}
                >
                    <span className="chennai-ring"></span>
                </div>
            </div>

            {/* Legend */}
            <div className="map-legend">
                <div className="legend-row">
                    <span className="legend-pin major"></span>
                    <span>Major installations</span>
                </div>

                <div className="legend-row">
                    <span className="legend-pin normal"></span>
                    <span>Solar projects</span>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */

function StatCard({ stat, active }) {
    const count = useCounter(
        stat.end,
        2200,
        active
    );

    const formatted =
        count.toLocaleString("en-US");

    return (
        <div className="map-stat-card">

            <div className="map-stat-icon">

                {stat.icon === "leaf" && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.5 4.5C12.5 4.8 6 7.5 5 13.5c-.5 3 1.5 5 4.5 5 6 0 9-6.5 10-14Z"
                            fill="currentColor"
                        />
                        <path
                            d="M5 20c2.5-4 5-6.5 9-8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                )}

                {stat.icon === "rupee" && (
                    <span className="rupee-icon">
                        ₹
                    </span>
                )}

                {stat.icon === "tree" && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2 7.5 8h2L5 14h3l-3 5h6v3h2v-3h6l-3-5h3l-4.5-6h2L12 2Z" />
                    </svg>
                )}

            </div>

            <div className="map-stat-content">

                <div className="map-stat-card-label">
                    {stat.label}
                </div>

                <div className="map-stat-card-value">
                    {stat.prefix}
                    {formatted}
                    {stat.suffix}
                </div>

            </div>

        </div>
    );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

function MapSection() {

    const sectionRef = useRef(null);

    const [visible, setVisible] =
        useState(false);

    const projectCount = useCounter(
        1500,
        2000,
        visible
    );

    useEffect(() => {

        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (entry.isIntersecting) {
                        setVisible(true);
                    }

                },
                {
                    threshold: 0.12,
                }
            );

        if (sectionRef.current) {
            observer.observe(
                sectionRef.current
            );
        }

        return () => {
            observer.disconnect();
        };

    }, []);

    return (
        <section
            className="map-section"
            ref={sectionRef}
            id="service-area"
        >

            <div className="container">

                {/* HEADER */}

                <div
                    className={`section-header map-header fade-in-up ${
                        visible
                            ? "visible"
                            : ""
                    }`}
                >

                    <span className="section-tag">
                        Our Reach
                    </span>

                    <h2 className="section-title">
                        Trusted by families across{" "}
                        <span>Tamilnadu</span>
                    </h2>

                </div>

                {/* MAIN CONTENT */}

                <div className="map-content">

                    {/* LEFT MAP */}

                    <div
                        className={`map-image-wrap fade-in-left ${
                            visible
                                ? "visible"
                                : ""
                        }`}
                    >
                        <TamilNaduMap />
                    </div>

                    {/* RIGHT STATS */}

                    <div
                        className={`map-stats fade-in-right ${
                            visible
                                ? "visible"
                                : ""
                        }`}
                    >

                        {/* HERO CARD */}

                        <div className="map-stat-hero">

                            <div className="hero-top">

                                <div className="hero-star">
                                    ✦
                                </div>

                                <span>
                                    Our Solar Impact
                                </span>

                            </div>

                            <div className="map-stat-hero-number">
                                {projectCount}+
                            </div>

                            <div className="map-stat-hero-label">
                                PROJECTS
                            </div>

                            <div className="map-stat-hero-sub">
                                Executed across Tamil Nadu
                            </div>

                        </div>

                        {/* STAT CARDS */}

                        {STATS.map(
                            (stat, index) => (
                                <StatCard
                                    key={index}
                                    stat={stat}
                                    active={visible}
                                />
                            )
                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default MapSection;