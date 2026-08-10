import { redirect } from "next/navigation";

export default async function VehicleSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/oferta?slug=${encodeURIComponent(slug)}`);
}
