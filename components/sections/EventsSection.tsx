"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

const events = [
  {
    month: "Jan",
    day: "3",
    time: "8.00 am",
    title: "Our Sponsorship Meetup Will Be Held Again",
    href: "/events/details",
  },
  {
    month: "Feb",
    day: "12",
    time: "7.00 am",
    title: "Event: Reflect The Community And Serving",
    href: "/events/details",
  },
  {
    month: "Mar",
    day: "3",
    time: "6.00 am",
    title: "New Families During National Adoption Month",
    href: "/events/details",
  },
  {
    month: "Apr",
    day: "18",
    time: "12.00 pm",
    title: "Event: Lord is Sufficient for all of our needs",
    href: "/events/details",
  },
];

export default function EventsSection() {
  const [page, setPage] = useState(0);
  const totalPages = 2; // 4 events / 2 per page

  const goToPage = useCallback((p: number) => {
    setPage(p);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-30 -mt-[50px] pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Carousel track — padding all around for shadow breathing room */}
        <div className="overflow-hidden p-5 -m-5">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${page * 100}%)`,
            }}
          >
            {/* Page 1: events 0 & 1 */}
            <div className="w-full flex-none px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EventCard event={events[0]} />
                <EventCard event={events[1]} />
              </div>
            </div>

            {/* Page 2: events 2 & 3 */}
            <div className="w-full flex-none px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EventCard event={events[2]} />
                <EventCard event={events[3]} />
              </div>
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`rounded-full transition-all duration-300 ${
                i === page
                  ? "w-10 h-3 bg-[#bf0a30]"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to event page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <div className="event-card">
      <div className="flex items-start gap-5">
        {/* Date badge */}
        <div className="event-date-badge flex-shrink-0">
          {/* Clock pin icon */}
          <div className="event-clock-icon">
            <Clock size={14} className="text-white" />
          </div>

          {/* Date text */}
          <div
            className="font-bold text-[18px] leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="block">{event.month}</span>
            <span className="block text-2xl">{event.day}</span>
          </div>

          {/* Time bar at bottom */}
          <div className="event-time-bar">
            <span
              className="text-white text-xs font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {event.time}
            </span>
          </div>
        </div>

        {/* Event content */}
        <div className="flex-1 pt-1">
          <h5
            className="text-[#252525] text-lg font-bold leading-snug mb-3 hover:text-[#bf0a30] transition-colors cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "19px" }}
          >
            <Link href={event.href}>{event.title}</Link>
          </h5>
          <Link
            href={event.href}
            className="text-[#bf0a30] font-semibold text-sm border-b-2 border-[#bf0a30] hover:border-black hover:text-black transition-colors pb-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Event Details
          </Link>
        </div>
      </div>
    </div>
  );
}
