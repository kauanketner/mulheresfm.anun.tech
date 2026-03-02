export default function GoldDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold opacity-40" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
      >
        <rect
          x="8"
          y="0"
          width="8"
          height="8"
          transform="rotate(45 8 0)"
          fill="#D3B257"
          opacity="0.8"
        />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold opacity-40" />
    </div>
  );
}
