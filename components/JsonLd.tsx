/**
 * Structured data. Search engines use it for rich results; answer engines
 * lean on it heavily when deciding what a page is actually about, which is
 * why it matters more here than the meta tags do.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own data — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
