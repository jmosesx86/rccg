import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const onDark = tone === "light";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${onDark ? "eyebrow-light" : ""} ${centered ? "justify-center" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`heading-lg mt-4 ${onDark ? "text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${onDark ? "text-white/70" : "text-ink-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
