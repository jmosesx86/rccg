"use client";
import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type FormShellProps = {
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successText: ReactNode;
  className?: string;
  /** Called with the form values; front-end only for now. */
  onSubmit?: (data: Record<string, FormDataEntryValue>) => void;
};

/**
 * Front-end only form wrapper: native validation, a short sending state and a success panel.
 * Wire `onSubmit` to an API route or form service when a backend is chosen.
 */
export default function FormShell({ children, submitLabel, successTitle, successText, className = "", onSubmit }: FormShellProps) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    onSubmit?.(data);
    setTimeout(() => setState("done"), 700);
  }

  if (state === "done") {
    return (
      <div className={`flex flex-col items-center rounded-3xl bg-white p-10 text-center shadow-soft ring-1 ring-navy/5 ${className}`} role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary">
          <CheckCircle2 size={32} />
        </span>
        <h3 className="mt-6 text-2xl">{successTitle}</h3>
        <div className="mt-3 max-w-md text-ink-muted">{successText}</div>
        <button type="button" onClick={() => setState("idle")} className="btn-outline-dark mt-8">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handle} className={`rounded-3xl bg-white p-6 shadow-soft ring-1 ring-navy/5 sm:p-10 ${className}`}>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      <button type="submit" disabled={state === "sending"} className="btn-primary btn-lg mt-8 w-full sm:w-auto">
        {state === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
