import React from 'react'
import CampaignMetadata from './CampaignMetadata'
import CampaignHeader from './CampaignHeader'

export default function CampaignOverview() {
    return (
        <div className="h-fit w-full shrink-0 padd space-y-6 rounded-lg bg-background-secondary max-lg:space-y-4">
            <CampaignHeader />
            <CampaignMetadata />
        </div>
    )
}
