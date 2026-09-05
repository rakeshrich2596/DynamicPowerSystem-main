import React, { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import "./EnquiryCalculator.css";
import enquiryBg from "../../assets/images/enquiry-bg.png";

const TARIFFS = {
  Residential: {
    "Tamil Nadu": 6.5,
    Pondicherry: 5.5,
    Karnataka: 7.0,
    Kerala: 6.5,
    Telangana: 7.0,
    "Andhra Pradesh": 6.5,
    Maharashtra: 7.0,
  },

  Commercial: {
    "Tamil Nadu": 11.0,
    Pondicherry: 8.0,
    Karnataka: 10.0,
    Kerala: 9.5,
    Telangana: 10.0,
    "Andhra Pradesh": 9.5,
    Maharashtra: 10.5,
  },
};

const STATES = [
  "Tamil Nadu",
  "Pondicherry",
  "Karnataka",
  "Kerala",
  "Telangana",
  "Andhra Pradesh",
  "Maharashtra",
];

const CUSTOMER_TYPES = ["Residential", "Commercial"];

const CALCULATION_TYPES = [
  {
    id: "bill",
    title: "Monthly Bill",
    description: "I know my monthly electricity bill",
    symbol: "₹",
  },
  {
    id: "units",
    title: "Monthly Units",
    description: "I know my monthly electricity usage",
    symbol: "kWh",
  },
  {
    id: "roof",
    title: "Roof Area",
    description: "I know my available rooftop area",
    symbol: "sq.ft",
  },
];

const CALCULATOR_CONTACTS = [
  {
    type: "phone",
    label: "Sales",
    value: "+91 72999 85357",
    href: "tel:+917299985357",
  },
  {
    type: "phone",
    label: "Support",
    value: "+91 98416 85357",
    href: "tel:+919841685357",
  },
  {
    type: "phone",
    label: "Enquiry",
    value: "+91 90030 85357",
    href: "tel:+919003085357",
  },
  {
    type: "phone",
    label: "Office",
    value: "044 42044405",
    href: "tel:04442044405",
  },
  {
    type: "email",
    label: "Admin",
    value: "admin@dynamicsolar.in",
    href: "mailto:admin@dynamicsolar.in",
  },
  {
    type: "email",
    label: "Enquiry Email",
    value: "Enquiry@dynamicsolar.in",
    href: "mailto:Enquiry@dynamicsolar.in",
  },
];

const formatNumber = (number, decimals = 0) => {
  if (!Number.isFinite(number)) return "0";

  return Number(number).toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
};

const calculateResidential = ({
  calculationType,
  monthlyBill,
  monthlyUnits,
  roofArea,
  roofAvailable,
  tariff,
}) => {
  let recommendedKW = 0;

  if (calculationType === "bill") {
    const units = monthlyBill / tariff;
    recommendedKW = units / 135;
  }

  if (calculationType === "units") {
    recommendedKW = monthlyUnits / 135;
  }

  if (calculationType === "roof") {
    const usableRoof = roofArea * (roofAvailable / 100);
    recommendedKW = usableRoof / 100;
  }

  recommendedKW = Math.max(1, Math.min(recommendedKW, 20));

  const roundedKW = Math.round(recommendedKW * 2) / 2;

  const dailyGeneration = roundedKW * 4.5;
  const monthlyGeneration = dailyGeneration * 30;
  const annualGeneration = dailyGeneration * 365;

  const monthlySavings = monthlyGeneration * tariff;
  const annualSavings = annualGeneration * tariff;

  const systemCost = roundedKW * 65000;

  let subsidy = 0;

  if (roundedKW <= 2) {
    subsidy = roundedKW * 30000;
  } else if (roundedKW >= 3) {
    subsidy = 78000;
  }

  subsidy = Math.min(subsidy, systemCost);

  const netInvestment = systemCost - subsidy;

  const paybackYears =
    annualSavings > 0 ? netInvestment / annualSavings : 0;

  const savings25Years = annualSavings * 25;

  const co2Reduction = annualGeneration * 0.7;

  const treesEquivalent = co2Reduction / 20;

  const peakSunHours = 4.5;

  return {
    plantSize: roundedKW,
    dailyGeneration,
    monthlyGeneration,
    annualGeneration,
    monthlySavings,
    annualSavings,
    systemCost,
    subsidy,
    netInvestment,
    paybackYears,
    savings25Years,
    co2Reduction,
    treesEquivalent,
    peakSunHours,
  };
};

const calculateCommercial = ({
  calculationType,
  monthlyBill,
  monthlyUnits,
  roofArea,
  roofAvailable,
  tariff,
}) => {
  let recommendedKW = 0;

  if (calculationType === "bill") {
    const units = monthlyBill / tariff;
    recommendedKW = units / 135;
  }

  if (calculationType === "units") {
    recommendedKW = monthlyUnits / 135;
  }

  if (calculationType === "roof") {
    const usableRoof = roofArea * (roofAvailable / 100);
    recommendedKW = usableRoof / 100;
  }

  recommendedKW = Math.max(1, Math.min(recommendedKW, 100));

  const roundedKW = Math.round(recommendedKW * 2) / 2;

  const dailyGeneration = roundedKW * 4.5;
  const monthlyGeneration = dailyGeneration * 30;
  const annualGeneration = dailyGeneration * 365;

  const monthlySavings = monthlyGeneration * tariff;
  const annualSavings = annualGeneration * tariff;

  const systemCost = roundedKW * 60000;

  const subsidy = 0;

  const netInvestment = systemCost;

  const paybackYears =
    annualSavings > 0 ? netInvestment / annualSavings : 0;

  const savings25Years = annualSavings * 25;

  const co2Reduction = annualGeneration * 0.7;

  const treesEquivalent = co2Reduction / 20;

  const peakSunHours = 4.5;

  return {
    plantSize: roundedKW,
    dailyGeneration,
    monthlyGeneration,
    annualGeneration,
    monthlySavings,
    annualSavings,
    systemCost,
    subsidy,
    netInvestment,
    paybackYears,
    savings25Years,
    co2Reduction,
    treesEquivalent,
    peakSunHours,
  };
};

const EnquiryCalculator = () => {
  const [step, setStep] = useState(1);

  const [calculationType, setCalculationType] = useState("bill");

  const [monthlyBill, setMonthlyBill] = useState("");
  const [monthlyUnits, setMonthlyUnits] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [roofAvailable, setRoofAvailable] = useState("80");
  const [areaUnit, setAreaUnit] = useState("sq.ft");

  const [state, setState] = useState("Tamil Nadu");
  const [customerType, setCustomerType] = useState("Residential");
  const [subsidyApplicable, setSubsidyApplicable] = useState("Yes");

  const [tariff, setTariff] = useState(
    TARIFFS.Residential["Tamil Nadu"]
  );

  const [result, setResult] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const selectedCalculation = useMemo(
    () =>
      CALCULATION_TYPES.find(
        (item) => item.id === calculationType
      ),
    [calculationType]
  );

  const updateCustomerType = (value) => {
    setCustomerType(value);

    const newTariff =
      TARIFFS[value]?.[state] ||
      (value === "Residential" ? 6.5 : 10);

    setTariff(newTariff);

    if (value === "Commercial") {
      setSubsidyApplicable("No");
    } else {
      setSubsidyApplicable("Yes");
    }
  };

  const updateState = (value) => {
    setState(value);

    const newTariff =
      TARIFFS[customerType]?.[value] ||
      (customerType === "Residential" ? 6.5 : 10);

    setTariff(newTariff);
  };

  const handleCalculationTypeChange = (type) => {
    setCalculationType(type);

    setMonthlyBill("");
    setMonthlyUnits("");
    setRoofArea("");
  };

  const handleContinueStep1 = () => {
    setErrorMessage("");

    if (calculationType === "bill" && !monthlyBill) {
      setErrorMessage("Please enter your monthly electricity bill.");
      return;
    }

    if (
      calculationType === "units" &&
      !monthlyUnits
    ) {
      setErrorMessage("Please enter your monthly electricity units.");
      return;
    }

    if (
      calculationType === "roof" &&
      !roofArea
    ) {
      setErrorMessage("Please enter your available roof area.");
      return;
    }

    setStep(2);
  };

  const handleContinueStep2 = () => {
    setErrorMessage("");

    if (!state) {
      setErrorMessage("Please select your state.");
      return;
    }

    if (!customerType) {
      setErrorMessage("Please select customer category.");
      return;
    }

    setStep(3);
  };

  const handleCalculate = () => {
    setErrorMessage("");

    if (!tariff || Number(tariff) <= 0) {
      setErrorMessage("Please enter a valid electricity tariff.");
      return;
    }

    const commonData = {
      calculationType,
      monthlyBill: Number(monthlyBill) || 0,
      monthlyUnits: Number(monthlyUnits) || 0,
      roofArea: Number(roofArea) || 0,
      roofAvailable: Number(roofAvailable) || 80,
      areaUnit,
      tariff: Number(tariff),
    };

    let calculatedResult;

    if (customerType === "Residential") {
      calculatedResult = calculateResidential(commonData);
    } else {
      calculatedResult = calculateCommercial(commonData);
    }

    setResult(calculatedResult);
    setErrorMessage("");
    setStep(4);
  };

  const handleOpenReport = () => {
    if (!result) {
      setErrorMessage("Please calculate your solar savings first.");
      return;
    }

    setCustomerName("");
    setWhatsappNumber("");
    setErrorMessage("");
    setShowReportModal(true);
  };

  const handleWhatsappChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setWhatsappNumber(value);
  };

  const generateSolarReportPDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
      "SOLAR SAVINGS REPORT",
      pageWidth / 2,
      20,
      { align: "center" }
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Prepared for: ${customerName}`,
      20,
      35
    );

    doc.text(
      `WhatsApp Number: +91 ${whatsappNumber}`,
      20,
      42
    );

    doc.line(20, 48, pageWidth - 20, 48);

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");

    doc.text("Customer Details", 20, 62);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      `State: ${state}`,
      20,
      72
    );

    doc.text(
      `Customer Category: ${customerType}`,
      20,
      80
    );

    doc.text(
      `Electricity Tariff: ₹${formatNumber(
        Number(tariff),
        2
      )} / kWh`,
      20,
      88
    );

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");

    doc.text("Solar Recommendation", 20, 105);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    const reportLines = [
      `Recommended Plant Size: ${formatNumber(
        result.plantSize,
        1
      )} kW`,
      `Daily Generation: ${formatNumber(
        result.dailyGeneration,
        1
      )} units`,
      `Monthly Generation: ${formatNumber(
        result.monthlyGeneration,
        0
      )} units`,
      `Annual Generation: ${formatNumber(
        result.annualGeneration,
        0
      )} units`,
      `Peak Sun Hours: ${formatNumber(
        result.peakSunHours,
        1
      )} hours`,
      "",
      `Monthly Savings: ₹${formatNumber(
        result.monthlySavings,
        0
      )}`,
      `Annual Savings: ₹${formatNumber(
        result.annualSavings,
        0
      )}`,
      `25-Year Savings: ₹${formatNumber(
        result.savings25Years,
        0
      )}`,
      "",
      `System Cost: ₹${formatNumber(
        result.systemCost,
        0
      )}`,
      `Subsidy: ₹${formatNumber(
        result.subsidy,
        0
      )}`,
      `Net Investment: ₹${formatNumber(
        result.netInvestment,
        0
      )}`,
      `Payback Period: ${formatNumber(
        result.paybackYears,
        1
      )} years`,
      "",
      `CO₂ Mitigation: ${formatNumber(
        result.co2Reduction,
        0
      )} kg/year`,
      `Trees Equivalent: ${formatNumber(
        result.treesEquivalent,
        0
      )}`,
    ];

    let y = 115;

    reportLines.forEach((line) => {
      if (line === "") {
        y += 4;
        return;
      }

      doc.text(line, 20, y);
      y += 8;
    });

    doc.line(20, y + 5, pageWidth - 20, y + 5);

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");

    doc.text(
      "This solar report is an indicative estimate.",
      20,
      y + 15
    );

    doc.text(
      "Actual savings may vary depending on location, electricity usage, tariff, system design and installation conditions.",
      20,
      y + 22
    );

    const safeName =
      customerName
        .trim()
        .replace(/[^a-zA-Z0-9]/g, "_") ||
      "Customer";

    doc.save(
      `Solar_Report_${safeName}.pdf`
    );
  };

  const handleSendReport = () => {
    if (!customerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(whatsappNumber)) {
      setErrorMessage(
        "Please enter a valid 10-digit WhatsApp number."
      );
      return;
    }

    setErrorMessage("");

    // Generate PDF directly in the browser
    generateSolarReportPDF();

    // Open WhatsApp with a pre-filled message
    const message = encodeURIComponent(
      `Hi ${customerName}, your solar savings report has been generated. Please check the downloaded PDF report.`
    );

    window.open(
      `https://wa.me/91${whatsappNumber}?text=${message}`,
      "_blank"
    );

    setShowReportModal(false);
  };

  return (
    <section
      className="solar-calculator-section"
      style={{ backgroundImage: `url(${enquiryBg})` }}
    >
      <div className="solar-calculator-container">

        {/* LEFT CONTENT */}
        <div className="solar-intro">
          <div className="solar-intro-content">
            <span className="solar-small-title">
              SOLAR SAVINGS CALCULATOR
            </span>

            <h1>
              Interested in <span>going solar?</span>
            </h1>

            <p className="solar-description">
              Use the calculator to estimate your solar requirement,
              savings, investment and payback based on your electricity usage.
            </p>

            <div className="solar-contact-block">
              <p className="solar-contact-heading">
                Use the calculator or contact us on:
              </p>

              <div className="solar-contact-list">
                {CALCULATOR_CONTACTS.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="solar-contact-item"
                  >
                    <span className="solar-contact-icons">
                      {contact.type === "phone" ? (
                        <>
                          <span className="solar-contact-icon phone-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M6.6 2.9l2.1-.5c.7-.2 1.4.2 1.7.9l1 2.5c.2.5.1 1-.2 1.4L9.9 8.7c1 2 2.5 3.5 4.5 4.5l1.5-1.3c.4-.3.9-.4 1.4-.2l2.5 1c.7.3 1.1 1 .9 1.7l-.5 2.1c-.2.9-1 1.5-1.9 1.5C10.5 18 6 13.5 6 7.2c0-.9.6-1.7 1.5-1.9z" />
                            </svg>
                          </span>

                          {/* <span className="solar-contact-icon whatsapp-icon-left">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5zm0 16.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a7.8 7.8 0 1 1 6.8 3.7zm4.3-5.8c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.5-1.1-1.2-1.2-1.4-.1-.2 0-.3.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.6-1.4c-.1-.4-.3-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2.9.3 1.2.4.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1z" />
                            </svg>
                          </span> */}
                        </>
                      ) : (
                        <span className="solar-contact-icon mail-icon">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3.5 5.5h17v13h-17v-13zm1.8 1.8v.2l6.7 5.1 6.7-5.1v-.2H5.3zm13.4 9.4V9.8L12.5 15a.8.8 0 0 1-1 0L5.3 9.8v6.9h13.4z" />
                          </svg>
                        </span>
                      )}
                    </span>

                    <span className="solar-contact-text">
                      <small>{contact.label}</small>
                      <strong>{contact.value}</strong>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CALCULATOR */}
        <div className="solar-form-wrapper">

          <div className="solar-form-card">

            {/* PROGRESS */}
            <div className="step-progress">

              <div
                className={`progress-step ${
                  step >= 1 ? "active" : ""
                }`}
              >
                <div className="step-number">
                  1
                </div>

                <span>Usage</span>
              </div>

              <div className="progress-line" />

              <div
                className={`progress-step ${
                  step >= 2 ? "active" : ""
                }`}
              >
                <div className="step-number">
                  2
                </div>

                <span>Location</span>
              </div>

              <div className="progress-line" />

              <div
                className={`progress-step ${
                  step >= 3 ? "active" : ""
                }`}
              >
                <div className="step-number">
                  3
                </div>

                <span>Tariff</span>
              </div>

              <div className="progress-line" />

              <div
                className={`progress-step ${
                  step >= 4 ? "active" : ""
                }`}
              >
                <div className="step-number">
                  4
                </div>

                <span>Result</span>
              </div>

            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="calculator-step">

                <div className="step-heading">
                  <span>STEP ONE</span>

                  <h2>
                    How would you like to calculate?
                  </h2>

                  <p>
                    Select the information you already
                    know about your electricity usage.
                  </p>
                </div>

                <div className="calculation-options">

                  {CALCULATION_TYPES.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`calculation-option ${
                        calculationType === item.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleCalculationTypeChange(
                          item.id
                        )
                      }
                    >
                      <div className="option-symbol">
                        {item.symbol}
                      </div>

                      <div className="option-text">
                        <strong>
                          {item.title}
                        </strong>

                        <span>
                          {item.description}
                        </span>
                      </div>

                      <div className="option-radio">
                        {calculationType ===
                        item.id
                          ? "✓"
                          : ""}
                      </div>
                    </button>
                  ))}

                </div>

                <div className="dynamic-input-area">

                  {calculationType === "bill" && (
                    <>
                      <label>
                        Average Monthly Electricity
                        Bill
                      </label>

                      <div className="input-with-prefix">
                        <span>₹</span>

                        <input
                          type="number"
                          min="0"
                          placeholder="Enter monthly bill"
                          value={monthlyBill}
                          onChange={(e) =>
                            setMonthlyBill(
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </>
                  )}

                  {calculationType === "units" && (
                    <>
                      <label>
                        Average Monthly Electricity
                        Usage
                      </label>

                      <div className="input-with-prefix">
                        <input
                          type="number"
                          min="0"
                          placeholder="Enter monthly units"
                          value={monthlyUnits}
                          onChange={(e) =>
                            setMonthlyUnits(
                              e.target.value
                            )
                          }
                        />

                        <span>kWh</span>
                      </div>
                    </>
                  )}

                  {calculationType === "roof" && (
                    <>
                      <label>
                        Available Rooftop Area
                      </label>

                      <div className="roof-input-row">

                        <input
                          type="number"
                          min="0"
                          placeholder="Enter roof area"
                          value={roofArea}
                          onChange={(e) =>
                            setRoofArea(
                              e.target.value
                            )
                          }
                        />

                        <select
                          value={areaUnit}
                          onChange={(e) =>
                            setAreaUnit(
                              e.target.value
                            )
                          }
                        >
                          <option value="sq.ft">
                            sq.ft
                          </option>

                          <option value="sq.m">
                            sq.m
                          </option>
                        </select>

                      </div>

                      <label className="roof-percentage-label">
                        Percentage of roof available
                      </label>

                      <input
                        className="range-input"
                        type="range"
                        min="20"
                        max="100"
                        value={roofAvailable}
                        onChange={(e) =>
                          setRoofAvailable(
                            e.target.value
                          )
                        }
                      />

                      <div className="range-value">
                        {roofAvailable}% available
                      </div>

                    </>
                  )}

                </div>

                {errorMessage && (
                  <div className="form-error">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleContinueStep1}
                >
                  Continue
                  <span>→</span>
                </button>

              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="calculator-step">

                <div className="step-heading">
                  <span>STEP TWO</span>

                  <h2>
                    Location & Customer Type
                  </h2>

                  <p>
                    Tell us where your solar system
                    will be installed.
                  </p>
                </div>

                <div className="form-field">

                  <label>
                    State / Union Territory
                  </label>

                  <select
                    value={state}
                    onChange={(e) =>
                      updateState(e.target.value)
                    }
                  >
                    {STATES.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="form-field">

                  <label>
                    Customer Category
                  </label>

                  <div className="category-buttons">

                    {CUSTOMER_TYPES.map(
                      (item) => (
                        <button
                          type="button"
                          key={item}
                          className={
                            customerType ===
                            item
                              ? "category-selected"
                              : ""
                          }
                          onClick={() =>
                            updateCustomerType(
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

                <div className="form-field">

                  <label>
                    Subsidy Applicable?
                  </label>

                  <div className="category-buttons">

                    <button
                      type="button"
                      className={
                        subsidyApplicable ===
                        "Yes"
                          ? "category-selected"
                          : ""
                      }
                      onClick={() =>
                        setSubsidyApplicable(
                          "Yes"
                        )
                      }
                    >
                      Yes
                    </button>

                    <button
                      type="button"
                      className={
                        subsidyApplicable ===
                        "No"
                          ? "category-selected"
                          : ""
                      }
                      onClick={() =>
                        setSubsidyApplicable(
                          "No"
                        )
                      }
                    >
                      No
                    </button>

                  </div>

                </div>

                {errorMessage && (
                  <div className="form-error">
                    {errorMessage}
                  </div>
                )}

                <div className="button-row">

                  <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                      setStep(1)
                    }
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={
                      handleContinueStep2
                    }
                  >
                    Continue
                    <span>→</span>
                  </button>

                </div>

              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="calculator-step">

                <div className="step-heading">
                  <span>STEP THREE</span>

                  <h2>
                    Electricity Unit Cost
                  </h2>

                  <p>
                    Enter or adjust your current
                    electricity tariff.
                  </p>
                </div>

                <div className="form-field">

                  <label>
                    Electricity Tariff
                  </label>

                  <div className="input-with-prefix">
                    <span>₹</span>

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={tariff}
                      onChange={(e) =>
                        setTariff(
                          e.target.value
                        )
                      }
                    />

                    <span>
                      / kWh
                    </span>
                  </div>

                  <small className="field-help">
                    Suggested tariff for{" "}
                    {customerType} customers
                    in {state}.
                  </small>

                </div>

                <div className="calculation-summary">

                  <h3>Your Selection</h3>

                  <div className="summary-row">
                    <span>
                      Calculation Method
                    </span>

                    <strong>
                      {selectedCalculation?.title}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Location</span>

                    <strong>
                      {state}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>
                      Customer Type
                    </span>

                    <strong>
                      {customerType}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Tariff</span>

                    <strong>
                      ₹
                      {formatNumber(
                        Number(tariff),
                        2
                      )}{" "}
                      / kWh
                    </strong>
                  </div>

                </div>

                {errorMessage && (
                  <div className="form-error">
                    {errorMessage}
                  </div>
                )}

                <div className="button-row">

                  <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                      setStep(2)
                    }
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={
                      handleCalculate
                    }
                  >
                    Calculate My Solar Savings
                    <span>→</span>
                  </button>

                </div>

              </div>
            )}

          {/* STEP 4 - RESULTS */}
          {step === 4 && result && (
            <div className="calculator-step calculator-result-step">
              <div
                id="solar-result"
                className="solar-result-card"
              >

              <div className="result-header">

                <span>
                  YOUR SOLAR ESTIMATE
                </span>

                <h2>
                  Your Solar Savings
                  Potential
                </h2>

              </div>

              <div className="result-main">

                <div className="main-result-box">

                  <span>
                    Recommended Plant Size
                  </span>

                  <strong>
                    {formatNumber(
                      result.plantSize,
                      1
                    )}{" "}
                    <small>kW</small>
                  </strong>

                </div>

                <div className="result-grid">

                  <div className="result-item">
                    <span>
                      Daily Generation
                    </span>

                    <strong>
                      {formatNumber(
                        result.dailyGeneration,
                        1
                      )}{" "}
                      units
                    </strong>
                  </div>

                  <div className="result-item">
                    <span>
                      Peak Sun Hours
                    </span>

                    <strong>
                      {formatNumber(
                        result.peakSunHours,
                        1
                      )}{" "}
                      hrs
                    </strong>
                  </div>

                  <div className="result-item">
                    <span>
                      Monthly Generation
                    </span>

                    <strong>
                      {formatNumber(
                        result.monthlyGeneration
                      )}{" "}
                      units
                    </strong>
                  </div>

                  <div className="result-item">
                    <span>
                      Annual Generation
                    </span>

                    <strong>
                      {formatNumber(
                        result.annualGeneration
                      )}{" "}
                      units
                    </strong>
                  </div>

                </div>

              </div>

              <div className="savings-section">

                <h3>
                  Estimated Savings
                </h3>

                <div className="savings-grid">

                  <div>
                    <span>
                      Monthly Savings
                    </span>

                    <strong>
                      ₹
                      {formatNumber(
                        result.monthlySavings
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Annual Savings
                    </span>

                    <strong>
                      ₹
                      {formatNumber(
                        result.annualSavings
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      25-Year Savings
                    </span>

                    <strong>
                      ₹
                      {formatNumber(
                        result.savings25Years
                      )}
                    </strong>
                  </div>

                </div>

              </div>

              <div className="investment-section">

                <h3>
                  Investment & Payback
                </h3>

                <div className="investment-grid">

                  <div>
                    <span>
                      System Cost
                    </span>

                    <strong>
                      ₹
                      {formatNumber(
                        result.systemCost
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Subsidy
                    </span>

                    <strong>
                      ₹
                      {formatNumber(
                        result.subsidy
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Net Investment
                    </span>

                    <strong>
                      ₹
                      {formatNumber(
                        result.netInvestment
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Payback Period
                    </span>

                    <strong>
                      {formatNumber(
                        result.paybackYears,
                        1
                      )}{" "}
                      years
                    </strong>
                  </div>

                </div>

              </div>

              <div className="environment-section">

                <div>
                  <span>
                    CO₂ Mitigation
                  </span>

                  <strong>
                    {formatNumber(
                      result.co2Reduction
                    )}{" "}
                    kg/year
                  </strong>
                </div>

                <div>
                  <span>
                    Trees Equivalent
                  </span>

                  <strong>
                    {formatNumber(
                      result.treesEquivalent
                    )}
                  </strong>
                </div>

              </div>

              <div className="result-button-row">
                <button
                  type="button"
                  className="result-back-button"
                  onClick={() => setStep(3)}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="report-button"
                  onClick={handleOpenReport}
                >
                  View My Solar Report
                  <span>→</span>
                </button>
              </div>

            </div>
        
        </div>
          )}
          

          </div>

        </div>

      </div>

      {/* REPORT MODAL */}
      {showReportModal && (
        <div
          className="report-modal-overlay"
          onClick={() =>
            setShowReportModal(false)
          }
        >

          <div
            className="report-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setShowReportModal(false)
              }
            >
              ×
            </button>

            <div className="modal-icon">
              📄
            </div>

            <span className="modal-small-title">
              YOUR SOLAR REPORT
            </span>

            <h2>
              Get Your Solar Report
            </h2>

            <p>
              Enter your details to generate
              your personalized solar savings
              report.
            </p>

            <div className="modal-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="modal-field">

              <label>
                WhatsApp Number
              </label>

              <div className="whatsapp-input">

                <span>+91</span>

                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit number"
                  value={whatsappNumber}
                  onChange={
                    handleWhatsappChange
                  }
                />

              </div>

            </div>

            {errorMessage && (
              <div className="form-error">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              className="whatsapp-button"
              onClick={handleSendReport}
            >
              <span className="whatsapp-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5zm0 16.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a7.8 7.8 0 1 1 6.8 3.7zm4.3-5.8c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.5-1.1-1.2-1.2-1.4-.1-.2 0-.3.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.6-1.4c-.1-.4-.3-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2.9.3 1.2.4.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1z" />
                </svg>
              </span>

              Generate Report & Open WhatsApp
            </button>

            <p className="modal-note">
              Your PDF will be generated and
              downloaded directly in your browser.
            </p>

          </div>

        </div>
      )}

    </section>
  );
};

export default EnquiryCalculator;