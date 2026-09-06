import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkGrid from "@/components/WorkGrid";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={["Stills", "Motion", "Story"]} />
      <WorkGrid />
      <Marquee
        items={["Available 2026", "Booking now"]}
        direction="right"
        duration={34}
        className="text-ash"
      />
      <CTA />
    </main>
  );
}
