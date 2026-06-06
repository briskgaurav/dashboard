export interface DropdownOption {
    label: string
    value: string
}

export const LIVE_STATUS_OPTIONS: DropdownOption[] = [
    { label: 'Live', value: 'live' },
    { label: 'Paused', value: 'paused' },
    { label: 'Draft', value: 'draft' },
]

export const CAMPAIGN_STATUS_OPTIONS: DropdownOption[] = [
    { label: '100% Delivered', value: '100' },
    { label: '75% Delivered', value: '75' },
    { label: '50% Delivered', value: '50' },
]

export const CAMPAIGN_HEADER_VALUES = {
    liveStatus: 'live',
    status: '100',
}
