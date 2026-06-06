'use client'

import { Bell } from 'lucide-react'
import { tv } from 'tailwind-variants'

const notification = tv({
    slots: {
        root: 'relative inline-flex',
        button:
            'relative rounded-full bg-background-secondary p-2 transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer',
        icon: 'size-6 text-primary',
        badge:
            'absolute aspect-square size-4.5 top-0 right-0 border border-background-secondary flex items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white',
    },
})

export interface NotificationProps {
    count?: number
    className?: string
    onClick?: () => void
}

function formatCount(count: number): string {
    if (count > 99) {
        return '99+'
    }

    return String(count)
}

export default function Notification({
    count = 0,
    className,
    onClick,
}: NotificationProps) {
    const slots = notification()
    const hasCount = count > 0

    return (
        <div className={slots.root({ class: className })}>
            <button
                type="button"
                className={slots.button()}
                aria-label={
                    hasCount
                        ? `Notifications, ${count} unread`
                        : 'Notifications'
                }
                onClick={onClick}
            >
                <Bell fill="currentColor" className={slots.icon()} aria-hidden />
                {hasCount ? (
                    <span className={slots.badge()} aria-hidden>
                        {formatCount(count)}
                    </span>
                ) : null}
            </button>
        </div>
    )
}
