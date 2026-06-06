'use client'

import Loader from '@/components/ui/Loader'
import RightSideBar from '@/components/ui/RightSideBar'
import { usePathname } from 'next/navigation'

export default function SectionLoading() {
    const section = usePathname().split('/').filter(Boolean)[0]

    if (section !== 'sales') {
        return null
    }

    return (
        <RightSideBar>
            <Loader />
        </RightSideBar>
    )
}
