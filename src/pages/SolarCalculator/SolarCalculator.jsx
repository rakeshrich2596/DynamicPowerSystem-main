import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./SolarCalculator.css";

/* =========================================================
   TARIFFS
   ========================================================= */

const TARIFFS = {
    residential: {
        "Tamil Nadu": 6.5,
        Pondicherry: 5.5,
    },

    commercial: {
        "Tamil Nadu": 11,
        Pondicherry: 8,
    },
};

/* =========================================================
   FORMAT
   ========================================================= */

const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
};

const formatCurrency = (value) => {
    return `₹ ${formatNumber(Math.round(value || 0))}`;
};

/* =========================================================
   ICONS
   ========================================================= */

const HomeIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-7h6v7" />
    </svg>
);

const BuildingIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M8 19h8" />
    </svg>
);

const PinIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
    </svg>
);

const BillIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
);

const SunIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
);

const RoofIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 11 9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
    </svg>
);

const MoneyIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 8.5c-.7-.6-1.7-1-3-1-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.3-.4-3-1" />
        <path d="M12 6v2M12 16v2" />
    </svg>
);

const TrendIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 17 9 11l4 4 8-9" />
        <path d="M15 6h6v6" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 20 6v5c0 5.5-3.4 8.8-8 10-4.6-1.2-8-4.5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const FileIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h9l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
    </svg>
);

const WhatsappIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.3-4.5A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.5 8.5c.3-.5.7-.5 1-.1l1 1.3c.2.3.2.6 0 .9l-.5.6c.7 1.4 1.8 2.4 3.2 3.1l.6-.5c.3-.2.6-.2.9 0l1.3.9c.4.3.4.7.1 1-.5.7-1.2 1-2 .8-3.7-.8-6.6-3.6-7.5-7.3-.2-.8.1-1.4.9-1.7Z" />
    </svg>
);

/* =========================================================
   RESIDENTIAL CALCULATION
   ========================================================= */

function calculateResidential(bill, location) {
    const tariff = TARIFFS.residential[location];

    const monthlyUnits = Math.round(bill / tariff);

    /*
       Approximate solar generation:
       1 kW ≈ 135 units/month
    */

    const rawSize = monthlyUnits / 135;

    /*
       Solar system sizes in 1.1 kW increments
    */

    const systemSize = Math.max(
        1.1,
        Math.min(
            20,
            Math.round(rawSize / 1.1) * 1.1
        )
    );

    const roofArea = Math.round(systemSize * 100);

    const systemSteps = Math.round(systemSize / 1.1);

    /*
       Example project pricing model.
       This is an estimation, not a quotation.
    */

    const systemCost =
        100000 + (systemSteps - 1) * 55000;

    /*
       Estimated subsidy model used by this calculator.
       Final subsidy depends on eligibility and current government rules.
    */

    const subsidyUnits = Math.floor(systemSize);

    const subsidy =
        subsidyUnits <= 2
            ? subsidyUnits * 30000
            : 78000;

    const netInvestment = Math.max(
        0,
        systemCost - subsidy
    );

    const solarGeneration = Math.round(
        systemSize * 135
    );

    const offsetUnits = Math.min(
        monthlyUnits,
        solarGeneration
    );

    const annualSavings = Math.round(
        offsetUnits * tariff * 12
    );

    const payback =
        annualSavings > 0
            ? Math.round(
                  (netInvestment / annualSavings) * 10
              ) / 10
            : 0;

    const savings25Years =
        annualSavings * 25;

    return {
        monthlyUnits,
        tariff,
        systemSize,
        roofArea,
        systemCost,
        subsidy,
        netInvestment,
        solarGeneration,
        annualSavings,
        payback,
        savings25Years,
        systemType: "On-Grid Solar System",
    };
}

/* =========================================================
   COMMERCIAL CALCULATION
   ========================================================= */

function calculateCommercial(bill, location) {
    const tariff = TARIFFS.commercial[location];

    const monthlyUnits = Math.round(
        bill / tariff
    );

    /*
       Approximate commercial generation:
       1 kW ≈ 130.5 units/month
    */

    const rawSize = monthlyUnits / 130.5;

    const systemSize = Math.max(
        10,
        Math.min(
            500,
            Math.round(rawSize / 5) * 5
        )
    );

    const roofArea = Math.round(
        systemSize * 100
    );

    /*
       Approximate commercial project cost
    */

    const systemCost =
        systemSize * 40000;

    const gstBenefit = Math.round(
        systemCost * 0.08172625
    );

    const customerPrice =
        systemCost - gstBenefit;

    /*
       Approximate depreciation benefit
    */

    const depreciation1 =
        customerPrice * 0.4;

    const wdv1 =
        customerPrice - depreciation1;

    const depreciation2 =
        wdv1 * 0.4;

    const wdv2 =
        wdv1 - depreciation2;

    const depreciation3 =
        wdv2 * 0.4;

    const depreciationBenefit = Math.round(
        (
            depreciation1 +
            depreciation2 +
            depreciation3
        ) * 0.3338
    );

    const netInvestment = Math.max(
        0,
        customerPrice -
            depreciationBenefit
    );

    const monthlySolarUnits =
        systemSize * 130.5;

    const monthlySolarValue =
        monthlySolarUnits * tariff;

    const estimatedSolarCost =
        systemSize * 240.41;

    const annualSavings = Math.round(
        (
            monthlySolarValue -
            estimatedSolarCost
        ) * 12
    );

    const payback =
        annualSavings > 0
            ? Math.round(
                  (netInvestment /
                      annualSavings) *
                      10
              ) / 10
            : 0;

    const savings25Years =
        annualSavings * 25;

    return {
        monthlyUnits,
        tariff,
        systemSize,
        roofArea,
        systemCost: Math.round(systemCost),
        gstBenefit,
        depreciationBenefit,
        netInvestment: Math.round(
            netInvestment
        ),
        solarGeneration:
            Math.round(monthlySolarUnits),
        annualSavings,
        payback,
        savings25Years,
        systemType:
            "Commercial Solar System",
    };
}

/* =========================================================
   COMPONENT
   ========================================================= */

function SolarCalculator() {
    const [calcType, setCalcType] =
        useState("residential");

    const [location, setLocation] =
        useState("Tamil Nadu");

    const [bill, setBill] =
        useState(3000);

    const [inputText, setInputText] =
        useState("3000");

    const reportRef = useRef(null);

    /* -----------------------------------------------------
       SLIDER
    ----------------------------------------------------- */

    const sliderMin =
        calcType === "residential"
            ? 500
            : 10000;

    const sliderMax =
        calcType === "residential"
            ? 25000
            : 500000;

    const sliderStep =
        calcType === "residential"
            ? 50
            : 500;

    /* -----------------------------------------------------
       CALCULATE
    ----------------------------------------------------- */

    const result = useMemo(() => {
        if (!bill || bill < sliderMin) {
            return null;
        }

        if (calcType === "residential") {
            return calculateResidential(
                bill,
                location
            );
        }

        return calculateCommercial(
            bill,
            location
        );
    }, [
        bill,
        calcType,
        location,
        sliderMin,
    ]);

    /* -----------------------------------------------------
       SLIDER %
    ----------------------------------------------------- */

    const sliderPercent = Math.min(
        100,
        Math.max(
            0,
            ((bill - sliderMin) /
                (sliderMax - sliderMin)) *
                100
        )
    );

    /* -----------------------------------------------------
       BILL INPUT
    ----------------------------------------------------- */

    const handleBillInput = (event) => {
        const raw =
            event.target.value.replace(
                /[^0-9]/g,
                ""
            );

        setInputText(raw);

        const value =
            Number(raw);

        if (
            value >= sliderMin &&
            value <= sliderMax
        ) {
            setBill(value);
        }
    };

    /* -----------------------------------------------------
       INPUT BLUR
    ----------------------------------------------------- */

    const handleBillBlur = () => {
        let value = Number(inputText);

        if (!value || value < sliderMin) {
            value = sliderMin;
        }

        if (value > sliderMax) {
            value = sliderMax;
        }

        setBill(value);
        setInputText(String(value));
    };

    /* -----------------------------------------------------
       SLIDER CHANGE
    ----------------------------------------------------- */

    const handleSliderChange = (event) => {
        const value =
            Number(event.target.value);

        setBill(value);
        setInputText(String(value));
    };

    /* -----------------------------------------------------
       TYPE CHANGE
    ----------------------------------------------------- */

    const handleTypeChange = (type) => {
        setCalcType(type);

        const defaultValue =
            type === "residential"
                ? 3000
                : 100000;

        setBill(defaultValue);
        setInputText(
            String(defaultValue)
        );
    };

    /* -----------------------------------------------------
       LOCATION CHANGE
    ----------------------------------------------------- */

    const handleLocationChange = (
        selectedLocation
    ) => {
        setLocation(selectedLocation);
    };

    /* =====================================================
       PDF
       ===================================================== */

    const generatePDF = () => {
        if (!result) return null;

        const doc = new jsPDF();

        const pageWidth =
            doc.internal.pageSize.getWidth();

        let y = 20;

        /* Header */

        doc.setFillColor(
            244,
            123,
            32
        );

        doc.rect(
            0,
            0,
            pageWidth,
            35,
            "F"
        );

        doc.setTextColor(
            255,
            255,
            255
        );

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(20);

        doc.text(
            "DYNAMIC POWER SYSTEMS",
            15,
            15
        );

        doc.setFontSize(11);

        doc.text(
            "Solar Savings Calculation Report",
            15,
            25
        );

        y = 50;

        /* Customer details */

        doc.setTextColor(
            25,
            32,
            51
        );

        doc.setFontSize(14);

        doc.text(
            "Calculation Details",
            15,
            y
        );

        y += 10;

        doc.setFontSize(10);

        const details = [
            [
                "Category",
                calcType ===
                "residential"
                    ? "Residential"
                    : "Commercial",
            ],
            [
                "Location",
                location,
            ],
            [
                "Monthly Electricity Bill",
                formatCurrency(bill),
            ],
            [
                "Estimated Monthly Units",
                `${formatNumber(
                    result.monthlyUnits
                )} units`,
            ],
            [
                "Recommended Solar System",
                `${result.systemSize.toFixed(
                    1
                )} kW`,
            ],
            [
                "Required Roof Area",
                `${formatNumber(
                    result.roofArea
                )} sq. ft.`,
            ],
            [
                "System Type",
                result.systemType,
            ],
        ];

        details.forEach(
            ([label, value]) => {
                doc.setFont(
                    "helvetica",
                    "bold"
                );

                doc.text(
                    label,
                    15,
                    y
                );

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                doc.text(
                    String(value),
                    85,
                    y
                );

                y += 8;
            }
        );

        y += 8;

        /* Financial */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(14);

        doc.text(
            "Financial Estimate",
            15,
            y
        );

        y += 10;

        const financial = [
            [
                "Estimated System Cost",
                formatCurrency(
                    result.systemCost
                ),
            ],
        ];

        if (
            calcType ===
            "residential"
        ) {
            financial.push([
                "Estimated Subsidy",
                formatCurrency(
                    result.subsidy
                ),
            ]);
        } else {
            financial.push([
                "GST Input Benefit",
                formatCurrency(
                    result.gstBenefit
                ),
            ]);

            financial.push([
                "Depreciation Benefit",
                formatCurrency(
                    result.depreciationBenefit
                ),
            ]);
        }

        financial.push(
            [
                "Net Investment",
                formatCurrency(
                    result.netInvestment
                ),
            ],
            [
                "Annual Savings",
                formatCurrency(
                    result.annualSavings
                ),
            ],
            [
                "Payback Period",
                `${result.payback} years`,
            ],
            [
                "25-Year Savings",
                formatCurrency(
                    result.savings25Years
                ),
            ]
        );

        financial.forEach(
            ([label, value]) => {
                doc.setFont(
                    "helvetica",
                    "bold"
                );

                doc.text(
                    label,
                    15,
                    y
                );

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                doc.text(
                    String(value),
                    85,
                    y
                );

                y += 8;
            }
        );

        y += 10;

        doc.setFillColor(
            248,
            250,
            252
        );

        doc.roundedRect(
            15,
            y,
            pageWidth - 30,
            32,
            4,
            4,
            "F"
        );

        doc.setTextColor(
            71,
            85,
            105
        );

        doc.setFontSize(9);

        doc.text(
            "Disclaimer",
            20,
            y + 9
        );

        doc.setFont(
            "helvetica",
            "normal"
        );

        const disclaimer =
            "This calculation is an estimate only. Final system sizing, project cost, savings, subsidy eligibility and payback depend on site conditions, roof structure, shading, equipment, tariff and applicable government rules.";

        const wrapped =
            doc.splitTextToSize(
                disclaimer,
                pageWidth - 45
            );

        doc.text(
            wrapped,
            20,
            y + 17
        );

        return doc;
    };

    /* -----------------------------------------------------
       DOWNLOAD PDF
    ----------------------------------------------------- */

    const handleDownloadPDF = () => {
        const doc =
            generatePDF();

        if (!doc) return;

        doc.save(
            "Dynamic-Solar-Calculator-Report.pdf"
        );
    };

    /* -----------------------------------------------------
       WHATSAPP
    ----------------------------------------------------- */

    const handleWhatsApp = async () => {
        const doc =
            generatePDF();

        if (!doc) return;

        const pdfBlob =
            doc.output("blob");

        const file =
            new File(
                [
                    pdfBlob,
                ],
                "Dynamic-Solar-Calculator-Report.pdf",
                {
                    type: "application/pdf",
                }
            );

        /*
           Mobile:
           Native share sheet → user can choose WhatsApp
        */

        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file],
            })
        ) {
            try {
                await navigator.share({
                    title:
                        "Solar Calculator Report",
                    text:
                        "My Dynamic Power Systems solar calculation report.",
                    files: [file],
                });

                return;
            } catch (error) {
                if (
                    error?.name ===
                    "AbortError"
                ) {
                    return;
                }
            }
        }

        /*
           Desktop fallback:
           Download PDF + open WhatsApp
        */

        doc.save(
            "Dynamic-Solar-Calculator-Report.pdf"
        );

        const message =
            `Solar Calculator Report%0A%0A` +
            `Category: ${
                calcType ===
                "residential"
                    ? "Residential"
                    : "Commercial"
            }%0A` +
            `Location: ${location}%0A` +
            `Monthly Bill: ${formatCurrency(
                bill
            )}%0A` +
            `Recommended System: ${result.systemSize.toFixed(
                1
            )} kW%0A` +
            `Roof Area: ${formatNumber(
                result.roofArea
            )} sq.ft.%0A` +
            `Net Investment: ${formatCurrency(
                result.netInvestment
            )}%0A` +
            `Annual Savings: ${formatCurrency(
                result.annualSavings
            )}%0A` +
            `Payback: ${result.payback} years%0A%0A` +
            `PDF report has been downloaded.`;

        window.open(
            `https://wa.me/?text=${message}`,
            "_blank"
        );
    };

    /* =====================================================
       JSX
       ===================================================== */

    return (
        <div
            className="solar-calculator-page"
            ref={reportRef}
        >
            <Navbar />

            {/* =================================================
                HERO
            ================================================= */}

            <section className="solar-calc-hero">

                <div className="solar-calc-hero-glow" />

                <div className="solar-calc-hero-grid" />

                <div className="solar-calc-sun">
                    <SunIcon />
                </div>

                <div className="solar-calc-hero-content">

                    <div className="solar-calc-tag">
                        FREE ESTIMATION TOOL
                    </div>

                    <h1>
                        Solar Savings
                        <span>
                            Calculator
                        </span>
                    </h1>

                    <p>
                        Estimate your solar
                        system size, investment,
                        savings and payback
                        period using your
                        electricity bill.
                    </p>

                    <div className="solar-calc-breadcrumb">
                        <Link to="/">
                            Home
                        </Link>

                        <span>›</span>

                        <span>
                            Solar Calculator
                        </span>
                    </div>

                </div>
            </section>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="solar-calc-main">

                <div className="solar-calc-container">

                    {/* TYPE */}

                    <div className="solar-calc-type-area">

                        <div className="solar-calc-type-toggle">

                            <button
                                type="button"
                                className={
                                    calcType ===
                                    "residential"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleTypeChange(
                                        "residential"
                                    )
                                }
                            >
                                <span className="solar-calc-type-icon">
                                    <HomeIcon />
                                </span>

                                Residential
                            </button>

                            <button
                                type="button"
                                className={
                                    calcType ===
                                    "commercial"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleTypeChange(
                                        "commercial"
                                    )
                                }
                            >
                                <span className="solar-calc-type-icon">
                                    <BuildingIcon />
                                </span>

                                Commercial
                            </button>

                        </div>

                    </div>

                    {/* HEADING */}

                    <div className="solar-calc-heading">

                        <span>
                            {calcType ===
                            "residential"
                                ? "HOME SOLAR"
                                : "BUSINESS SOLAR"}
                        </span>

                        <h2>
                            {calcType ===
                            "residential"
                                ? "Residential Solar Estimator"
                                : "Commercial Solar Estimator"}
                        </h2>

                        <p>
                            Enter your average
                            monthly electricity
                            bill and get an
                            estimated solar
                            recommendation.
                        </p>

                    </div>

                    {/* GRID */}

                    <div className="solar-calc-grid">

                        {/* =================================================
                            INPUT CARD
                        ================================================= */}

                        <section className="solar-calc-input-card">

                            <div className="solar-calc-card-title">

                                <small>
                                    STEP 01
                                </small>

                                <h3>
                                    Your Electricity
                                    Details
                                </h3>

                            </div>

                            {/* LOCATION */}

                            <div className="solar-calc-field">

                                <label>
                                    <span className="solar-calc-label-icon">
                                        <PinIcon />
                                    </span>

                                    Location
                                </label>

                                <div className="solar-calc-location-buttons">

                                    {[
                                        "Tamil Nadu",
                                        "Pondicherry",
                                    ].map(
                                        (item) => (
                                            <button
                                                type="button"
                                                key={item}
                                                className={
                                                    location ===
                                                    item
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleLocationChange(
                                                        item
                                                    )
                                                }
                                            >
                                                {item}
                                            </button>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* BILL */}

                            <div className="solar-calc-field">

                                <label>
                                    <span className="solar-calc-label-icon">
                                        <BillIcon />
                                    </span>

                                    Average Monthly
                                    Electricity Bill
                                </label>

                                <div className="solar-calc-bill-box">

                                    <span className="solar-calc-currency">
                                        ₹
                                    </span>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={
                                            inputText
                                        }
                                        onChange={
                                            handleBillInput
                                        }
                                        onBlur={
                                            handleBillBlur
                                        }
                                        aria-label="Monthly electricity bill"
                                    />

                                    <span className="solar-calc-month">
                                        / month
                                    </span>

                                </div>

                                {/* SLIDER */}

                                <div className="solar-calc-slider-box">

                                    <input
                                        type="range"
                                        min={
                                            sliderMin
                                        }
                                        max={
                                            sliderMax
                                        }
                                        step={
                                            sliderStep
                                        }
                                        value={bill}
                                        onChange={
                                            handleSliderChange
                                        }
                                        style={{
                                            "--slider-progress":
                                                `${sliderPercent}%`,
                                        }}
                                    />

                                    <div className="solar-calc-slider-labels">

                                        <span>
                                            ₹
                                            {formatNumber(
                                                sliderMin
                                            )}
                                        </span>

                                        <span>
                                            ₹
                                            {formatNumber(
                                                sliderMax
                                            )}
                                            +
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* CURRENT BILL */}

                            <div className="solar-calc-current-bill">

                                <div>
                                    <span>
                                        CURRENT MONTHLY BILL
                                    </span>

                                    <strong>
                                        {formatCurrency(
                                            bill
                                        )}
                                    </strong>
                                </div>

                                <div className="solar-calc-current-bill-icon">
                                    <MoneyIcon />
                                </div>

                            </div>

                            {/* MINI METRICS */}

                            {result && (
                                <div className="solar-calc-mini-grid">

                                    <div>
                                        <strong>
                                            {formatNumber(
                                                result.monthlyUnits
                                            )}
                                        </strong>

                                        <span>
                                            Units / Month
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            ₹{" "}
                                            {
                                                result.tariff
                                            }
                                        </strong>

                                        <span>
                                            Avg. Tariff / Unit
                                        </span>
                                    </div>

                                </div>
                            )}

                        </section>

                        {/* =================================================
                            RESULT CARD
                        ================================================= */}

                        <section className="solar-calc-result-card">

                            <div className="solar-calc-result-top">

                                <div>

                                    <small>
                                        RECOMMENDED SYSTEM
                                    </small>

                                    <div className="solar-calc-system-size">

                                        {result
                                            ? result.systemSize.toFixed(
                                                  1
                                              )
                                            : "—"}

                                        <span>
                                            kW
                                        </span>

                                    </div>

                                    <div className="solar-calc-system-type">

                                        <i />

                                        {result
                                            ? result.systemType
                                            : "Enter your bill to calculate"}

                                    </div>

                                </div>

                                <div className="solar-calc-roof">

                                    <small>
                                        REQUIRED ROOF AREA
                                    </small>

                                    <strong>
                                        {result
                                            ? formatNumber(
                                                  result.roofArea
                                              )
                                            : "—"}
                                    </strong>

                                    <span>
                                        sq. ft.
                                    </span>

                                </div>

                            </div>

                            {/* GENERATION */}

                            {result && (
                                <div className="solar-calc-generation">

                                    <div className="solar-calc-generation-icon">
                                        <SunIcon />
                                    </div>

                                    <div>
                                        <span>
                                            ESTIMATED SOLAR GENERATION
                                        </span>

                                        <strong>
                                            {formatNumber(
                                                result.solarGeneration
                                            )}{" "}
                                            units
                                            <small>
                                                / month
                                            </small>
                                        </strong>
                                    </div>

                                </div>
                            )}

                            {/* INVESTMENT */}

                            {result ? (
                                <div className="solar-calc-investment">

                                    <div className="solar-calc-investment-heading">
                                        Investment
                                        Breakdown
                                    </div>

                                    <div className="solar-calc-invest-row">

                                        <span>
                                            System Cost
                                        </span>

                                        <strong>
                                            {formatCurrency(
                                                result.systemCost
                                            )}
                                        </strong>

                                    </div>

                                    {calcType ===
                                    "residential" ? (
                                        <div className="solar-calc-invest-row benefit">

                                            <span>
                                                Estimated Subsidy
                                            </span>

                                            <strong>
                                                −{" "}
                                                {formatCurrency(
                                                    result.subsidy
                                                )}
                                            </strong>

                                        </div>
                                    ) : (
                                        <>
                                            <div className="solar-calc-invest-row benefit">

                                                <span>
                                                    GST Input Benefit
                                                </span>

                                                <strong>
                                                    −{" "}
                                                    {formatCurrency(
                                                        result.gstBenefit
                                                    )}
                                                </strong>

                                            </div>

                                            <div className="solar-calc-invest-row benefit">

                                                <span>
                                                    Depreciation Benefit
                                                </span>

                                                <strong>
                                                    −{" "}
                                                    {formatCurrency(
                                                        result.depreciationBenefit
                                                    )}
                                                </strong>

                                            </div>
                                        </>
                                    )}

                                    <div className="solar-calc-invest-total">

                                        <span>
                                            Net Investment
                                        </span>

                                        <strong>
                                            {formatCurrency(
                                                result.netInvestment
                                            )}
                                        </strong>

                                    </div>

                                </div>
                            ) : (
                                <div className="solar-calc-empty-result">

                                    <div>
                                        <SunIcon />
                                    </div>

                                    <h3>
                                        Your Solar
                                        Recommendation
                                    </h3>

                                    <p>
                                        Enter your
                                        electricity
                                        bill to see
                                        the recommended
                                        system size,
                                        investment
                                        and savings.
                                    </p>

                                </div>
                            )}

                            {/* SAFE NOTE */}

                            <div className="solar-calc-safe-note">

                                <span>
                                    <ShieldIcon />
                                </span>

                                <p>
                                    This is an
                                    estimated
                                    calculation.
                                    Final system
                                    sizing and
                                    quotation
                                    depend on site
                                    assessment,
                                    roof area,
                                    shading and
                                    actual
                                    electricity
                                    consumption.
                                </p>

                            </div>

                        </section>

                    </div>

                    {/* =================================================
                        SAVINGS
                    ================================================= */}

                    {result && (
                        <section className="solar-calc-savings">

                            <article className="solar-calc-saving-card green">

                                <div className="solar-calc-saving-icon">
                                    <TrendIcon />
                                </div>

                                <div>
                                    <span>
                                        ANNUAL SAVINGS
                                    </span>

                                    <strong>
                                        {formatCurrency(
                                            result.annualSavings
                                        )}
                                    </strong>

                                    <p>
                                        Estimated yearly
                                        electricity bill
                                        savings
                                    </p>
                                </div>

                            </article>

                            <article className="solar-calc-saving-card blue">

                                <div className="solar-calc-saving-icon">
                                    <CalendarIcon />
                                </div>

                                <div>
                                    <span>
                                        PAYBACK PERIOD
                                    </span>

                                    <strong>
                                        {result.payback}
                                        <em>
                                            {" "}
                                            Years
                                        </em>
                                    </strong>

                                    <p>
                                        Estimated time
                                        to recover
                                        investment
                                    </p>
                                </div>

                            </article>

                            <article className="solar-calc-saving-card orange">

                                <div className="solar-calc-saving-icon">
                                    <SunIcon />
                                </div>

                                <div>
                                    <span>
                                        25-YEAR SAVINGS
                                    </span>

                                    <strong>
                                        ₹{" "}
                                        {(
                                            result.savings25Years /
                                            100000
                                        ).toFixed(1)}

                                        <em>
                                            {" "}
                                            Lakhs
                                        </em>
                                    </strong>

                                    <p>
                                        Estimated
                                        long-term
                                        electricity
                                        savings
                                    </p>
                                </div>

                            </article>

                        </section>
                    )}

                    {/* =================================================
                        REPORT BUTTONS
                    ================================================= */}

                    {result && (
                        <section className="solar-calc-report">

                            <div className="solar-calc-report-text">

                                <span>
                                    YOUR CALCULATION IS READY
                                </span>

                                <h2>
                                    Save or share your
                                    solar report
                                </h2>

                                <p>
                                    Download the
                                    calculation as PDF
                                    or share it from
                                    your mobile.
                                </p>

                            </div>

                            <div className="solar-calc-report-buttons">

                                <button
                                    type="button"
                                    className="solar-calc-pdf-button"
                                    onClick={
                                        handleDownloadPDF
                                    }
                                >
                                    <FileIcon />
                                    Download PDF
                                </button>

                                <button
                                    type="button"
                                    className="solar-calc-whatsapp-button"
                                    onClick={
                                        handleWhatsApp
                                    }
                                >
                                    <WhatsappIcon />
                                    Share on WhatsApp
                                </button>

                            </div>

                        </section>
                    )}

                    {/* =================================================
                        CTA
                    ================================================= */}

                    <section className="solar-calc-cta">

                        <div>

                            <span>
                                READY TO GO SOLAR?
                            </span>

                            <h2>
                                Get a detailed
                                solar quotation
                            </h2>

                            <p>
                                Our solar experts
                                can provide a
                                detailed system
                                design after
                                evaluating your
                                requirements.
                            </p>

                        </div>

                        <Link
                            to="/contact"
                            className="solar-calc-cta-button"
                        >
                            Get a Free Quote

                            <span>
                                →
                            </span>
                        </Link>

                    </section>

                    {/* DISCLAIMER */}

                    <p className="solar-calc-disclaimer">

                        The figures shown above
                        are estimates based on
                        the selected location,
                        electricity bill and
                        calculation assumptions.
                        Actual solar generation,
                        savings, project cost and
                        payback may vary depending
                        on roof orientation,
                        shading, equipment,
                        tariff structure,
                        government eligibility
                        and site conditions.

                    </p>

                </div>

            </main>

            <Footer />
        </div>
    );
}

export default SolarCalculator;