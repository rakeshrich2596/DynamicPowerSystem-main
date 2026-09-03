import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Target, Trophy, Leaf, Users, Lightbulb, Shield, Eye, Rocket, CheckCircle, Award } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CTA from "../../components/CTA/CTA";
import "./About.css";

const values = [
    { Icon: Target,    title: "Customer First",    desc: "Every decision we make starts and ends with what's best for our customers — from transparent pricing to lifetime support." },
    { Icon: Trophy,    title: "Quality Excellence",desc: "We partner only with globally certified Tier-1 manufacturers and maintain the highest installation standards." },
    { Icon: Leaf,      title: "Sustainability",    desc: "Our mission extends beyond business — we are committed to building a cleaner, greener future for Tamil Nadu." },
    { Icon: Users,     title: "Integrity",         desc: "We believe in honest assessments, fair pricing, and standing behind every promise we make to our clients." },
    { Icon: Lightbulb, title: "Innovation",        desc: "We stay at the cutting edge of solar technology to deliver the most efficient and future-proof solutions." },
    { Icon: Shield,    title: "Reliability",       desc: "500+ installations. Zero compromises on quality or safety. We're with you every step of the way, for decades." },
];

const timeline = [
    { year: "1995", title: "Founded in Tambaram", desc: "Dynamic Solar Plant was established with a mission to make clean solar energy accessible to all Tamil Nadu residents." },
    { year: "2013", title: "First 100 Installations", desc: "Reached our first major milestone of 100 successful residential and commercial solar installations across Chennai." },
    { year: "2016", title: "MNRE Empanelment", desc: "Officially empanelled by the Ministry of New and Renewable Energy, enabling us to assist clients with government subsidies." },
    { year: "2018", title: "Industrial Division Launch", desc: "Expanded into large-scale industrial solar projects, installing multi-hundred kW systems for factories and institutions." },
    { year: "2021", title: "1 MW Capacity Milestone", desc: "Crossed 1 MW of cumulative solar capacity installed — powering homes, businesses, and industries across South India." },
    { year: "2025", title: "500+ Projects & Growing", desc: "Today, with 500+ completed projects and a 98% client satisfaction rate, we remain Tamil Nadu's most trusted solar partner." },
];

const team = [
    { name: "Arjun Murugan", role: "Founder & CEO", initials: "AM", color: "#FF6B1A" },
    { name: "Kavitha Rajan", role: "Head of Engineering", initials: "KR", color: "#0284C7" },
    { name: "Senthil Kumar", role: "Director of Operations", initials: "SK", color: "#16A34A" },
    { name: "Deepa Krishnan", role: "Client Relations Manager", initials: "DK", color: "#7C3AED" },
];

function AnimSection({ children, className = "" }) {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                        e.target.classList.add("visible");
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.classList.remove("visible");
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }
            }),
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={className}>{children}</div>;
}

function About() {
    const [heroRef, heroInView] = useInView();

    return (
        <>
            <Navbar />

            {/* ── Page Hero ── */}
            <div ref={heroRef} className={`page-hero about-hero ${heroInView ? 'animate-typing' : ''}`}>
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Our Story</span>
                    <h1 className="page-hero-title">About Dynamic Solar</h1>
                    <p className="page-hero-sub">
                        Over 25 years of powering Tamil Nadu's transition to clean, affordable solar energy.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>About Us</span>
                    </nav>
                </div>
            </div>

            {/* ── Vision & Mission ── */}
            <section className="about-vm">
                <div className="container">
                    <AnimSection>
                        <div className="vm-grid">
                            <div className="vm-card vm-vision fade-in-up hover-glow">
                                <div className="vm-icon"><Eye size={32} strokeWidth={1.5} /></div>
                                <h3>Our Vision</h3>
                                <p>
                                    To be Tamil Nadu's most trusted renewable energy company —
                                    making solar energy the first choice for every home, business,
                                    and institution in South India.
                                </p>
                            </div>
                            <div className="vm-card vm-mission fade-in-up delay-2 hover-glow">
                                <div className="vm-icon"><Rocket size={32} strokeWidth={1.5} /></div>
                                <h3>Our Mission</h3>
                                <p>
                                    To deliver world-class solar energy solutions through premium
                                    products, expert engineering, and end-to-end support —
                                    empowering every client to achieve energy independence while
                                    contributing to a greener planet.
                                </p>
                            </div>
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ── Who We Are ── */}
            <section className="about-intro">
                <div className="container about-intro-grid">
                    <AnimSection className="about-intro-text">
                        <span className="section-tag fade-in-up">Who We Are</span>
                        <h2 className="section-title fade-in-up delay-1">
                            Tamil Nadu's Pioneer in <span>Solar Energy</span>
                        </h2>
                        <p className="about-body fade-in-up delay-2">
                            Established in 1995, Dynamic Solar Plant has been delivering trusted solar energy solutions for over 25 years. We specialize in customized On-Grid and Off-Grid Solar Systems, Solar Inverters, Batteries, and Solar Water Heaters for residential, commercial, industrial, institutional, and agricultural applications.
                        </p>
                        <p className="about-body fade-in-up delay-3">
                            Backed by an experienced team of technologists and technical professionals, we provide reliable, high-performance solar solutions that reduce energy costs, require minimal maintenance, and deliver lasting value. Our mission is to make clean, sustainable energy accessible through quality engineering, dependable service, and customer-focused solutions.
                        </p>
                        <div className="about-certifications fade-in-up delay-4">
                            <div className="cert-badge">
                                <span className="cert-icon"><Award size={22} strokeWidth={1.5} /></span>
                                <div>
                                    <strong>MNRE Empanelled</strong>
                                    <small>Ministry of New & Renewable Energy</small>
                                </div>
                            </div>
                            <div className="cert-badge">
                                <span className="cert-icon"><CheckCircle size={22} strokeWidth={1.5} /></span>
                                <div>
                                    <strong>ISO 9001 Certified</strong>
                                    <small>Quality Management Systems</small>
                                </div>
                            </div>
                        </div>
                    </AnimSection>
                    <AnimSection className="about-intro-visual">
                        <div className="about-image-wrap fade-in-up delay-1">
                            <img
                                src="https://images.unsplash.com/photo-1617269778723-73a40cf299bd?auto=format&fit=crop&w=800&q=80"
                                alt="Solar installation by Dynamic Solar team"
                                className="about-image"
                                loading="lazy"
                            />
                        </div>
                        <div className="about-stats-panel fade-in-up delay-2">
                            {[
                                { val: "15+", lbl: "Years Experience" },
                                { val: "500+", lbl: "Projects Completed" },
                                { val: "1 MW+", lbl: "Capacity Installed" },
                                { val: "98%", lbl: "Client Satisfaction" },
                            ].map((s, i) => (
                                <div className="about-stat" key={i}>
                                    <div className="about-stat-val">{s.val}</div>
                                    <div className="about-stat-lbl">{s.lbl}</div>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section className="about-values">
                <div className="container">
                    <AnimSection>
                        <div className="section-header fade-in-up">
                            <span className="section-tag">Our Values</span>
                            <h2 className="section-title">
                                The Principles That <span>Guide Us</span>
                            </h2>
                            <p className="section-subtitle">
                                Our values aren't slogans — they're the standards every team member
                                upholds on every project, every day.
                            </p>
                        </div>
                    </AnimSection>
                    <AnimSection>
                        <div className="values-grid">
                            {values.map((v, i) => (
                                <div className={`value-card fade-in-up delay-${(i % 3) + 1} hover-glow`} key={i}>
                                    <div className="value-icon"><v.Icon size={26} strokeWidth={1.5} /></div>
                                    <h3 className="value-title">{v.title}</h3>
                                    <p className="value-desc">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="about-timeline">
                <div className="container">
                    <AnimSection>
                        <div className="section-header fade-in-up">
                            <span className="section-tag">Our Journey</span>
                            <h2 className="section-title">
                                Milestones That <span>Shaped Us</span>
                            </h2>
                            <p className="section-subtitle">
                                From a small startup to Tamil Nadu's leading solar company —
                                every milestone represents our commitment to clean energy.
                            </p>
                        </div>
                    </AnimSection>
                    <div className="timeline">
                        {timeline.map((item, i) => (
                            <AnimSection key={i} className={`timeline-item ${i % 2 === 0 ? "timeline-item--left" : "timeline-item--right"}`}>
                                <div className="timeline-content hover-glow">
                                    <div className="timeline-year">{item.year}</div>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                                <div className="timeline-dot" />
                            </AnimSection>
                        ))}
                        <div className="timeline-line" aria-hidden="true" />
                    </div>
                </div>
            </section>

            {/* ── Leadership Team ── */}
            <section className="about-team">
                <div className="container">
                    <AnimSection>
                        <div className="section-header fade-in-up">
                            <span className="section-tag">Leadership</span>
                            <h2 className="section-title">
                                Meet the <span>Team</span>
                            </h2>
                            <p className="section-subtitle">
                                Experienced solar professionals dedicated to delivering excellence
                                on every project.
                            </p>
                        </div>
                    </AnimSection>
                    <AnimSection>
                        <div className="team-grid">
                            {team.map((m, i) => (
                                <div className={`team-card fade-in-up delay-${i + 1} hover-glow`} key={i}>
                                    <div className="team-avatar" style={{ background: m.color }}>
                                        {m.initials}
                                    </div>
                                    <h3 className="team-name">{m.name}</h3>
                                    <p className="team-role">{m.role}</p>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            <CTA />
            <Footer />
        </>
    );
}

export default About;
