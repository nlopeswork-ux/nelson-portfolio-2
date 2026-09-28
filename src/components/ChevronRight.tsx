export default function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="cta-arrow"
      style={{ flexShrink: 0 }}
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}
