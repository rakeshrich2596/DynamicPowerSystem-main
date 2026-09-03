export const RACOLD_NAV = [
    { id: 'section-2024', label: 'Heat Pump Domestic 2024' },
    { id: 'section-2025', label: 'Heat Pump Domestic 2025' },
];

export const RACOLD_SECTIONS = [
    /* ── 1. Heat Pump Domestic 2024 Variant ──────────── */
    {
        id:      'section-2024',
        tag:     'Heat Pump Domestic',
        title:   'Heat Pump Domestic (2024 Variant)',
        tagline: 'Heat Pumps that save up to 70% electricity',
        products: [
            {
                id:          'racold-hp-2024',
                name:        'Heat Pump Domestic — 2024 Variant',
                subtitle:    '150L / 200L / 300L',
                badge:       'Save 70% Electricity',
                range:       '150L - 300L',
                warranty:    '2',
                image:       'https://racold-static.s3.ap-south-1.amazonaws.com/sites/default/files/styles/uc_product_list/public/Heat-Pump-%281%29_0.png',
                description: "Racold's Domestic Heat Pump uses advanced reverse Carnot cycle technology to provide hot water efficiently. Designed to save up to 70% on electricity compared to conventional electric water heaters, this 2024 variant comes in 150L, 200L, and 300L capacities. It ensures a continuous supply of hot water while significantly reducing your household carbon footprint and energy bills.",
                specs: [
                    { label: 'Capacities',      value: '150L, 200L, 300L'          },
                    { label: 'Energy Savings',  value: 'Up to 70%'                 },
                    { label: 'Starting MRP',    value: '₹ 122,999.00*'             },
                    { label: 'Application',     value: 'Domestic Residential'      },
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    'Saves up to 70% electricity',
                    'Multiple capacities',
                    'Advanced heat pump tech',
                    'Eco-friendly heating',
                ],
            },
        ],
    },

    /* ── 2. Heat Pump Domestic 2025 Variants ──────────── */
    {
        id:      'section-2025',
        tag:     'Heat Pump Domestic',
        title:   'Heat Pump Domestic (2025 Variants)',
        tagline: 'High Capacity Efficient Heating',
        products: [
            {
                id:          'racold-hp-2025',
                name:        'Heat Pump Domestic — 2025 Variants',
                subtitle:    '200L / 300L / 500L',
                badge:       'New 2025 Series',
                range:       '200L - 500L',
                warranty:    '2',
                image:       'https://racold-static.s3.ap-south-1.amazonaws.com/sites/default/files/styles/uc_product_list/public/Heatpump_500L_up_live.png',
                description: "The new 2025 Racold Heat Pump variants bring even higher capacities and performance for larger homes. Available in 200L, 300L, and massive 500L configurations, these units maintain the incredible 70% electricity savings while offering faster heating and enhanced durability. Perfect for modern households with high hot water demands.",
                specs: [
                    { label: 'Capacities',      value: '200L, 300L, 500L'          },
                    { label: 'Energy Savings',  value: 'Up to 70%'                 },
                    { label: 'Starting MRP',    value: '₹ 199,999.00*'             },
                    { label: 'Application',     value: 'Large Residential'         },
                    { label: 'Warranty',        value: '2 Years'                   },
                ],
                highlights: [
                    'High capacity 500L option',
                    'Saves up to 70% electricity',
                    'Fast heating recovery',
                    'Premium 2025 features',
                ],
            },
        ],
    },
];
