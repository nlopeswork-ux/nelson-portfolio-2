// One quote treatment for the whole site: large quote mark, serif italic text, quiet attribution.
// No bars, no boxes. `small` is for quotes inside cards (Work listing, testing rounds).
export default function Quote({ text, by, small = false }: { text: string; by?: string | null; small?: boolean }) {
  const clean = text.trim().replace(/^["\u201C\u201D]+|["\u201C\u201D]+$/g, '')
  const who = by ? by.trim().replace(/^[\u2014\u2013-]\s*/, '') : ''
  return (
    <figure className={`quote${small ? ' quote--sm' : ''}`}>
      <blockquote>{clean}</blockquote>
      {who && <figcaption>{`\u2014 ${who}`}</figcaption>}
    </figure>
  )
}
