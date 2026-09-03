import React, { useState } from 'react';
import './BookHomeVisit.css';
import homeVisitImage from '../../assets/images/home-visit.jpg';

const WHATSAPP_NUMBER = '919841582874'; // Business WhatsApp number

const BILL_LABELS = {
    less_2000: 'Less than ₹2,000',
    '2000_5000': '₹2,000 – ₹5,000',
    above_5000: 'Above ₹5,000',
};

function BookHomeVisit() {
    const [billAmount, setBillAmount] = useState('');
    const [form, setForm] = useState({ name: '', mobile: '', pinCode: '', ebNumber: '' });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bill = BILL_LABELS[billAmount] || 'Not specified';

        const message =
            `🏠 *Free Home Visit Request*\n\n` +
            `👤 *Name:* ${form.name}\n` +
            `📞 *Mobile:* ${form.mobile}\n` +
            `📍 *Pin Code:* ${form.pinCode}\n` +
            `🔢 *EB Number:* ${form.ebNumber}\n` +
            `💡 *Bi-Monthly Bill:* ${bill}\n\n` +
            `Please schedule a FREE solar consultation at my home. Thank you!`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="bhv-section">
            <div className="bhv-container">
                <div className="bhv-header">
                    <h2>Book a Free Home Visit today!</h2>
                    <p>Schedule a FREE solar consultation at home!</p>
                </div>

                <div className="bhv-content">
                    {/* Left Side: Image */}
                    <div className="bhv-image-wrapper">
                        <img
                            src={homeVisitImage}
                            alt="Solar Consultation"
                            className="bhv-image"
                        />
                    </div>

                    {/* Right Side: Form */}
                    <div className="bhv-form-wrapper">
                        <form className="bhv-form" onSubmit={handleSubmit}>
                            <div className="bhv-input-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="bhv-input-group">
                                <label>Mobile *</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter your mobile number"
                                    value={form.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="bhv-input-group">
                                <label>Pin Code *</label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    placeholder="Enter your pin code"
                                    value={form.pinCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="bhv-input-group">
                                <label>EB Number *</label>
                                <input
                                    type="text"
                                    name="ebNumber"
                                    placeholder="Enter your EB number"
                                    value={form.ebNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="bhv-input-group bhv-bill-group">
                                <label>What is your Bi-Monthly Electricity Bill? *</label>
                                <div className="bhv-radio-buttons">
                                    <button
                                        type="button"
                                        className={billAmount === 'less_2000' ? 'active' : ''}
                                        onClick={() => setBillAmount('less_2000')}
                                    >
                                        Less than 2000
                                    </button>
                                    <button
                                        type="button"
                                        className={billAmount === '2000_5000' ? 'active' : ''}
                                        onClick={() => setBillAmount('2000_5000')}
                                    >
                                        2000 to 5000
                                    </button>
                                    <button
                                        type="button"
                                        className={billAmount === 'above_5000' ? 'active' : ''}
                                        onClick={() => setBillAmount('above_5000')}
                                    >
                                        Above 5000
                                    </button>
                                </div>
                            </div>

                            <div className="bhv-checkbox-group">
                                <label>
                                    <input type="checkbox" required />
                                    <span>I agree to Dynamic Solar's terms of service &amp; privacy policy *</span>
                                </label>
                            </div>

                            <button type="submit" className="bhv-submit-btn">
                                📲 Submit via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookHomeVisit;
