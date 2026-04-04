import Navbar from "@/components/layout/Navbar";
import Footer2 from "@/components/layout/Footer2";
import HeroSlider from "@/components/sections/HeroSlider";
import EventsSection from "@/components/sections/EventsSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import AboutSection from "@/components/sections/AboutSection";
import QuoteSection from "@/components/sections/QuoteSection";
import MinistriesSection from "@/components/sections/MinistriesSection";
import StatsSection from "@/components/sections/StatsSection";
import SermonsSection from "@/components/sections/SermonsSection";
import PastorsSection from "@/components/sections/PastorsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactCTASection from "@/components/sections/ContactCTASection";
import BlogSection from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      {/* <EventsSection /> */}
      <WelcomeSection />
      <AboutSection />
      <QuoteSection />
      <MinistriesSection />
      {/* <StatsSection /> */}
      {/* <PastorsSection /> */}
      {/* <TestimonialsSection /> */}
      <SermonsSection />
      <ContactCTASection />
      <BlogSection />
      
      <Footer2 />
    </main>
  );
}
