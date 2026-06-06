import Image from 'next/image'
import { tv } from 'tailwind-variants'

const comingSoon = tv({
  slots: {
    container: "flex h-[87vh] min-h-0 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-background-secondary max-lg:h-auto max-lg:min-h-[60vh] max-lg:py-12",
    image: "h-auto w-[10vw] object-contain max-lg:w-32",
    title: "text12 font-semibold text-primary text-center capitalize"
  }
})

export default function ComingSoon({ title }: { title: string }) {
  const styles = comingSoon()

  return (
    <div className={styles.container()}>
      <Image src="/assets/smile.svg" alt="Coming Soon" width={500} height={500} className={styles.image()} />
      <p className={styles.title()}>{title} is coming soon</p>
    </div>
  )
}
