import { createFileRoute } from "@tanstack/react-router";
import { PricingSection } from "@/components/rightstamp-page-sections";
import { SiteLayout } from "@/components/site-layout";
import { TailoredSolutionsSection } from "@/components/rightstamp-interactive";

export const Route = createFileRoute("/bang-gia")({
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <PricingSection />
      <TailoredSolutionsSection />
    </SiteLayout>
  );
}
