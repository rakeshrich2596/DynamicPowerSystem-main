import { Link } from 'react-router-dom';
import './SolarLoans.css';
import solarInstallerCustomer from '../../assets/images/solar-installer-customer.jpg';
import { CalendarRupeeIcon } from './BankIcons';

function SolarLoans() {
    return (
        <section className="solar-loans-section">
            <div className="container">
                <div className="sl-header">
                    <h2 className="sl-title">Solar loans at your door step</h2>
                    <p className="sl-subtitle">Get interest rates as low as <span>6.75%*</span></p>
                    <Link to="/contact" className="sl-get-quote">Get Quote</Link>
                </div>

                <div className="sl-grid">
                    {/* Left Card */}
                    <div className="sl-left-card">
                        <img
                            src={solarInstallerCustomer}
                            alt="5-year EMI Plan with Solar Installer"
                            className="sl-left-image"
                        />
                        <div className="sl-left-content">
                            <h3>5-year EMI Plan</h3>
                            <p>Flexible payment options that fit your budget perfectly.</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="sl-right-col">
                        {/* Top Card */}
                        <div className="sl-right-card sl-card-pay-later">
                            <div className="sl-card-icon-wrap">
                                <CalendarRupeeIcon />
                            </div>
                            <div className="sl-card-text">
                                <h3>
                                    Go Solar Pay Later
                                    <span className="sl-badge-new">NEW</span>
                                </h3>
                                <p>Pay in 6 easy installments with zero interest</p>
                            </div>
                        </div>

                        {/* Bottom Card */}
                        <div className="sl-right-card sl-card-banks">
                            <div className="sl-card-text">
                                <h3>Easy EMI Plans</h3>
                                <p>Get instant long-term loans with nationalised banks up to 10 years.</p>
                            </div>

                            <div className="sl-emi-badge">
                                <span className="sl-emi-badge-dot"></span>
                                Flexible EMI Options Available
                                <span className="sl-emi-badge-dot"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SolarLoans;
