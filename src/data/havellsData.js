/* ── Havells Solar Residential Product Data ── */
/* Source: havells.com/business/for-industrial/solar/solar-residential.html */

const IMG_CACHE = 'https://havells.com/media/catalog/product/cache/bebb556ccaa04236261d8ba5676ddf4d';

export const HAVELLS_NAV = [
    { id: 'section-solar-panels',   label: 'Solar Panels'          },
    { id: 'section-g3-inverters',   label: 'G3 Solar Inverters'    },
    { id: 'section-txng-inverters', label: 'TX-NG Solar Inverters' },
];

export const HAVELLS_SECTIONS = [

    /* ── 1. Solar Panels ─────────────────────────────────── */
    {
        id:      'section-solar-panels',
        tag:     'Solar Panels',
        title:   'High-Efficiency Solar Panels',
        tagline: 'Premium monocrystalline panels with multi busbar technology for maximum power output and low-light performance',
        products: [
            {
                id:       'monoperc-550wp',
                name:     'MonoPERC 550 Wp Solar Panel',
                subtitle: 'Solar Panel',
                badge:    null,
                capacity: '550 Wp',
                image:    `${IMG_CACHE}/s/o/solar_pv_module_mono_perc_crystalline_1__1.jpg`,
                description: 'High-efficiency MonoPERC solar panel delivering 550 Wp peak power with multi busbar technology for superior energy harvest and excellent low-light performance on residential rooftops.',
                specs: [
                    { label: 'Peak Power',  value: '550 Wp'      },
                    { label: 'Technology',  value: 'MonoPERC'     },
                    { label: 'Busbars',     value: 'Multi Busbar' },
                    { label: 'Application', value: 'Residential'  },
                ],
                highlights: [
                    'Multi Busbar Technology',
                    'High Output Power',
                    'Low Light Performance',
                ],
            },
            {
                id:       'topcon-595wp',
                name:     'TOPCon 595 Wp Solar Panel',
                subtitle: 'Solar Panel',
                badge:    'Latest Technology',
                capacity: '595 Wp',
                image:    `${IMG_CACHE}/s/o/solar_pv_module_topcon_1__1.jpg`,
                description: 'Next-generation TOPCon solar panel with 595 Wp peak power, featuring multi busbar cell technology for higher efficiency and superior low-light performance.',
                specs: [
                    { label: 'Peak Power',  value: '595 Wp'      },
                    { label: 'Technology',  value: 'TOPCon'       },
                    { label: 'Busbars',     value: 'Multi Busbar' },
                    { label: 'Application', value: 'Residential'  },
                ],
                highlights: [
                    'Multi Busbar Technology',
                    'High Output Power',
                    'Low Light Performance',
                ],
            },
        ],
    },

    /* ── 2. Enviro GTi G3 Solar Inverters ────────────────── */
    {
        id:      'section-g3-inverters',
        tag:     'G3 Solar Inverters',
        title:   'Enviro GTi G3 Solar Inverters',
        tagline: '10-year standard warranty, BIS & IEC certified with built-in zero export for residential applications',
        products: [
            {
                id:       'enviro-gti-1-1kt-g3',
                name:     'Enviro GTi 1.1KT G3 Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    null,
                capacity: '1.1 kW',
                image:    `${IMG_CACHE}/e/n/enviro_gti_1100_ng.jpg`,
                description: 'BIS and IEC certified residential solar inverter with built-in zero export functionality, ideal for homes looking to harness rooftop solar energy efficiently and safely.',
                specs: [
                    { label: 'Rated Power',   value: '1.1 kW'                    },
                    { label: 'Warranty',      value: '10 Year Standard'            },
                    { label: 'Certification', value: 'BIS and IEC Certified'       },
                    { label: 'Zero Export',   value: 'Built-in'                    },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Built in Zero Export for Residential Application',
                ],
            },
            {
                id:       'enviro-gti-2-2kt-g3',
                name:     'Enviro GTi 2.2KT G3 Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    null,
                capacity: '2.2 kW',
                image:    `${IMG_CACHE}/b/a/base_images_13__2_1.jpg`,
                description: 'Reliable solar power conversion with a 10-year warranty and built-in zero export protection, perfect for small to medium residential solar installations.',
                specs: [
                    { label: 'Rated Power',   value: '2.2 kW'                    },
                    { label: 'Warranty',      value: '10 Year Standard'            },
                    { label: 'Certification', value: 'BIS and IEC Certified'       },
                    { label: 'Zero Export',   value: 'Built-in'                    },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Built in Zero Export for Residential Application',
                ],
            },
            {
                id:       'enviro-gti-3-3kt-g3',
                name:     'Enviro GTi 3.3KT G3 Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    null,
                capacity: '3.3 kW',
                image:    `${IMG_CACHE}/b/a/base_images_13__2_1_2.jpg`,
                description: 'Designed for medium-size residential rooftops, combining BIS/IEC certification with built-in zero export for a safe, efficient and warranty-backed solar solution.',
                specs: [
                    { label: 'Rated Power',   value: '3.3 kW'                    },
                    { label: 'Warranty',      value: '10 Year Standard'            },
                    { label: 'Certification', value: 'BIS and IEC Certified'       },
                    { label: 'Zero Export',   value: 'Built-in'                    },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Built in Zero Export for Residential Application',
                ],
            },
            {
                id:       'enviro-gti-4kt-g3',
                name:     'Enviro GTi 4KT G3 Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    'Popular',
                capacity: '4 kW',
                image:    `${IMG_CACHE}/e/n/enviro_gti_4000_d.jpg`,
                description: 'One of the most popular choices for residential solar setups, combining 4 kW output with a 10-year warranty, full certifications, and built-in zero export protection.',
                specs: [
                    { label: 'Rated Power',   value: '4 kW'                      },
                    { label: 'Warranty',      value: '10 Year Standard'            },
                    { label: 'Certification', value: 'BIS and IEC Certified'       },
                    { label: 'Zero Export',   value: 'Built-in'                    },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Built in Zero Export for Residential Application',
                ],
            },
        ],
    },

    /* ── 3. Enviro GTi TX-NG Solar Inverters ─────────────── */
    {
        id:      'section-txng-inverters',
        tag:     'TX-NG Solar Inverters',
        title:   'Enviro GTi TX-NG Solar Inverters',
        tagline: '10-year standard warranty, BIS & IEC certified high-power inverters with optional zero export device for larger homes',
        products: [
            {
                id:       'enviro-gti-5500-txng',
                name:     'Enviro GTi 5500 TX-NG Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    null,
                capacity: '5.5 kW',
                image:    `${IMG_CACHE}/e/n/enviro_gti_5500_tx-ng_1.jpg`,
                description: 'A powerful 5.5 kW residential solar inverter with BIS and IEC certifications and an optional separate zero export device for added installation flexibility.',
                specs: [
                    { label: 'Rated Power',   value: '5.5 kW'                     },
                    { label: 'Warranty',      value: '10 Year Standard'             },
                    { label: 'Certification', value: 'BIS and IEC Certified'        },
                    { label: 'Zero Export',   value: 'Optional as separate device'  },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Optional as separate device',
                ],
            },
            {
                id:       'enviro-gti-6000-txng',
                name:     'Enviro GTi 6000 TX-NG Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    null,
                capacity: '6 kW',
                image:    `${IMG_CACHE}/e/n/enviro_6000_tx_ng.jpg`,
                description: '6 kW reliable solar power conversion with full BIS and IEC certifications and a 10-year warranty, backed by optional zero export protection.',
                specs: [
                    { label: 'Rated Power',   value: '6 kW'                       },
                    { label: 'Warranty',      value: '10 Year Standard'             },
                    { label: 'Certification', value: 'BIS and IEC Certified'        },
                    { label: 'Zero Export',   value: 'Optional as separate device'  },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Optional as separate device',
                ],
            },
            {
                id:       'enviro-gti-8800-txng',
                name:     'Enviro GTi 8800 TX-NG Solar Inverter',
                subtitle: 'Solar Inverter',
                badge:    'High Power',
                capacity: '8.8 kW',
                image:    `${IMG_CACHE}/e/n/enviro_gti_8800_tx-ng_1.jpg`,
                description: 'The flagship 8.8 kW residential solar inverter for larger rooftops, offering full BIS and IEC certification, a 10-year warranty, and optional zero export as a separate device.',
                specs: [
                    { label: 'Rated Power',   value: '8.8 kW'                     },
                    { label: 'Warranty',      value: '10 Year Standard'             },
                    { label: 'Certification', value: 'BIS and IEC Certified'        },
                    { label: 'Zero Export',   value: 'Optional as separate device'  },
                ],
                highlights: [
                    '10 Year Standard Warranty',
                    'BIS and IEC Certified',
                    'Optional as separate device',
                ],
            },
        ],
    },
];
