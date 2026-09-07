import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkGrid from "@/components/WorkGrid";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, INSTAGRAM, abs, absFile, OG_IMAGE } from "@/lib/site";
import { collections } from "@/lib/content";

export default function Home() {
  /* What the business is, where it works, and what it offers. This is the
     block answer engines read when deciding whether to name you in a reply
     to "wedding photographer in Singapore". */
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${abs("/")}#business`,
    name: SITE_NAME,
    url: abs("/"),
    image: absFile(OG_IMAGE),
    description:
      "Wedding, proposal and event photography and videography in Singapore.",
    areaServed: { "@type": "Country", name: "Singapore" },
    address: { "@type": "PostalAddress", addressCountry: "SG" },
    founder: { "@type": "Person", name: "John Tan" },
    foundingDate: "2021",
    knowsAbout: [
      "Wedding photography",
      "Proposal photography",
      "Pre-wedding photography",
      "Event photography",
      "Wedding videography",
    ],
    sameAs: [INSTAGRAM],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography and videography",
      itemListElement: collections.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.name, description: c.blurb },
        url: abs(`/work/${c.slug}`),
      })),
    },
  };

  return (
    <main>
      <JsonLd data={business} />
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
