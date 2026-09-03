import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./BlogPreview.css";

const posts = [
    {
        tag: "Solar Tips",
        date: "March 14, 2025",
        title: "Top 5 Benefits of Installing Solar Panels in Tamil Nadu",
        excerpt:
            "Tamil Nadu's abundant sunshine and progressive net metering policy make it one of India's best states for solar adoption. Discover why now is the perfect time to go solar.",
        readTime: "5 min read",
        color: "#fff7ed",
        accent: "#FF6B1A",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    },
    {
        tag: "Policy & Subsidies",
        date: "February 28, 2025",
        title: "How Government Subsidies Make Solar Affordable in 2025",
        excerpt:
            "MNRE's latest subsidy structure can cover up to 40% of your solar installation cost. We break down exactly how to claim your entitlements with zero paperwork hassle.",
        readTime: "6 min read",
        color: "#eff6ff",
        accent: "#0284C7",
        image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=600&q=80",
    },
    {
        tag: "Product Guide",
        date: "January 19, 2025",
        title: "Solar Water Heaters vs Traditional Geysers: A Full Comparison",
        excerpt:
            "Traditional electric geysers account for up to 25% of household electricity consumption. Learn how a solar water heater pays for itself within 18–24 months.",
        readTime: "7 min read",
        color: "#f0fdf4",
        accent: "#16A34A",
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80",
    },
];

// --- Typewriter hook ---
function useTypewriter(fullText, speed = 48, active) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    const timer = useRef(null);

    useEffect(() => {
        if (!active) { setDisplayed(""); setDone(false); return; }
        let i = 0;
        setDisplayed(""); setDone(false);
        timer.current = setInterval(() => {
            i++;
            setDisplayed(fullText.slice(0, i));
            if (i >= fullText.length) { clearInterval(timer.current); setDone(true); }
        }, speed);
        return () => clearInterval(timer.current);
    }, [active, fullText, speed]);

    return { displayed, done };
}

const PLAIN = "Solar Knowledge ";
const HIGHLIGHTED = "Hub";
const FULL = PLAIN + HIGHLIGHTED;

function TypewriterHeading({ active }) {
    const { displayed, done } = useTypewriter(FULL, 55, active);
    const plain = displayed.slice(0, Math.min(displayed.length, PLAIN.length));
    const span  = displayed.length > PLAIN.length ? displayed.slice(PLAIN.length) : "";

    return (
        <h2 className="section-title bp-typewriter-heading">
            {plain}
            {span && <span>{span}</span>}
            {!done && <span className="bp-cursor">|</span>}
        </h2>
    );
}

function BlogPreview() {
    const sectionRef = useRef(null);
    const headerRef  = useRef(null);
    const cardRefs   = useRef([]);

    const [typeActive, setTypeActive] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        // Typewriter observer for the heading
        const headingObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setTypeActive(true);
                else setTypeActive(false);
            },
            { threshold: 0.1 }
        );

        // Individual card observers for staggered entrance
        const cardObservers = cardRefs.current.map((card, i) => {
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleCards(prev => prev.includes(i) ? prev : [...prev, i]);
                    }
                },
                { threshold: 0.15 }
            );
            if (card) obs.observe(card);
            return obs;
        });

        // Section-level observer for other fade elements
        const sectionObserver = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
                        .forEach(el => el.classList.add("visible"));
                } else {
                    e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
                        .forEach(el => el.classList.remove("visible"));
                }
            }),
            { threshold: 0.1 }
        );

        if (headerRef.current)  headingObserver.observe(headerRef.current);
        if (sectionRef.current) sectionObserver.observe(sectionRef.current);

        return () => {
            headingObserver.disconnect();
            sectionObserver.disconnect();
            cardObservers.forEach(o => o.disconnect());
        };
    }, []);

    return (
        <section className="blog-preview" ref={sectionRef}>
            <div className="container">

                {/* Header with typewriter */}
                <div className="section-header" ref={headerRef}>
                    <span className="section-tag fade-in-up">Latest Insights</span>
                    <TypewriterHeading active={typeActive} />
                    <p className={`section-subtitle bp-subtitle-fade ${typeActive ? "bp-subtitle-visible" : ""}`}>
                        Stay informed with the latest solar energy news, guides, and tips from
                        our team of certified solar experts.
                    </p>
                </div>

                {/* Cards grid — each card animates individually */}
                <div className="blog-grid">
                    {posts.map((post, i) => (
                        <article
                            key={i}
                            ref={el => cardRefs.current[i] = el}
                            className={`blog-card hover-glow ${visibleCards.includes(i) ? "bp-card-visible" : "bp-card-hidden"}`}
                            style={{
                                "--card-bg": post.color,
                                "--card-accent": post.accent,
                                "--card-delay": `${i * 0.15}s`,
                            }}
                        >
                            <div className="blog-card-img-wrap hover-glow">
                                <img src={post.image} alt={post.title} className="blog-card-img hover-glow" loading="lazy" />
                                <span className="blog-card-tag hover-glow">{post.tag}</span>
                            </div>
                            <div className="blog-card-body hover-glow">

                                <h3 className="blog-card-title hover-glow">{post.title}</h3>
                                <p className="blog-card-excerpt hover-glow">{post.excerpt}</p>
                                <Link to="/blog" className="blog-read-more">
                                    Read Article <span>→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blog-cta-row fade-in-up delay-4">
                    <Link to="/blog" className="btn-outline-dark">
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default BlogPreview;
