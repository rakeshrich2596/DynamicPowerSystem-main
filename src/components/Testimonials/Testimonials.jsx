import { useState, useEffect, useRef, useCallback } from "react";
import "./Testimonials.css";

const testimonials = [
    {
        name: "Prabu Senninatham Prakasam",
        role: "Customer · Google Review",
        quote:
            "Thank you so much for the great installation. It's working superb. Highly recommended person for solar installations. Thank you so much.",
        rating: 5,
        initials: "PS",
        color: "#FF6B1A",
        timeAgo: "3 years ago",
    },
    {
        name: "Ganapathy V",
        role: "Local Guide · Google Review",
        quote:
            "Very good talented team. Work was completed on time. They will take care of all the paperwork for getting approval and follow up with EB. Highly recommended.",
        rating: 5,
        initials: "GV",
        color: "#0284C7",
        timeAgo: "a year ago",
    },
    {
        name: "Sowmya Narayanan",
        role: "Local Guide · Google Review",
        quote:
            "I got a new battery for my office from Dynamic Power Systems. They understood my needs and customized my order to ensure I got value for money. The team was very eager to help and even arrived to install the products!",
        rating: 5,
        initials: "SN",
        color: "#16A34A",
        timeAgo: "3 years ago",
    },
    {
        name: "Suresh M R",
        role: "Customer · Google Review",
        quote:
            "Highly recommend checking out Dynamic Power Systems for their unique solar home UPS. My family was planning to get one for a long time and we finally chose this — the best decision of our lives!",
        rating: 5,
        initials: "SM",
        color: "#7C3AED",
        timeAgo: "3 years ago",
    },
    {
        name: "Magesh C",
        role: "Customer · Google Review",
        quote:
            "Satish and his team helped us install a solar water heater at our home in Chennai. With so much heat during the summer, we were able to cherish warm water while also conserving energy!",
        rating: 5,
        initials: "MC",
        color: "#DB2777",
        timeAgo: "3 years ago",
    },
    {
        name: "IYER PARAMESWAR NARAYANAN",
        role: "Local Guide · Google Review",
        quote:
            "A great shop to clear all your doubts regarding Solar and Water purifier and choose products according to your choice. Staffs are very much polite, technically well knowledged. Moreover attractive pricing is the plus point.",
        rating: 5,
        initials: "IP",
        color: "#D97706",
        timeAgo: "4 years ago",
    },
    {
        name: "Dinesh Kumar",
        role: "Customer · Google Review",
        quote:
            "I never thought I could make my life so sustainable with an inverter that relied on solar power. With the expert guidance of Dynamic Power Systems, I was able to make an eco-friendly change to my lifestyle!",
        rating: 5,
        initials: "DK",
        color: "#0891B2",
        timeAgo: "3 years ago",
    },
    {
        name: "PRAKASH PRAKASH",
        role: "Customer · Google Review",
        quote:
            "Excellent work and neat and clear everything. Very satisfied with the overall service provided by the team.",
        rating: 5,
        initials: "PP",
        color: "#059669",
        timeAgo: "a year ago",
    },
    {
        name: "siva kumar",
        role: "Local Guide · Google Review",
        quote:
            "Installed RO by Dynamic Power Systems. Good Service and suggested RO based on my requirements. 👍",
        rating: 5,
        initials: "SK",
        color: "#DC2626",
        timeAgo: "a year ago",
    },
    {
        name: "Jayendran Indran",
        role: "Local Guide · Google Review",
        quote:
            "Dynamic Power Systems provides excellent solar on-grid & off-grid related material and jobs, both retail & wholesale. Great place for all your solar energy needs.",
        rating: 5,
        initials: "JI",
        color: "#4F46E5",
        timeAgo: "3 months ago",
    },
];

// Collage grid images — colored placeholder boxes representing customer photos
const collageItems = [
    { bg: "#e8730e", label: "Customer 1" },
    { bg: "#f47b20", label: "Customer 2" },
    { bg: "#d96b15", label: "Customer 3" },
    { bg: "#c55c0e", label: "Customer 4" },
    { bg: "#f08c3a", label: "Customer 5" },
    { bg: "#b85210", label: "Customer 6" },
    { bg: "#e07018", label: "Customer 7" },
    { bg: "#cc6317", label: "Customer 8" },
    { bg: "#d46a12", label: "Customer 9" },
];

function StarRating({ count }) {
    return (
        <div className="testi-stars" aria-label={`${count} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < count ? "star star--filled" : "star"}>★</span>
            ))}
        </div>
    );
}

function VideoCollage() {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="testi-video-panel">
            {playing ? (
                <div className="testi-video-player">
                    <video
                        autoPlay
                        controls
                        className="testi-video-el"
                        onEnded={() => setPlaying(false)}
                    >
                        <source src="" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <div className="testi-collage" role="img" aria-label="Happy customers with solar installations">
                    <div className="testi-collage-grid">
                        {collageItems.map((item, i) => (
                            <div
                                key={i}
                                className="testi-collage-cell"
                                style={{ background: item.bg }}
                                aria-label={item.label}
                            >
                                <div className="testi-collage-icon">☀️</div>
                            </div>
                        ))}
                    </div>
                    <div className="testi-collage-overlay" />
                    <div className="testi-collage-brand">
                        <span className="testi-brand-dot">●</span>
                        <span className="testi-brand-text">DYNAMIC&nbsp;SOLAR</span>
                    </div>
                    <button
                        className="testi-play-btn"
                        onClick={() => setPlaying(true)}
                        aria-label="Play video testimonial"
                        id="testi-play-button"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [animDir, setAnimDir] = useState(null); // 'up' | 'down'
    const [animating, setAnimating] = useState(false);
    const sectionRef = useRef(null);
    const total = testimonials.length;

    const goTo = useCallback((idx, dir) => {
        if (animating) return;
        setAnimDir(dir);
        setAnimating(true);
        setTimeout(() => {
            setCurrent((idx + total) % total);
            setAnimating(false);
            setAnimDir(null);
        }, 350);
    }, [animating, total]);

    const next = useCallback(() => goTo(current + 1, "down"), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1, "up"), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                const els = e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right");
                if (e.isIntersecting) {
                    els.forEach(el => el.classList.add("visible"));
                } else {
                    els.forEach(el => el.classList.remove("visible"));
                }
            }),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const t = testimonials[current];

    return (
        <section className="testimonials-sr" ref={sectionRef} id="testimonials">
            <div className="container">
                {/* Header */}
                <div className="sr-header fade-in-up">
                    <span className="sr-tag">Testimonials</span>
                    <h2 className="sr-title">
                        90% of customers <span>recommend us!</span>
                    </h2>
                    <p className="sr-subtitle">
                        Don&apos;t just believe us, see the reviews for yourself.
                    </p>
                </div>

                {/* Two-column body */}
                <div className="sr-body">
                    {/* Left — video collage */}
                    <div className="sr-left fade-in-left delay-1">
                        <VideoCollage />
                    </div>

                    {/* Right — vertical carousel */}
                    <div className="sr-right fade-in-right delay-2">
                        {/* Up arrow */}
                        <button
                            className="sr-nav-btn sr-nav-btn--up"
                            onClick={prev}
                            aria-label="Previous testimonial"
                            id="testi-prev-btn"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                                <path d="M18 15l-6-6-6 6" />
                            </svg>
                        </button>

                        {/* Testimonial card */}
                        <div
                            className={`sr-card ${animating ? (animDir === "down" ? "sr-card--exit-up" : "sr-card--exit-down") : "sr-card--enter"}`}
                            key={current}
                        >
                            {/* Card header */}
                            <div className="sr-card-header">
                                <div className="sr-card-header-left">
                                    <span className="sr-thumb-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                            <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83V19c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.08-.2.14-.42.14-.65v-.08l-.01-.01.84-.11z" />
                                        </svg>
                                    </span>
                                    <span className="sr-card-label">Testimonial</span>
                                </div>
                                <span className="sr-card-ext-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </span>
                            </div>

                            {/* White inner content area */}
                            <div className="sr-card-body">
                                {/* Avatar */}
                                <div
                                    className="sr-avatar"
                                    style={{ background: t.color }}
                                    aria-label={t.name}
                                >
                                    {t.initials}
                                </div>

                                {/* Stars */}
                                <StarRating count={t.rating} />

                                {/* Quote */}
                                <div className="sr-quote-wrap">
                                    <p className="sr-quote">&ldquo;{t.quote}&rdquo;</p>
                                </div>

                                {/* Name & date */}
                                <div className="sr-reviewer">
                                    <div className="sr-reviewer-name">{t.name}</div>
                                    <div className="sr-reviewer-time">{t.timeAgo}</div>
                                </div>
                            </div>
                        </div>

                        {/* Down arrow */}
                        <button
                            className="sr-nav-btn sr-nav-btn--down"
                            onClick={next}
                            aria-label="Next testimonial"
                            id="testi-next-btn"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {/* Dot indicators */}
                        <div className="sr-dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`sr-dot ${i === current ? "sr-dot--active" : ""}`}
                                    onClick={() => goTo(i, i > current ? "down" : "up")}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
