"use client";

import { useState } from "react";
import { whatsappNumber } from "@/lib/content";

const SERVICES = [
  "Pre-Wedding",
  "AD Wedding / ROM Solemnisation",
  "Proposal",
  "Videography",
  "Personal Events",
  "Corporate Events",
  "Others",
];

/** "2026-06-14" → "14 Jun 2026". Kept manual so it doesn't depend on locale. */
function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = months[Number(m) - 1];
  if (!month) return iso;
  return `${Number(d)} ${month} ${y}`;
}

/* Three distinct weights, because the form has three kinds of text in it
   and they were reading as one: the label asks the question, the
   placeholder shows the shape of an answer, and what you type is the
   answer. Placeholder and label were both text-ash — the same colour — so
   nothing looked fillable. The hint keeps ash, which is a cool grey, and
   the label moves to bone, which is warm: they now separate by hue as
   well as by lightness, which a plain lighter grey could not do without
   creeping up on the typed answer and making a filled field look empty.

   The underline was border-ink-3 against the panel, about 1.2:1, so the
   fields had no visible edge at all. bone/40 measures 3.42:1, clearing the
   3:1 WCAG asks of a control boundary (bone/35 came in at 2.96). */
const label = "text-[13px] uppercase tracking-[0.2em] text-bone/85";

const field =
  "w-full border-b border-bone/40 bg-transparent py-3 text-[15px] text-bone outline-none transition-colors placeholder:text-ash hover:border-bone/55 focus:border-ember";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const toggle = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Just your name, and you're good to go.");
      return;
    }

    if (!whatsappNumber) {
      setError(
        "This form isn't connected yet — set whatsappNumber in lib/content.ts.",
      );
      return;
    }

    setError("");

    /* Built as plain text because WhatsApp's ?text= carries no formatting.
       Empty fields drop out entirely rather than arriving as bare labels.
       Details are grouped so they stay on consecutive lines, while the
       greeting, message and email are separated by blank lines. */
    const details = [
      `Date: ${date ? formatDate(date) : "not confirmed yet"}`,
      venue.trim() ? `Venue: ${venue.trim()}` : "",
      services.length ? `Looking for: ${services.join(", ")}` : "",
    ].filter(Boolean);

    const text = [
      `Hi John! I'm ${name.trim()}.`,
      details.join("\n"),
      message.trim(),
      email.trim() ? `Email: ${email.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-10">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <label className="block">
          <span className={label}>
            Your name <span className="normal-case tracking-normal">(required)</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sarah &amp; Wei Ming"
            className={field}
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className={label}>
            Email <span className="normal-case tracking-normal">(optional)</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={field}
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className={label}>
            Date <span className="normal-case tracking-normal">(if you have one)</span>
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${field} [color-scheme:dark]`}
          />
        </label>

        <label className="block">
          <span className={label}>
            Venue or location{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </span>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="CHIJMES, or still deciding"
            className={field}
          />
        </label>
      </div>

      <fieldset className="mt-10">
        <legend className={label}>
          What are you after?
        </legend>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const on = services.includes(s);
            return (
              <label
                key={s}
                className="flex cursor-pointer items-center gap-3 text-[15px] text-bone"
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(s)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    on
                      ? "border-ember bg-ember text-ink"
                      : "border-bone/40 bg-bone/5 text-transparent"
                  }`}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current stroke-[2]">
                    <path d="M2 6.5 4.6 9 10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {s}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-10 block">
        <span className={label}>
          Anything else{" "}
          <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Tell me a bit about the two of you, or what you have in mind."
          className={`${field} resize-none`}
        />
      </label>

      {error && (
        <p role="alert" className="mt-6 text-[14px] text-ember">
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ember"
        >
          Send on WhatsApp
        </button>
        <p className="text-[13px] leading-relaxed text-ash">
          Opens WhatsApp with this filled in &mdash; you press send.
        </p>
      </div>
    </form>
  );
}
