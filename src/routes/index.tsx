import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  HowItWorksSection,
  WhyChooseSection,
} from "@/components/rightstamp-page-sections";
import { SiteLayout } from "@/components/site-layout";
import { TailoredSolutionsSection } from "@/components/rightstamp-interactive";
import { TrustedWorksSection } from "@/components/trusted-works-section";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TailoredSolutionsSection />
      <TrustedWorksSection />
    </SiteLayout>
  );
}
