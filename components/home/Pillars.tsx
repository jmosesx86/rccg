import { Flame, BookOpen, HandHeart, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const pillars = [
  {
    icon: Flame,
    title: "Spirit-filled worship",
    text: "Vibrant, heartfelt praise and worship where you can encounter the presence of God.",
  },
  {
    icon: BookOpen,
    title: "Bible-based teaching",
    text: "Practical, life-giving messages rooted in the Word of God for everyday living.",
  },
  {
    icon: HandHeart,
    title: "Powerful prayer",
    text: "A praying church that believes God still answers, heals, restores and delivers.",
  },
  {
    icon: Users,
    title: "Genuine family",
    text: "People from every background and nation, doing life together in love.",
  },
];

export default function Pillars() {
  return (
    <section className="section bg-cream">
      <div className="container-site">
        <SectionHeading
          eyebrow="What to expect"
          title="Church the way it was meant to be"
          description="From the moment you walk in, you'll be welcomed like family. Here's what makes Agape House home."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="h-full">
              <div className="card card-hover group relative h-full overflow-hidden p-8">
                <span aria-hidden="true" data-num={`0${i + 1}`} className="absolute -right-6 -top-6 font-display text-[7rem] leading-none text-navy/[0.04] transition group-hover:text-primary/10 before:content-[attr(data-num)]" />
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold-light transition duration-300 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white">
                  <Icon size={26} />
                </span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
