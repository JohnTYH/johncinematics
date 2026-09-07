import Link from "next/link";
import { publishedCollections } from "@/lib/content";

const columns = [
  {
    // Generated, so adding a collection updates the footer for free.
    title: "Work",
    links: publishedCollections.map((c) => ({
      label: c.name,
      href: `/work/${c.slug}`,
    })),
  },
  {
    title: "Site",
    links: [
      { label: "What I shoot", href: "/#work" },
      { label: "About", href: "/about" },
      { label: "Enquire", href: "/enquire" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/johncinematics/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-3">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-12">
          <div className="col-span-3">
            <Link
              href="/"
              className="display text-xl tracking-[0.08em] text-bone"
            >
              John<span className="text-ember">.</span>Cinematics
            </Link>
            {/* <p className="mt-4 text-[13px] leading-relaxed text-ash">
              Photography and motion. Singapore, and wherever the work is.
            </p> */}
          </div>

          {columns.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-3">
              <p className="text-[13px] uppercase tracking-[0.2em] text-ash">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 md:mt-5 md:space-y-3">
                {col.links.map((link) => {
                  /* Anything absolute leaves the site, so it gets a plain
                     anchor with target/rel rather than a client-side <Link>.
                     Detected from the href so adding another profile later
                     needs no extra flag. */
                  const external = link.href.startsWith("http");
                  const style =
                    "text-[14px] text-bone/70 transition-colors hover:text-ember";

                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={style}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={style}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-3 pt-6 text-[12px] text-ash md:mt-16 md:flex-row md:items-center md:justify-between md:gap-3 md:pt-8">
          <p>&copy; {new Date().getFullYear()} John Cinematics.</p>
        </div>
      </div>
    </footer>
  );
}
