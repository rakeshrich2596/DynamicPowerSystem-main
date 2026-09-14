import { useEffect, useState } from "react";
import "./HomePopup.css";

import popupImage from "../../assets/images/dynamic_pop.webp";

function HomePopup() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const today = new Date();

        // Popup ONLY on September 14, 2026
        const isSeptember14_2026 =
            today.getFullYear() === 2026 &&
            today.getMonth() === 8 && // September = 8
            today.getDate() === 14;

        if (isSeptember14_2026) {
            setShowPopup(true);
        }
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    // Don't show popup on any other date
    if (!showPopup) {
        return null;
    }

    return (
        <div className="home-popup-overlay">
            <div className="home-popup">

                {/* Close Button */}
                <button
                    type="button"
                    className="home-popup-close"
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    ×
                </button>

                {/* Popup Image */}
                <img
                    src={popupImage}
                    alt="Dynamic Solar Vinayagar Chaturthi Wishes"
                    className="home-popup-image"
                />

            </div>
        </div>
    );
}

export default HomePopup;