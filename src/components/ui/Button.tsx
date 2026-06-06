import { tv } from 'tailwind-variants'

const button = tv({
    slots: {
        root:
            'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text10 font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-70 max-lg:min-h-9 max-lg:px-3 max-lg:py-2',
        icon: 'flex shrink-0 items-center',
        label: 'whitespace-nowrap',
    },
    variants: {
        variant: {
            primary: {
                root: 'bg-primary text-white hover:bg-primary/90',
            },
            disbaled: {
                root: 'bg-gray-400 text-white hover:bg-gray-500',
            },
            outline: {
                root: 'border border-orange-500 bg-background-secondary text-orange-500 hover:bg-orange-50',
            },
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
    title: string
    variant?: 'primary' | 'disbaled' | 'outline'
    icon?: React.ReactNode
}

export default function Button({
    title,
    variant = 'primary',
    icon,
    disabled = false,
    type = 'button',
    className,
    ...props
}: ButtonProps) {
    const slots = button({ variant })

    return (
        <button
            type={type}
            disabled={disabled}
            className={slots.root({ class: className })}
            {...props}
        >
            {icon ? <span className={slots.icon()}>{icon}</span> : null}
            <span className={slots.label()}>{title}</span>
        </button>
    )
}
