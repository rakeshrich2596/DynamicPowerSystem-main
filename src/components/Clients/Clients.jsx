import "./Clients.css";

import eastmanLogo from "../../assets/images/clients/Eastmans.png";
import vguardLogo from "../../assets/images/clients/vguard.jpg";
import havellsLogo from "../../assets/images/clients/Havells1.png";
import racoldLogo from "../../assets/images/clients/racolds.jpg";
import ashaPowerLogo from "../../assets/images/clients/asha.webp";
import cromptonLogo from "../../assets/images/clients/cromptons.png";

const clients = [
    { name: "Havells", type: "image", logo: havellsLogo },
    { name: "Eastman", type: "image", logo: eastmanLogo },
    { name: "V-Guard", type: "image", logo: vguardLogo  },
    { name: "Racold",  type: "image", logo: racoldLogo },
    { name: "Asha Power", type: "image", logo: ashaPowerLogo },
    { name: "Crompton", type: "image", logo: cromptonLogo },
];

function Clients() {
    return (
        <section className="clients-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Our Clients</span>
                    <h2 className="section-title">
                        Trusted by <span>Leading Businesses</span>
                    </h2>
                    <p className="section-subtitle">
                        From residential owners to large industrial clients — we've powered them all
                        with clean solar energy solutions.
                    </p>
                </div>

                {/* Static Client Logos Grid */}
                <div className="clients-grid">
                    {clients.map((c, i) => (
                        <div 
                            className="client-logo-card" 
                            key={i} 
                            title={c.name}
                            style={c.name === 'V-Guard' ? { backgroundColor: '#fff', borderColor: '#ddd', padding: 0 } : {}}
                        >
                            <div
                                className={`client-brand client-brand--${c.type}`}
                                style={{ backgroundColor: c.bg, color: c.color, borderColor: c.type === 'pill' ? c.bg : 'transparent' }}
                            >
                                {c.type === 'image' && (
                                    <img
                                        src={c.logo}
                                        alt={`${c.name} logo`}
                                        className={`client-logo-img${c.className ? ` ${c.className}` : ''}`}
                                    />
                                )}
                                {c.icon === 'sun' && c.type !== 'eastman' && (
                                    <svg className="client-icon" viewBox="0 0 24 24" fill="none" stroke="#f49c12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg>
                                )}
                                {c.icon === 'triangle' && (
                                    <svg className="client-icon" viewBox="0 0 24 24" fill="#0b5b9e" stroke="none">
                                        <path d="M12 2L22 20H2L12 2Z"></path>
                                    </svg>
                                )}
                                {c.type !== 'image' && <span>{c.text}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Clients;
