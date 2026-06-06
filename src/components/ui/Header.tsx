import Image from 'next/image'
import Notification from '@/components/ui/Notification'
import { EllipsisVertical } from 'lucide-react'
import { tv } from 'tailwind-variants'

const header = tv({
    slots: {
        root: 'w-full relative mb-[2vw] z-99 flex items-center justify-between px-6 py-4 h-fit bg-background-secondary max-lg:mb-4 max-lg:px-4 max-lg:py-3',
        group: 'flex items-center gap-4 max-lg:gap-3',
        logoContainer: 'w-[8vw] h-auto max-lg:w-24',
        separator: 'block w-px h-10 bg-primary max-lg:h-8',
        parkContainer: 'w-[5vw] h-auto max-lg:w-16',
        avatar: 'size-[2.5vw] max-lg:size-9',
        menuButton:
            'flex size-[2.5vw] cursor-pointer items-center justify-center rounded-md text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-lg:size-9',
        menuIcon: 'size-[1.25vw] max-lg:size-5',
        image: 'h-full w-full object-contain',
    }
})

export default function Header() {
    const slots = header()
    return (
        <nav className={slots.root()}>
            <div className={slots.group()}>
                <div className={slots.logoContainer()}>
                    <Image
                        src={'/assets/logo.svg'}
                        alt='logo'
                        width={100}
                        height={100}
                        className={slots.image()}
                    />
                </div>
                <span className={slots.separator()} />
                <div className={slots.parkContainer()}>
                    <Image
                        src={'/assets/park.png'}
                        alt='logo'
                        width={100}
                        height={100}
                        className={slots.image()}
                    />
                </div>
            </div>
            <div className={slots.group()}>
                <Notification count={66} />
                <button
                    type="button"
                    className={slots.menuButton()}
                    aria-label="Open menu"
                >
                    <EllipsisVertical className={slots.menuIcon()} aria-hidden />
                </button>
                <div className={slots.avatar()}>
                    <Image
                        src={'/assets/smile.svg'}
                        alt='logo'
                        width={100}
                        height={100}
                        className={slots.image()}
                    />
                </div>
            </div>
        </nav>
    )
}
