import { SIDEBAR_ITEMS } from "@/__mock__/sidebarItems";
import ComingSoon from "@/screens/soon/ComingSoon";
import SalesDashboard from "@/screens/sales/SalesDashboard";
import { notFound } from "next/navigation";

const SECTION_IDS = SIDEBAR_ITEMS.map((item) => item.id);
const LOADER_DELAYS: Record<string, number> = {
  sales: 2000,
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!SECTION_IDS.includes(section)) {
    notFound();
  }

  // Use setTimeout for any section with a defined delay
  const delay = LOADER_DELAYS[section];
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  switch (section) {
    case "sales":
      return <SalesDashboard />;
    default:
      return <ComingSoon title={section} />;
  }
}
