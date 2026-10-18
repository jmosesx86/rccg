import { Plus } from "lucide-react";

export default function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-navy/10 rounded-3xl bg-white px-6 shadow-soft ring-1 ring-navy/5 sm:px-8">
      {items.map((f) => (
        <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-navy">
            {f.q}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-primary transition group-open:rotate-45 group-open:bg-primary group-open:text-white">
              <Plus size={18} />
            </span>
          </summary>
          <p className="mt-3 pr-12 leading-relaxed text-ink-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
