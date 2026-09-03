import { useEffect, useRef } from "react";
import "./CompanyIntro.css";



function CompanyIntro() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="company-intro" ref={ref}>
            <div className="container ci-grid">

                {/* Left */}
                <div className="ci-text fade-in-left">
                    <div>
                        <span className="section-tag">Who We Are</span>
                    </div>
                    <h2 className="section-title delay-1">
                        Tamil Nadu's Trusted <span>Solar Energy</span> Partner
                    </h2>
                    <p className="ci-body delay-2">
                        Established in 1995, Dynamic Solar Plant has been delivering trusted solar energy solutions for over 25 years. We specialize in customized On-Grid and Off-Grid Solar Systems, Solar Inverters, Batteries, and Solar Water Heaters for residential, commercial, industrial, institutional, and agricultural applications.
                    </p>
                    <p className="ci-body delay-3">
                        Backed by an experienced team of technologists and technical professionals, we provide reliable, high-performance solar solutions that reduce energy costs, require minimal maintenance, and deliver lasting value. Our mission is to make clean, sustainable energy accessible through quality engineering, dependable service, and customer-focused solutions.
                    </p>
                    <div className="ci-badges fade-in-up delay-4">
                        <span className="ci-badge">✓ MNRE Approved</span>
                        <span className="ci-badge">✓ ISO Certified</span>
                        <span className="ci-badge">✓ Govt. Subsidy Assistance</span>
                    </div>
                </div>

                {/* Right — Image + Stats */}
                <div className="ci-right fade-in-right">
                    <div className="ci-image-wrap scale-up delay-2">
                        <img
                            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                            alt="Solar panel installation on rooftop"
                            className="ci-image"
                            loading="lazy"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}

export default CompanyIntro;
