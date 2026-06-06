'use client'

import { useEffect, useId, useState } from 'react'
import { tv } from 'tailwind-variants'

const gaugeMeter = tv({
    slots: {
        wrapper: 'relative flex w-full flex-col items-center',
        svgWrap: 'relative',
        svg: 'block',
        content:
            'absolute inset-x-0 bottom-1 flex flex-col items-center justify-end',
        value: 'text20 font-semibold leading-none text-primary',
        range: 'flex w-full items-center justify-between px-1',
        rangeLabel: 'text8 text-disabled',
    },
})

export interface GaugeMeterProps {
    value: number
    maxValue: number 
    displayValue: string
    minLabel?: string
    maxLabel: string
    size?: number 
    strokeWidth?: number
    trackColor?: string
    filledColor?: string
    gradientStart?: string
    gradientEnd?: string
    className?: string
}

export default function GaugeMeter({
    value,
    maxValue,
    displayValue,
    minLabel = '0',
    maxLabel,
    size = 160,
    strokeWidth = 14,
    trackColor = 'var(--ring-track)',
    gradientStart = 'var(--ring-start)',
    gradientEnd = 'var(--ring-end)',
    className,
}: GaugeMeterProps) {
    const gradientId = useId()
    const slots = gaugeMeter()

    const clamped =
        maxValue > 0 ? Math.min(100, Math.max(0, (value / maxValue) * 100)) : 0
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const frame = requestAnimationFrame(() => setProgress(clamped))
        return () => cancelAnimationFrame(frame)
    }, [clamped])

    const width = size
    const height = size / 2 + strokeWidth
    const cx = width / 2
    const cy = height - strokeWidth / 2
    const radius = width / 2 - strokeWidth

    const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`
    const arcLength = Math.PI * radius
    const strokeDashoffset = arcLength - (progress / 100) * arcLength

    return (
        <div className={slots.wrapper({ class: className })}>
            <div className={slots.svgWrap()} style={{ width, height }}>
                <svg
                    className={slots.svg()}
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    aria-hidden
                >
                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor={gradientStart} />
                            <stop offset="100%" stopColor={gradientEnd} />
                        </linearGradient>
                    </defs>

                    <path
                        d={arcPath}
                        fill="none"
                        stroke={trackColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />

                    <path
                        d={arcPath}
                        fill="none"
                        stroke={`url(#${gradientId})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={arcLength}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-[stroke-dashoffset] duration-700 ease-out"
                    />
                </svg>

                <div className={slots.content()}>
                    <span className={slots.value()}>{displayValue}</span>
                </div>
            </div>

            <div className={slots.range()} style={{ width }}>
                <span className={slots.rangeLabel()}>{minLabel}</span>
                <span className={slots.rangeLabel()}>{maxLabel}</span>
            </div>
        </div>
    )
}
