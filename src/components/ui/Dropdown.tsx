'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

type PillStatus = 'success' | 'warning' | 'disabled'

const dropdown = tv({
  slots: {
    root: 'relative',
    trigger:
      'flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1 text-left text10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-lg:min-h-9 max-lg:py-2',
    value: 'truncate font-semibold',
    icon: 'size-3.5 shrink-0 transition-colors duration-200',
    menu:
      'absolute top-[calc(100%+4px)] left-0 z-50 min-w-full overflow-hidden rounded-md border border-border bg-background-secondary py-1 shadow-md',
    option:
      'w-full cursor-pointer px-3 py-2 text-left text10 text-foreground hover:bg-background focus-visible:bg-background focus-visible:outline-none',
    optionActive: 'bg-background font-semibold',
  },
  variants: {
    status: {
      success: {
        trigger: 'bg-success/30 text-success',
        icon: 'text-success',
      },
      warning: {
        trigger: 'bg-warning/30 text-warning',
        icon: 'text-warning',
      },
      disabled: {
        trigger: 'bg-disabled/30 text-disabled',
        icon: 'text-disabled',
      },
    },
  },
  defaultVariants: {
    status: 'success',
  },
})

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  className?: string
  ariaLabel?: string
}

function getPillStatus(value: string): PillStatus {
  if (value === 'paused') return 'warning'
  if (value === 'draft') return 'disabled'
  return 'success'
}

export default function Dropdown({
  value,
  options,
  onChange,
  className,
  ariaLabel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const slots = dropdown({ status: getPillStatus(value) })

  const selected = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (nextValue: string) => {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div ref={rootRef} className={slots.root({ class: className })}>
      <button
        type="button"
        className={slots.trigger()}
        aria-label={ariaLabel ?? selected.label}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={slots.value()}>{selected.label}</span>
        <ChevronDown className={slots.icon()} aria-hidden />
      </button>
      {isOpen && (
        <ul className={slots.menu()} role="listbox">
          {options.map((option) => {
            const isActive = option.value === value
            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={slots.option({
                    class: isActive ? slots.optionActive() : undefined,
                  })}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
