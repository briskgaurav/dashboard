import { tv } from "tailwind-variants";

const dashboardLayout = tv({
  base: "flex flex-1 items-start gap-4 px-4 pb-4 max-lg:min-h-0 max-lg:flex-col max-lg:gap-3 max-lg:px-3 max-lg:pb-3",
});

export default function DashBoardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={dashboardLayout()}>
            {children}
        </div>
    )
}
