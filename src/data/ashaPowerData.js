const ASHA_IMG = 'https://ashapower.in:300/images';

export const ASHA_NAV = [
    { id: 'section-smu',     label: 'Solar MPPT Charge Controllers (SMU)' },
    { id: 'section-rover',   label: 'Solar MPPT PCU – ROVER Series'        },
    { id: 'section-lander',  label: 'DSP Sine Wave Home UPS – LANDER'      },
    { id: 'section-ess',     label: 'Solar MPPT ESS'                       },
    { id: 'section-dcload',  label: 'DC Load MPPT Charge Controllers'      },
    { id: 'section-igbt',    label: 'IGBT Based Solar MPPT (SMU)'          },
];

export const ASHA_SECTIONS = [

    /* ── 1. Solar MPPT Charge Controllers (SMU) ──────────── */
    {
        id:      'section-smu',
        tag:     'Solar MPPT Charge Controllers',
        title:   'Solar MPPT Charge Controllers (SMU)',
        tagline: 'Convert your inverter to the Best Solar Inverter Today!!!',
        products: [
            {
                id:          'asha-smu',
                name:        'Solar MPPT Charge Controllers (SMU)',
                subtitle:    'Solar MPPT Charge Controller',
                badge:       'Industry Highest Voc',
                range:       'Multi-Voltage Range',
                warranty:    '2',
                image:       `${ASHA_IMG}/2cf73eee-36a8-4afc-a605-c74d0f8b3ac0.png`,
                description: "ASHAPOWER's Solar MPPT Charge Controllers (SMU) transform your existing inverter into a high-performance solar inverter, offering cutting-edge Multi-Voltage Range Technology for seamless upgrades and optimal performance. With the industry's highest Voc capacity, these controllers enable connection of more panels in series, simplifying installation and reducing cable thickness. This results in a more efficient, cost-effective, and future-proof solar setup, making it an ideal solution for India's solar industry.",
                specs: [
                    { label: 'Technology',      value: 'Multi-Voltage Range MPPT'  },
                    { label: 'Voc Capacity',    value: 'Industry Highest'          },
                    { label: 'Installation',    value: 'Simplified, Fewer Cables'  },
                    { label: 'Compatibility',   value: 'Works with existing inverter'},
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    'Highest Voc capacity',
                    'Multi-Voltage Range Technology',
                    'Reduces cable thickness',
                    'Future-proof solar setup',
                ],
            },
        ],
    },

    /* ── 2. Solar MPPT PCU — ROVER Series ────────────────── */
    {
        id:      'section-rover',
        tag:     'Solar MPPT PCU',
        title:   'Solar MPPT PCU — ROVER Series',
        tagline: 'Be Proud to be Power Independent !!!',
        products: [
            {
                id:          'asha-rover',
                name:        'Solar MPPT PCU — ROVER Series',
                subtitle:    'Solar MPPT PCU',
                badge:       'Next-Gen',
                range:       '1 kVA – 10 kVA',
                warranty:    '2',
                image:       `${ASHA_IMG}/d913bb68-269a-4075-803a-ff0b6e3e4dc3.png`,
                description: 'ASHAPOWER Introduces the ROVER Series: A Major Breakthrough in Solar MPPT PCU Solutions. Leveraging 9+ years of expertise, our cutting-edge innovation offers unparalleled efficiency, reliability, and power quality. At its core, a solar inverter plays a vital role in solar energy systems, converting DC power from solar panels into AC power, enabling safe and efficient grid integration. The ROVER Series is a next-generation solar inverter designed to optimize energy harvesting, and has been comprehensively tested across diverse Indian environments to ensure seamless integration, uninterrupted power supply, and exceptional performance.',
                specs: [
                    { label: 'Type',            value: 'Solar MPPT PCU'            },
                    { label: 'Output',          value: 'Pure Sine Wave'            },
                    { label: 'Experience',      value: '9+ Years Expertise'        },
                    { label: 'Testing',         value: 'Pan-India Environments'    },
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    '9+ years of expertise',
                    'Unparalleled efficiency',
                    'Pan-India tested',
                    'Next-gen solar inverter',
                ],
            },
        ],
    },

    /* ── 3. DSP Sine Wave Home UPS — LANDER Series ────────── */
    {
        id:      'section-lander',
        tag:     'DSP Sine Wave Home UPS',
        title:   'DSP Sine Wave Home UPS — LANDER Series',
        tagline: 'We Value Quality Power',
        products: [
            {
                id:          'asha-lander',
                name:        'DSP Sine Wave Home UPS — LANDER Series',
                subtitle:    'DSP Sine Wave Home UPS',
                badge:       'Chandrayan-3 Inspired',
                range:       '850 VA – 5 kVA',
                warranty:    '2',
                image:       `${ASHA_IMG}/96c9ef80-5d14-485b-a46f-f99d55c0bf02.png`,
                description: "ASHAPOWER's LANDER Series DSP Sine Wave Home UPS offers superior power solutions, ensuring reliability, efficiency, and performance. Rigorously tested across India's diverse environments, these UPS systems provide uninterrupted, clean power, inspired by ISRO's Chandrayan-3 mission. With features like Superior DSP Sine Wave Technology, Reliability Across Conditions, and Built for Your Needs, the LANDER Series aims to provide unmatched power stability for homes, offices, and critical equipment.",
                specs: [
                    { label: 'Technology',      value: 'DSP Sine Wave'             },
                    { label: 'Output',          value: 'Pure Sine Wave'            },
                    { label: 'Application',     value: 'Homes, Offices, Equipment' },
                    { label: 'Inspired By',     value: "ISRO's Chandrayan-3"       },
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    'DSP Sine Wave Technology',
                    'ISRO Chandrayan-3 inspired',
                    'Zero transfer time',
                    'Uninterrupted clean power',
                ],
            },
        ],
    },

    /* ── 4. Solar MPPT ESS ────────────────────────────────── */
    {
        id:      'section-ess',
        tag:     'Solar MPPT ESS',
        title:   'Solar MPPT ESS',
        tagline: '"Efficient Solar Power with Smart Energy Storage"',
        products: [
            {
                id:          'asha-ess',
                name:        'Solar MPPT ESS — ESS1548',
                subtitle:    'Solar Energy Storage System',
                badge:       'LiFePO₄ Battery',
                range:       '1.5 kWh – 10 kWh',
                warranty:    '5',
                image:       `${ASHA_IMG}/9a645620-2bd2-4823-8dc4-50f1e1c4f504.png`,
                description: 'Ashapower is thrilled to introduce the ESS1548, a groundbreaking Solar Energy Storage System that seamlessly integrates solar power and advanced lithium Ferro Phosphate battery storage. The ESS1548 delivers exceptional efficiency, durability and safety, making it an ideal solution for both residential and commercial energy needs. This innovative solution unlocks a future of limitless possibility, providing energy independence, reliable backup power from its high-capacity lithium battery, and personalized energy management.',
                specs: [
                    { label: 'Model',           value: 'ESS1548'                   },
                    { label: 'Battery',         value: 'Lithium Ferro Phosphate'   },
                    { label: 'Application',     value: 'Residential & Commercial'  },
                    { label: 'Management',      value: 'Smart Energy Management'   },
                    { label: 'Warranty',        value: '5 Years'                   },
                ],
                highlights: [
                    'LiFePO₄ battery storage',
                    'Smart energy management',
                    'Compact design',
                    'Eco-friendly & safe',
                ],
            },
        ],
    },

    /* ── 5. DC Load Solar MPPT Charge Controllers ─────────── */
    {
        id:      'section-dcload',
        tag:     'DC Load MPPT Controllers',
        title:   'DC Load Solar MPPT Charge Controllers',
        tagline: '"Unlock Maximum Solar Power Efficiency with Direct DC Load Integration"',
        products: [
            {
                id:          'asha-dcload',
                name:        'DC Load Solar MPPT Charge Controllers',
                subtitle:    'DC Load Solar MPPT Controller',
                badge:       'Deep Discharge Protection',
                range:       '10 A – 60 A',
                warranty:    '2',
                image:       `${ASHA_IMG}/330d9b9f-596a-426a-bb2f-f19a82520a98.png`,
                description: 'ASHAPOWER DC Load MPPT is a cutting-edge system designed to optimize the power output from solar panels, efficiently charging batteries and providing a reliable power source for DC-powered applications. Powered by advanced MPPT technology, this system ensures that your DC loads receive the most efficient and optimal energy. One of the standout features is its programmable DC load ON and OFF based on battery voltage, ensuring the load is automatically turned off when the battery reaches a low level, preventing deep discharge. Ideal for solar lights, solar boats, telecom equipment, remote CCTV systems, and more.',
                specs: [
                    { label: 'MPPT',            value: 'Advanced MPPT Technology'  },
                    { label: 'Load Control',    value: 'Programmable DC ON/OFF'    },
                    { label: 'Protection',      value: 'Deep Discharge Prevention' },
                    { label: 'Applications',    value: 'Solar Lights, CCTV, Telecom'},
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    'Programmable DC load control',
                    'Deep discharge protection',
                    'Advanced MPPT efficiency',
                    'Versatile off-grid use',
                ],
            },
        ],
    },

    /* ── 6. IGBT Based Solar MPPT Charge Controllers (SMU) ── */
    {
        id:      'section-igbt',
        tag:     'IGBT Based Solar MPPT',
        title:   'IGBT Based Solar MPPT Charge Controllers (SMU)',
        tagline: 'High Voc / High Wattage',
        products: [
            {
                id:          'asha-igbt',
                name:        'IGBT Based Solar MPPT Charge Controllers (SMU)',
                subtitle:    'IGBT Based Solar MPPT Controller',
                badge:       'Heavy Duty',
                range:       '5,000 W – 15,000 W',
                warranty:    '2',
                image:       `${ASHA_IMG}/d82aabbe-fdd9-46df-9cf7-aba7535ed1da.png`,
                description: 'ASHAPOWER Offers Customizable High Voc - High Wattage IGBT Based Solar MPPT Charge Controllers for Heavy-Duty Home and Industrial Applications. Our Solar MPPT Units (SMUs) are tailored to meet specific requirements, enabling multiple solar panels in series for off-grid projects ranging from 5,000 to 15,000 Watts. Built for demanding environments, these controllers deliver maximum efficiency and reliability for large-scale off-grid solar installations.',
                specs: [
                    { label: 'Technology',      value: 'IGBT Based'                },
                    { label: 'Power Range',     value: '5,000 W – 15,000 W'       },
                    { label: 'Application',     value: 'Heavy-Duty Home & Industry'},
                    { label: 'Configuration',   value: 'Customizable to requirements'},
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    'High Voc / High Wattage',
                    'Customizable IGBT design',
                    'Heavy-duty industrial grade',
                    'Multi-panel series support',
                ],
            },
        ],
    },
];
