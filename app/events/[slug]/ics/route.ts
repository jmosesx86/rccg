import { events, eventBySlug, eventIcs } from "@/lib/content";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return new Response("Not found", { status: 404 });
  return new Response(eventIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
