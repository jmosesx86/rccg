"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";

/** Uses the native share sheet where available, otherwise copies the page link. */
export default function ShareButton({ title, className = "btn-outline-dark" }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* cancelled */
    }
  }

  return (
    <button type="button" onClick={share} className={className}>
      {copied ? <Check size={16} /> : <Share2 size={16} />} {copied ? "Link copied" : "Share"}
    </button>
  );
}
