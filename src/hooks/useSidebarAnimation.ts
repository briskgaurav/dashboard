'use client'

import { useCallback, useState } from 'react'

const STORAGE_KEY = 'dashboard-sidebar-collapsed'

let memoryCollapsed: boolean | null = null

function getCollapsedState(): boolean {
    if (memoryCollapsed !== null) {
        return memoryCollapsed
    }

    if (typeof window !== 'undefined') {
        memoryCollapsed = sessionStorage.getItem(STORAGE_KEY) === 'true'
    }

    return memoryCollapsed ?? false
}

function setCollapsedState(isCollapsed: boolean) {
    memoryCollapsed = isCollapsed

    if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, String(isCollapsed))
    }
}

export function useSidebarAnimation() {
    const [isCollapsed, setIsCollapsed] = useState(getCollapsedState)
    const [isAnimating, setIsAnimating] = useState(false)

    const toggle = useCallback(() => {
        setIsAnimating(true)
        setIsCollapsed((prev) => {
            const next = !prev
            setCollapsedState(next)
            return next
        })
    }, [])

    const handleTransitionEnd = useCallback(
        (event: React.TransitionEvent<HTMLElement>) => {
            if (event.propertyName === 'width') {
                setIsAnimating(false)
            }
        },
        [],
    )

    return { isCollapsed, isAnimating, toggle, handleTransitionEnd }
}
