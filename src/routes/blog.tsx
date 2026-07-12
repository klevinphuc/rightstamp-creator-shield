import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { VerifiedWorksGallery } from "@/components/verified-works-gallery";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

function BlogPage() {
  return (
    <SiteLayout>
      <VerifiedWorksGallery />
    </SiteLayout>
  );
}
