import type { Metadata } from "next";
import Aurora from "@/components/Aurora";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Enquire — John Cinematics",
  description:
    "Tell me the date, the place and roughly what you have in mind, and I'll come back with a plan and a number.",
};

export default function EnquirePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <Aurora intensity="mid" />

        <div className="relative mx-auto max-w-[900px] px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-48">
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
              plan and a number. Nothing here is binding &mdash; it just saves us
              both a round of questions.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-12 md:mt-16">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
