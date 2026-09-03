import { useEffect, useRef } from "react";
import { DollarSign, Leaf, Settings, Home, Landmark, Timer } from "lucide-react";
import "./SolarBenefits.css";

const benefits = [
    { Icon: DollarSign, title: "Save Up to 90% on Bills",  desc: "Dramatically reduce your monthly electricity expenses and protect yourself from rising tariffs.", color: "#fff7ed" },
    { Icon: Leaf,       title: "100% Eco-Friendly",        desc: "Zero emissions, zero noise. Solar energy helps reduce your carbon footprint for a greener planet.", color: "#f0fdf4" },
    { Icon: Settings,   title: "Minimal Maintenance",      desc: "Solar panels have no moving parts. A simple annual cleaning is all it takes to maintain peak output.", color: "#eff6ff" },
    { Icon: Home,       title: "Energy Independence",      desc: "Generate your own electricity and free yourself from grid dependency and power outages.", color: "#faf5ff" },
    { Icon: Landmark,   title: "Government Subsidies",     desc: "Avail attractive MNRE subsidies and tax benefits. We handle all the documentation for you.", color: "#fff1f2" },
    { Icon: Timer,      title: "25+ Year Lifespan",        desc: "Premium solar panels come with 25-year performance warranties, delivering decades of clean energy.", color: "#f0fdfa" },
];

function SolarBenefits() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }
            }),
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="solar-benefits" ref={ref}>
            <div className="container">
                <div className="section-header fade-in-up">
                    <span className="section-tag">Benefits</span>
                    <h2 className="section-title">
                        Why Solar Energy is the <span>Smart Choice</span>
                    </h2>
                    <p className="section-subtitle">
                        Going solar isn't just an investment in energy — it's an investment in your future,
                        your finances, and our planet.
                    </p>
                </div>
                <div className="sb-grid">
                    {benefits.map((b, i) => (
                        <div
                            className={`sb-card fade-in-up delay-${(i % 3) + 1} hover-glow`}
                            key={i}
                            style={{ "--card-bg": b.color }}
                        >
                            <div className="sb-icon-wrap">
                                <b.Icon size={26} strokeWidth={1.5} />
                            </div>
                            <h3 className="sb-title">{b.title}</h3>
                            <p className="sb-desc">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SolarBenefits;
