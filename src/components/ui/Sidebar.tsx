"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { tv } from "tailwind-variants";
import { SIDEBAR_ITEMS } from "@/__mock__/sidebarItems";
import { useSidebarAnimation } from "../../hooks/useSidebarAnimation";

const SIDEBAR_EASE = "cubic-bezier(0.33, 1, 0.68, 1)";

const sidebarStyles = tv({
  slots: {
    root: "flex h-fit min-h-[70vh] shrink-0 flex-col self-start overflow-hidden rounded-lg bg-background-secondary max-lg:min-h-0 max-lg:w-full max-lg:flex-row max-lg:self-stretch",
    header: "relative h-14 shrink-0 border-b border-background max-lg:hidden",
    collapseBtn:
      "absolute top-1/2 right-3 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-primary hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    chevronWrap: "flex size-5 items-center justify-center",
    chevron: "size-5 origin-center",
    nav: "flex flex-1 flex-col max-lg:flex-row max-lg:overflow-x-auto max-lg:overscroll-x-contain",
    item: "relative w-full cursor-pointer border-b border-background py-3.5 pl-4 text-left text-primary transition-colors duration-200 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary max-lg:flex max-lg:w-auto max-lg:shrink-0 max-lg:items-center max-lg:gap-1.5 max-lg:border-b-0 max-lg:border-r max-lg:px-2.5 max-lg:py-2 max-lg:last:border-r-0",
    itemActive: "bg-primary font-semibold text-white",
    itemInactive: "hover:bg-background/60",
    itemIconWrap: "flex w-6 shrink-0 items-center justify-center",
    itemIcon: "size-6 shrink-0 object-contain",
    activeItemIcon: "size-6 shrink-0 object-contain brightness-0 invert",
    itemLabel:
      "absolute top-1/2 left-11 -translate-y-1/2 overflow-hidden truncate whitespace-nowrap text-sm font-medium max-lg:static max-lg:translate-y-0 max-lg:text-xs max-lg:opacity-100 max-lg:pointer-events-auto",
  },
  variants: {
    collapsed: {
      true: {
        root: "w-[60px] max-lg:w-full",
        chevron: "rotate-180",
        itemLabel:
          "pointer-events-none opacity-0 max-lg:pointer-events-auto max-lg:opacity-100",
      },
      false: {
        root: "w-[250px] max-lg:w-full",
        itemLabel: "opacity-100",
      },
    },
    animating: {
      true: {
        root: "transition-[width] duration-[380ms] will-change-[width]",
        chevron: "transition-transform duration-[380ms] will-change-transform",
        itemLabel: "transition-opacity duration-300 will-change-[opacity]",
      },
      false: {},
    },
  },
  defaultVariants: {
    collapsed: false,
    animating: false,
  },
});

function getActiveSection(pathname: string) {
  const section = pathname.split("/").filter(Boolean)[0];
  return section ?? "sales";
}

export default function Sidebar() {
  const pathname = usePathname();
  const activeItem = getActiveSection(pathname);
  const { isCollapsed, isAnimating, toggle, handleTransitionEnd } =
    useSidebarAnimation();
  const slots = sidebarStyles({
    collapsed: isCollapsed,
    animating: isAnimating,
  });

  return (
    <aside
      className={slots.root()}
      style={
        isAnimating ? { transitionTimingFunction: SIDEBAR_EASE } : undefined
      }
      aria-label="Main navigation"
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={slots.header()}>
        <button
          type="button"
          className={slots.collapseBtn()}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          onClick={toggle}
        >
          <span className={slots.chevronWrap()}>
            <ChevronLeft
              className={slots.chevron()}
              style={
                isAnimating
                  ? { transitionTimingFunction: SIDEBAR_EASE }
                  : undefined
              }
              aria-hidden
            />
          </span>
        </button>
      </div>
      <nav className={slots.nav()}>
        {SIDEBAR_ITEMS.map(({ id, label }) => {
          const isActive = activeItem === id;
          const itemClass = [
            slots.item(),
            isActive ? slots.itemActive() : slots.itemInactive(),
          ].join(" ");

          return (
            <Link
              key={id}
              href={`/${id}`}
              data-sidebar-item={id}
              className={itemClass}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? label : undefined}
            >
              <span className={slots.itemIconWrap()}>
                <Image
                  src="/assets/smile.svg"
                  alt=""
                  width={35}
                  height={31}
                  className={
                    isActive ? slots.activeItemIcon() : slots.itemIcon()
                  }
                  aria-hidden
                />
              </span>
              <span
                data-sidebar-label
                className={slots.itemLabel()}
                style={
                  isAnimating
                    ? { transitionTimingFunction: SIDEBAR_EASE }
                    : undefined
                }
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
