export interface CampaignMetadataField {
    id: string
    label: string
    value: string
    href?: string
}

export const CAMPAIGN_METADATA: CampaignMetadataField[] = [
    {
        id: 'boostr-deal-id',
        label: 'Boostr Deal ID',
        value: '1999227',
        href: '#',
    },
    {
        id: 'advertiser',
        label: 'Advertiser',
        value: 'Crexont',
    },
    {
        id: 'agency',
        label: 'Agency',
        value: 'Good Apple',
    },
    {
        id: 'deal-dates',
        label: 'Deal Dates',
        value: '01/01/2026-03/31/2026',
    },
    {
        id: 'deal-budget',
        label: 'Deal Budget',
        value: '$26,250',
    },
    {
        id: 'io-dates',
        label: 'IO Dates',
        value: '01/01/2026-06/30/2026',
    },
    {
        id: 'io-budget',
        label: 'IO Budget',
        value: '$52,250',
    },
    {
        id: 'type',
        label: 'Type',
        value: 'Managed Service',
    },
    {
        id: 'dsp',
        label: 'DSP',
        value: '',
    },
]
