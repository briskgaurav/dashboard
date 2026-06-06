import { tv } from "tailwind-variants";

const skeleton = tv({
  base: "skeleton-shimmer rounded-md",
  variants: {
    tone: {
      default: "",
      soft: "opacity-80",
      muted: "opacity-60",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export interface SkeletonProps {
  className?: string;
  tone?: "default" | "soft" | "muted";
  style?: React.CSSProperties;
}

export default function Skeleton({ className, tone, style }: SkeletonProps) {
  return (
    <div
      className={skeleton({ tone, class: className })}
      style={style}
      aria-hidden
    />
  );
}
