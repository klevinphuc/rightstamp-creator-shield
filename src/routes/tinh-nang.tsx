import { createFileRoute } from "@tanstack/react-router";
import { InteractiveFeaturesSection } from "@/components/rightstamp-interactive";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/tinh-nang")({
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <SiteLayout>
      {({ authUser, openAuth }) => (
        <InteractiveFeaturesSection user={authUser} requestAuth={openAuth} />
      )}
    </SiteLayout>
  );
}
