import Link from "next/link";
import type { ReactNode } from "react";

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Red call-to-action panel used at the end of inner pages. */
export default function CtaBand({ eyebrow, title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="bg-white py-20">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary px-8 py-14 text-center text-white sm:px-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_0%_0%,rgba(255,255,255,0.18),transparent),radial-gradient(500px_300px_at_100%_100%,rgba(10,26,51,0.45),transparent)]" />
          {eyebrow && <span className="eyebrow justify-center text-white/90">{eyebrow}</span>}
          <h2 className="heading-lg mx-auto mt-3 max-w-2xl text-white">{title}</h2>
          {text && <p className="mx-auto mt-4 max-w-xl text-white/90">{text}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn btn-lg bg-white text-primary hover:-translate-y-0.5 hover:bg-cream">
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn-outline btn-lg">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
