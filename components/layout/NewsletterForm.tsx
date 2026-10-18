"use client";
import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

/** Front-end only for now — shows a success state; wire to a mailing service later. */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80 ring-1 ring-white/10">
        <CheckCircle2 size={18} className="text-gold" /> Thank you! You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-5 pr-14 text-sm text-white placeholder:text-white/40 transition focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-primary text-white transition hover:bg-primary-light"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
