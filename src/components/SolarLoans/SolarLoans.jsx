import React from 'react';
import { Link } from 'react-router-dom';
import './SolarLoans.css';

import solarInstallerCustomer from '../../assets/images/solar-installer-customer.jpg';

import {
    CalendarRupeeIcon,
    BankIcon,
    RupeeIcon,
    PercentIcon,
    ClockIcon
} from './BankIcons';

function SolarLoans() {
    return (
        <section className="solar-loans-section">

            <div className="container">

                {/* =========================
                    HEADER
                ========================= */}
                <div className="sl-header">

                    <h2 className="sl-title">
                        Solar loans at your door step
                    </h2>

                    <p className="sl-subtitle">
                        Get interest rates as low as
                        <span> 5.76%*</span>
                    </p>

                    <Link
                        to="/contact"
                        className="sl-get-quote"
                    >
                        Get Quote
                    </Link>

                </div>


                {/* =========================
                    MAIN GRID
                ========================= */}
                <div className="sl-grid">


                    {/* =========================
                        LEFT IMAGE CARD
                    ========================= */}
                    <div className="sl-left-card">

                        <img
                            src={solarInstallerCustomer}
                            alt="Solar financing"
                            className="sl-left-image"
                        />

                    </div>


                    {/* =========================
                        RIGHT COLUMN
                    ========================= */}
                    <div className="sl-right-col">


                        {/* =========================
                            TOP CARD
                        ========================= */}
                        <div className="sl-right-card sl-card-banks">

                            <div className="sl-card-text">

                                <div className="sl-card-heading-row">

                                    <h3>
                                        Easy EMI Plans
                                    </h3>

                                    <span className="sl-badge-new">
                                        EASY
                                    </span>

                                </div>

                                <p>
                                    Get instant long-term loans with
                                    nationalised banks up to 10 years.
                                </p>

                            </div>


                            {/* EMI BADGE */}
                            <div className="sl-emi-badge">

                                <span className="sl-emi-badge-dot"></span>

                                Flexible EMI Options Available

                                <span className="sl-emi-badge-dot"></span>

                            </div>

                        </div>


                        {/* =========================
                            BOTTOM BENEFITS CARD
                        ========================= */}
                        <div className="sl-benefits-card">

                            <div className="sl-benefits-header">

                                <div className="sl-benefits-icon">
                                    <CalendarRupeeIcon />
                                </div>

                                <div>
                                    <h3>
                                        Flexible Solar Financing
                                    </h3>

                                    <p>
                                        Choose a payment plan that
                                        works for your budget.
                                    </p>
                                </div>

                            </div>


                            {/* BENEFITS */}
                            <div className="sl-benefits-grid">


                                {/* Benefit 1 */}
                                <div className="sl-benefit-item">

                                    <div className="sl-benefit-icon">
                                        <PercentIcon />
                                    </div>

                                    <div>
                                        <strong>
                                            Low Interest
                                        </strong>

                                        <span>
                                            Rates from 5.76%*
                                        </span>
                                    </div>

                                </div>


                                {/* Benefit 2 */}
                                <div className="sl-benefit-item">

                                    <div className="sl-benefit-icon">
                                        <ClockIcon />
                                    </div>

                                    <div>
                                        <strong>
                                            Up to 10 Years
                                        </strong>

                                        <span>
                                            Comfortable repayment
                                        </span>
                                    </div>

                                </div>


                                {/* Benefit 3 */}
                                <div className="sl-benefit-item">

                                    <div className="sl-benefit-icon">
                                        <RupeeIcon />
                                    </div>

                                    <div>
                                        <strong>
                                            Easy Payments
                                        </strong>

                                        <span>
                                            Budget-friendly EMIs
                                        </span>
                                    </div>

                                </div>


                                {/* Benefit 4 */}
                                <div className="sl-benefit-item">

                                    <div className="sl-benefit-icon">
                                        <BankIcon />
                                    </div>

                                    <div>
                                        <strong>
                                            Trusted Banks
                                        </strong>

                                        <span>
                                            Multiple loan options
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SolarLoans;