"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Older browsers and in-app webviews may block the async clipboard API. */
function legacyCopy(value: string) {
  const ta = document.createElement("textarea");
  ta.value = value;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  return ok;
}

export default function CopyButton({ value }: { value: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = legacyCopy(value);
    }
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
      aria-label={`Copy ${value}`}
    >
      {state === "copied" ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Press and hold to copy" : "Copy"}
      </span>
    </button>
  );
}
