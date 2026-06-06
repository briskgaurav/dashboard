'use client'

import { Pencil } from 'lucide-react'
import { useState } from 'react'
import {
    CAMPAIGN_HEADER_VALUES,
    CAMPAIGN_STATUS_OPTIONS,
    LIVE_STATUS_OPTIONS,
} from '@/__mock__/campaignHeader'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import DropdownWithLabel from '@/components/ui/DropdownWithLabel'

export default function CampaignHeader() {
    const [liveStatus, setLiveStatus] = useState(
        CAMPAIGN_HEADER_VALUES.liveStatus,
    )
    const [status, setStatus] = useState(CAMPAIGN_HEADER_VALUES.status)

    return (
        <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-4">
            <div className="max-lg:min-w-0 max-lg:w-full">
                <p className="text20 font-semibold text-primary max-lg:break-words">
                    Crexont_Good Apple_Crexont 2026
                </p>
                <p className="text20 font-semibold text-primary max-lg:break-words">
                    DTC_01/01/2026-03/31/2026
                </p>
            </div>

            <div className="flex items-center gap-2 max-lg:grid max-lg:w-full max-lg:grid-cols-2 max-lg:gap-2 [&>*]:max-lg:min-w-0 [&>*]:max-lg:w-full">
                <Dropdown
                    value={liveStatus}
                    options={LIVE_STATUS_OPTIONS}
                    onChange={setLiveStatus}
                    ariaLabel="Live status"
                />

                <Button
                    disabled
                    title="Sync to OMS"
                    variant="disbaled"
                    data-testid="sync-to-oms-button"
                />

                <Button
                    title="Peach Pod"
                    variant="outline"
                    icon={<Pencil size={16} aria-hidden />}
                    data-testid="peach-pod-button"
                />

                <DropdownWithLabel
                    label="Status"
                    mode="single"
                    value={status}
                    options={CAMPAIGN_STATUS_OPTIONS}
                    onChange={setStatus}
                    className="max-lg:col-span-2"
                />

                <Button
                    title="Edit"
                    icon={<Pencil size={16} aria-hidden />}
                    data-testid="edit-button"
                    className="max-lg:col-span-2 max-lg:justify-center"
                />
            </div>
        </div>
    )
}
