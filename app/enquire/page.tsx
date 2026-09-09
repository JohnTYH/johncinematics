import type { Metadata } from "next";
import Aurora from "@/components/Aurora";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { abs } from "@/lib/site";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Tell me the date, the place and roughly what you have in mind. I’ll shape a plan around your vision and come back with a proposal that fits.",
  alternates: { canonical: abs("/enquire") },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EnquirePage() {
  return (
    <main>
      <JsonLd data={faqSchema} />
      <section className="relative overflow-hidden">
        <Aurora intensity="mid" />

        <div className="relative mx-auto max-w-[1000px] px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-48">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.2em] text-ash">
              Enquire
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-6 text-[16vw] leading-[0.86] text-bone md:text-[7vw]">
              Get in Touch.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-pretty text-[15px] leading-relaxed text-ash md:text-base">
              A few details is all I need to check the date and come back with a
              plan tailored to you. Nothing here is binding &mdash; it just saves us
              both a round of questions.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-12 md:mt-16">
            <EnquiryForm />
          </Reveal>

          {/* Answers to what people ask before enquiring. Marked up as
              FAQPage so each one can be quoted directly by search and
              answer engines. */}
          <section className="mt-24 md:mt-32">
            <Reveal>
              <h2 className="display text-[11vw] leading-[0.92] text-bone md:text-[3.4vw]">
                Common questions
              </h2>
            </Reveal>

            <dl className="mt-10 md:mt-12">
              {faqs.map((f, i) => (
                <Reveal
                  key={f.q}
                  delay={(i % 3) * 70}
                  className="border-t border-ink-3 py-7 md:grid md:grid-cols-12 md:gap-10"
                >
                  <dt className="text-[15px] text-bone md:col-span-5 md:text-base">
                    {f.q}
                  </dt>
                  <dd className="mt-3 text-pretty text-[15px] leading-relaxed text-bone/65 md:col-span-7 md:mt-0">
                    {f.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </section>
        </div>
      </section>
    </main>
  );
}
