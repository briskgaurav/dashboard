'use client'

import { ChevronDown, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

const labeledDropdown = tv({
    slots: {
        root: 'relative w-[9rem] max-lg:w-full',
        field:
            'relative rounded-md border border-primary bg-background-secondary px-3 pb-1 pt-2',
        label:
            'absolute -top-2 left-3 bg-background-secondary px-1 text-[.7vw] font-medium text-primary max-lg:text-xs',
        trigger:
            'flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        value: 'min-w-0 flex-1 truncate text10 font-semibold text-primary',
        icon: 'size-4 shrink-0 text-primary transition-transform duration-200 ease-in-out',
        clearButton:
            'flex size-4 shrink-0 items-center justify-center rounded-sm text-primary hover:bg-background focus-visible:outline-none',
        menu: 'absolute top-[calc(100%+4px)] z-50 min-w-full origin-top overflow-hidden rounded-md border border-border bg-background-secondary py-1 shadow-md transition-all duration-200 ease-out',
        menuLeft: 'left-0',
        menuRight: 'right-0 min-w-[15rem]',
        groupTitle: 'px-3 py-1.5 text8 font-semibold text-disabled',
        divider: 'my-1 border-t border-border',
        option:
            'w-full cursor-pointer px-3 py-2 text-left text10 text-foreground hover:bg-background focus-visible:bg-background focus-visible:outline-none',
        multiOption:
            'flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text8 text-foreground hover:bg-metric-gray',
        optionActive: 'bg-background font-semibold',
        checkbox: 'size-3.5 shrink-0 accent-primary',
        swatch: 'size-2.5 shrink-0 rounded-sm',
    },
    variants: {
        open: {
            true: {
                icon: 'rotate-180',
                menu: 'visible translate-y-0 opacity-100 pointer-events-auto',
            },
            false: {
                menu: 'invisible -translate-y-1 opacity-0 pointer-events-none',
            },
        },
    },
    defaultVariants: {
        open: false,
    },
})

export interface LabeledDropdownOption {
    label: string
    value: string
    color?: string
}

export interface LabeledDropdownGroup {
    title: string
    options: LabeledDropdownOption[]
}

interface DropdownWithLabelBaseProps {
    label: string
    className?: string
    emptyLabel?: string
    menuAlign?: 'left' | 'right'
}

interface SingleSelectProps extends DropdownWithLabelBaseProps {
    mode?: 'single'
    value: string
    values?: never
    options: LabeledDropdownOption[]
    groups?: never
    onChange: (value: string) => void
    clearable?: never
}

interface MultiSelectProps extends DropdownWithLabelBaseProps {
    mode: 'multiple'
    values: string[]
    value?: never
    options?: LabeledDropdownOption[]
    groups?: LabeledDropdownGroup[]
    onChange: (values: string[]) => void
    clearable?: boolean
}

export type DropdownWithLabelProps = SingleSelectProps | MultiSelectProps

function flattenOptions(
    options: LabeledDropdownOption[] = [],
    groups: LabeledDropdownGroup[] = [],
): LabeledDropdownOption[] {
    if (groups.length > 0) {
        return groups.flatMap((group) => group.options)
    }
    return options
}

function getMultipleDisplayLabel(
    values: string[],
    allOptions: LabeledDropdownOption[],
    emptyLabel: string,
): string {
    if (values.length === 0) {
        return emptyLabel
    }
    if (values.length === 1) {
        return allOptions.find((option) => option.value === values[0])?.label ?? '1 selected'
    }
    return `${values.length} selected`
}

export default function DropdownWithLabel(props: DropdownWithLabelProps) {
    const {
        label,
        className,
        emptyLabel = 'Select',
        menuAlign = 'left',
    } = props

    const [isOpen, setIsOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const slots = labeledDropdown({ open: isOpen })

    const isMultiple = props.mode === 'multiple'
    const allOptions = isMultiple
        ? flattenOptions(props.options, props.groups)
        : props.options

    const displayLabel = useMemo(() => {
        if (isMultiple) {
            return getMultipleDisplayLabel(props.values, allOptions, emptyLabel)
        }

        const selected =
            allOptions.find((option) => option.value === props.value) ??
            allOptions[0]
        return selected?.label ?? emptyLabel
    }, [allOptions, emptyLabel, isMultiple, props])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    const handleSingleSelect = (nextValue: string) => {
        if (!isMultiple) {
            props.onChange(nextValue)
            setIsOpen(false)
        }
    }

    const handleMultipleToggle = (optionValue: string) => {
        if (!isMultiple) {
            return
        }

        const nextValues = props.values.includes(optionValue)
            ? props.values.filter((value) => value !== optionValue)
            : [...props.values, optionValue]

        props.onChange(nextValues)
    }

    const handleClear = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation()
        if (isMultiple) {
            props.onChange([])
            setIsOpen(false)
        }
    }

    const renderOption = (option: LabeledDropdownOption) => {
        if (isMultiple) {
            const isChecked = props.values.includes(option.value)

            return (
                <li key={option.value} role="option" aria-selected={isChecked}>
                    <label className={slots.multiOption()}>
                        <input
                            type="checkbox"
                            className={slots.checkbox()}
                            checked={isChecked}
                            onChange={() => handleMultipleToggle(option.value)}
                        />
                        {option.color ? (
                            <span
                                className={slots.swatch()}
                                style={{ backgroundColor: option.color }}
                                aria-hidden
                            />
                        ) : null}
                        {option.label}
                    </label>
                </li>
            )
        }

        const isActive = !isMultiple && option.value === props.value

        return (
            <li key={option.value} role="option" aria-selected={isActive}>
                <button
                    type="button"
                    className={slots.option({
                        class: isActive ? slots.optionActive() : undefined,
                    })}
                    onClick={() => handleSingleSelect(option.value)}
                >
                    {option.label}
                </button>
            </li>
        )
    }

    const menuItems = isMultiple && props.groups?.length ? (
        props.groups.map((group, groupIndex) => (
            <div key={group.title}>
                {groupIndex > 0 ? <div className={slots.divider()} /> : null}
                <p className={slots.groupTitle()}>{group.title}</p>
                <ul>{group.options.map(renderOption)}</ul>
            </div>
        ))
    ) : (
        <ul>{allOptions.map(renderOption)}</ul>
    )

    const showClear = isMultiple && props.clearable && props.values.length > 0

    return (
        <div ref={rootRef} className={slots.root({ class: className })}>
            <div className={slots.field()}>
                <span className={slots.label()}>{label}</span>
                <button
                    type="button"
                    className={slots.trigger()}
                    aria-label={`${label}: ${displayLabel}`}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span className={slots.value()}>{displayLabel}</span>
                    {showClear ? (
                        <span
                            role="button"
                            tabIndex={0}
                            className={slots.clearButton()}
                            aria-label={`Clear ${label}`}
                            onClick={handleClear}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    handleClear(event)
                                }
                            }}
                        >
                            <X className="size-3" aria-hidden />
                        </span>
                    ) : (
                        <ChevronDown className={slots.icon()} aria-hidden />
                    )}
                </button>
            </div>

            <div
                className={slots.menu({
                    class: menuAlign === 'right' ? slots.menuRight() : slots.menuLeft(),
                })}
                role="listbox"
                aria-label={`${label} options`}
                aria-multiselectable={isMultiple || undefined}
            >
                {menuItems}
            </div>
        </div>
    )
}
