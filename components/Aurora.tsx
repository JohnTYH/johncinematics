type Props = {
  /** Position/scale of the two blobs, as Tailwind classes on the wrapper. */
  className?: string;
  intensity?: "low" | "mid" | "high";
};

const alpha = { low: 0.1, mid: 0.16, high: 0.24 } as const;

/**
 * Soft colour field. Purely decorative, but load-bearing for the glass:
 * `backdrop-filter` needs something behind it worth blurring.
 */
export default function Aurora({ className = "", intensity = "mid" }: Props) {
  const a = alpha[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute left-[-10%] top-[-20%] h-[70vh] w-[60vw] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, rgba(232,176,75,${a}) 0%, transparent 70%)`,
          animation: "aurora-a 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-25%] right-[-10%] h-[70vh] w-[55vw] rounded-full blur-[130px]"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, rgba(90,120,200,${a * 0.85}) 0%, transparent 70%)`,
          animation: "aurora-b 28s ease-in-out infinite",
        }}
      />
    </div>
  );
}
