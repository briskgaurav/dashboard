import { tv } from "tailwind-variants";
import { CAMPAIGN_METADATA } from "@/__mock__/campaignMetadata";
import Link from "next/link";

const metadata = tv({
  slots: {
    root: "flex w-full flex-wrap items-start justify-between gap-x-6 gap-y-4 max-lg:justify-start max-lg:gap-x-4",
    field:
      "flex min-w-0 flex-col gap-0.5 max-lg:basis-[calc(50%-0.5rem)] max-lg:max-w-[calc(50%-0.5rem)]",
    label: "text12 font-bold text-foreground",
    value: "text10 font-medium text-gray-500",
    link: "text10 font-medium text-link underline hover:text-link/80",
  },
});

export default function CampaignMetadata() {
  const slots = metadata();

  return (
    <div className={slots.root()}>
      {CAMPAIGN_METADATA.map(({ id, label, value, href }) => (
        <div key={id} className={slots.field()}>
          <p className={slots.label()}>{label}</p>
          {href ? (
            <Link href={href} className={slots.link()}>
              {value}
            </Link>
          ) : (
            <p className={slots.value()}>{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
