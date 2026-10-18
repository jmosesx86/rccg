import { church } from "@/lib/church";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-3xl bg-cream-dark shadow-soft ring-1 ring-navy/5 ${className}`}>
      <iframe
        src={church.address.embedUrl}
        title={`Map to ${church.name}, ${church.address.full}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[320px] w-full border-0 grayscale-[30%]"
      />
    </div>
  );
}
