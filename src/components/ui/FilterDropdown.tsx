'use client'

import { ListFilter, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { tv } from 'tailwind-variants'

const filterDropdown = tv({
    slots: {
        root: 'relative shrink-0',
        trigger:
            'flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 text8 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        triggerDefault:
            'border-border bg-background-secondary text-primary',
        triggerActive: 'border-primary bg-primary text-white',
        icon: 'size-3.5 shrink-0',
        label: 'whitespace-nowrap',
        clearButton:
            'flex size-4 shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-white/15 focus-visible:outline-none',
        menu:
            'fixed z-50 max-h-[40vh] overflow-y-auto rounded-md border border-border bg-background-secondary py-1 shadow-md',
        option:
            'flex w-full cursor-pointer items-start gap-2 px-3 py-2 text-left text8 text-foreground hover:bg-metric-blue',
        checkbox: 'mt-0.5 size-3.5 shrink-0 accent-primary',
        optionLabel: 'min-w-0 flex-1 leading-snug',
        empty: 'px-3 py-2 text8 text-disabled',
    },
})

export interface FilterDropdownOption {
    label: string
    value: string
}

export interface FilterDropdownProps {
    label: string
    values: string[]
    options: FilterDropdownOption[]
    onChange: (values: string[]) => void
    className?: string
    ariaLabel?: string
    emptyMessage?: string
}

interface MenuPosition {
    top: number
    left: number
    minWidth: number
}

export default function FilterDropdown({
    label,
    values,
    options,
    onChange,
    className,
    ariaLabel,
    emptyMessage = 'No results',
}: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [menuPosition, setMenuPosition] = useState<MenuPosition>({
        top: 0,
        left: 0,
        minWidth: 0,
    })
    const rootRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLUListElement>(null)
    const slots = filterDropdown()
    const hasSelections = values.length > 0
    const hasOptions = options.length > 0

    const triggerText =
        hasSelections ? `${label} (${values.length})` : label

    const updateMenuPosition = () => {
        if (!rootRef.current) {
            return
        }

        const rect = rootRef.current.getBoundingClientRect()

        setMenuPosition({
            top: rect.bottom + 4,
            left: rect.left,
            minWidth: Math.max(rect.width, 220),
        })
    }

    useLayoutEffect(() => {
        if (!isOpen) {
            return
        }

        updateMenuPosition()

        window.addEventListener('resize', updateMenuPosition)
        window.addEventListener('scroll', updateMenuPosition, true)

        return () => {
            window.removeEventListener('resize', updateMenuPosition)
            window.removeEventListener('scroll', updateMenuPosition, true)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node

            if (
                rootRef.current?.contains(target) ||
                menuRef.current?.contains(target)
            ) {
                return
            }

            setIsOpen(false)
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleToggle = (optionValue: string) => {
        if (values.includes(optionValue)) {
            onChange(values.filter((value) => value !== optionValue))
            return
        }

        onChange([...values, optionValue])
    }

    const handleClear = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation()
        onChange([])
        setIsOpen(false)
    }

    return (
        <div ref={rootRef} className={slots.root({ class: className })}>
            <button
                type="button"
                className={slots.trigger({
                    class: hasSelections
                        ? slots.triggerActive()
                        : slots.triggerDefault(),
                })}
                aria-label={ariaLabel ?? `${label}: ${values.length} selected`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className={slots.label()}>{triggerText}</span>
                {hasSelections ? (
                    <span
                        role="button"
                        tabIndex={0}
                        className={slots.clearButton()}
                        aria-label={`Clear ${label} filter`}
                        onClick={handleClear}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                handleClear(event)
                            }
                        }}
                    >
                        <X className={slots.icon()} aria-hidden />
                    </span>
                ) : (
                    <ListFilter className={slots.icon()} aria-hidden />
                )}
            </button>

            {isOpen
                ? createPortal(
                      <ul
                          ref={menuRef}
                          className={slots.menu()}
                          role="listbox"
                          aria-label={`${label} options`}
                          aria-multiselectable
                          style={{
                              top: menuPosition.top,
                              left: menuPosition.left,
                              minWidth: menuPosition.minWidth,
                          }}
                      >
                          {hasOptions ? (
                              options.map((option) => {
                                  const isChecked = values.includes(option.value)

                                  return (
                                      <li
                                          key={option.value}
                                          role="option"
                                          aria-selected={isChecked}
                                      >
                                          <label className={slots.option()}>
                                              <input
                                                  type="checkbox"
                                                  className={slots.checkbox()}
                                                  checked={isChecked}
                                                  onChange={() =>
                                                      handleToggle(option.value)
                                                  }
                                              />
                                              <span className={slots.optionLabel()}>
                                                  {option.label}
                                              </span>
                                          </label>
                                      </li>
                                  )
                              })
                          ) : (
                              <li className={slots.empty()}>{emptyMessage}</li>
                          )}
                      </ul>,
                      document.body,
                  )
                : null}
        </div>
    )
}
