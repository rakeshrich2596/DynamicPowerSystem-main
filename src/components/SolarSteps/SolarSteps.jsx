import { useEffect, useRef } from "react";
import {
    Home, FileText, ClipboardList, Zap, Plug, BadgeCheck
} from "lucide-react";
import "./SolarSteps.css";

const steps = [
    {
        id: 1,
        Icon: Home,
        title: "Free Home Visit",
        desc: "Our solar expert will visit your home and assess your rooftop for installation.",
        side: "left",
    },
    {
        id: 2,
        Icon: FileText,
        title: "Personalized Quote",
        desc: "Based on your energy requirements, our team will create a custom proposal for you.",
        side: "right",
    },
    {
        id: 3,
        Icon: ClipboardList,
        title: "Govt Paperwork & Subsidy Assistance",
        desc: "We handle all paperwork for you and help for a smooth coordination with the local EB office.",
        side: "left",
    },
    {
        id: 4,
        Icon: Zap,
        title: "High-Quality Installation in 24 hours",
        desc: "Your rooftop solar system will be installed promptly, cleanly, and professionally.",
        side: "right",
    },
    {
        id: 5,
        Icon: Plug,
        title: "Connection to the Grid",
        desc: "We assist you with the nearest EB office to integrate your system with the power grid to install your new electricity meter.",
        side: "left",
    },
    {
        id: 6,
        Icon: BadgeCheck,
        title: "Redeem your Subsidy",
        desc: "Your solar system is now active. Use it to power your home and start saving on your electricity bills from day one.",
        side: "right",
    },
];

function SolarSteps() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible");
                        const animatedElements = e.target.querySelectorAll(
                            ".ss-card-left, .ss-card-right, .ss-node, .fade-in-up"
                        );
                        if (animatedElements.length > 0) {
                            animatedElements.forEach((el) => el.classList.add("visible"));
                        } else if (e.target.classList.contains("ss-header")) {
                            e.target.classList.add("visible");
                        }
                    }
                });
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) {
            const rows = sectionRef.current.querySelectorAll(".ss-row");
            rows.forEach((row) => observer.observe(row));
            
            const header = sectionRef.current.querySelector(".ss-header");
            if (header) observer.observe(header);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="solar-steps-section" ref={sectionRef}>
            {/* Background decorative blobs */}
            <div className="ss-blob ss-blob-1" aria-hidden="true" />
            <div className="ss-blob ss-blob-2" aria-hidden="true" />

            <div className="container">
                {/* Header */}
                <div className="section-header ss-header fade-in-up">
                    <span className="section-tag">How It Works</span>
                    <h2 className="section-title">
                        Get Solar Installed in{" "}
                        <span>6 Easy Steps</span>
                    </h2>
                    <p className="section-subtitle">
                        We provide end-to-end support from design, installation,
                        maintenance along with complete subsidy paperwork.
                    </p>
                </div>

                {/* Timeline */}
                <div className="ss-timeline">
                    {/* Vertical line */}
                    <div className="ss-line" aria-hidden="true" />

                    {steps.map((step, idx) => {
                        const { Icon } = step;
                        const animClass =
                            step.side === "left" ? "ss-card-left" : "ss-card-right";
                        return (
                            <div
                                className={`ss-row ss-row-${step.side}`}
                                key={step.id}
                            >
                                {/* Card */}
                                <div className={`ss-card ${animClass}`}>
                                    <div className="ss-card-icon">
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="ss-card-title">{step.title}</h3>
                                    <p className="ss-card-desc">{step.desc}</p>
                                </div>

                                {/* Centre node */}
                                <div className={`ss-node ss-node-${step.side}`}>
                                    <span className="ss-node-number">{step.id}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default SolarSteps;
