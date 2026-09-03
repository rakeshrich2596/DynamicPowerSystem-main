import { useState, useEffect, useRef } from "react";
import "./MapSection.css";
import chennaiMap from "../../assets/images/chennai-map.png";

/* ── Stats Data ── */
const STATS = [
    { label: "Annual Co2 Mitigated",    end: 2280,     prefix: "",  suffix: " tons" },
    { label: "Annual Customer Savings", end: 20428800, prefix: "₹", suffix: "" },
    { label: "Annual Equivalent Trees", end: 83904,    prefix: "",  suffix: "" },
];

/* ── Counter Hook ── */
function useCounter(end, duration, active) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) { setCount(0); return; }
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [active, end, duration]);
    return count;
}

/* ── Stat Card with Counter ── */
function StatCard({ stat, active }) {
    const count = useCounter(stat.end, 2200, active);
    const formatted = count.toLocaleString("en-US");
    return (
        <div className="map-stat-card">
            <div className="map-stat-card-label">{stat.label}</div>
            <div className="map-stat-card-value">
                {stat.prefix}{formatted}{stat.suffix}
            </div>
        </div>
    );
}

/* ── MapSection Component ── */
function MapSection() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const projectCount = useCounter(500, 2000, visible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="map-section" ref={sectionRef} id="service-area">
            <div className="container">
                {/* Header */}
                <div className={`section-header map-header fade-in-up ${visible ? "visible" : ""}`}>
                    <span className="section-tag">Our Reach</span>
                    <h2 className="section-title">
                        Trusted by families across <span>Chennai</span>
                    </h2>
                </div>

                {/* Content: Map + Stats */}
                <div className="map-content">
                    {/* Left — Map Image */}
                    <div className={`map-image-wrap fade-in-left ${visible ? "visible" : ""}`}>
                        <img
                            src={chennaiMap}
                            alt="Map showing Dynamic Solar installations across Chennai"
                            className="map-image"
                        />
                    </div>

                    {/* Right — Stats */}
                    <div className={`map-stats fade-in-right ${visible ? "visible" : ""}`}>
                        {/* Hero stat */}
                        <div className="map-stat-hero">
                            <div className="map-stat-hero-number">{projectCount}+</div>
                            <div className="map-stat-hero-label">PROJECTS</div>
                            <div className="map-stat-hero-sub">
                                Executed across all over Chennai
                            </div>
                        </div>

                        {/* Metric cards */}
                        {STATS.map((stat, i) => (
                            <StatCard key={i} stat={stat} active={visible} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MapSection;
