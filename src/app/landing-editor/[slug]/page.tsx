import { LandingEditorClient } from "./LandingEditorClient";

export default async function LandingEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LandingEditorClient slug={slug} />;
}
