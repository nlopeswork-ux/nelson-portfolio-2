export type Rect = { x: number; y: number; w: number; h: number }

// Squarified treemap (Bruls, Huizing, van Wijk). Pure geometry, no DOM.
export function squarify<T extends { weight: number }>(items: T[], box: Rect): (T & Rect)[] {
  const sorted = [...items].sort((a, b) => b.weight - a.weight)
  const total = sorted.reduce((sum, i) => sum + i.weight, 0)
  const scale = (box.w * box.h) / total
  const out: (T & Rect)[] = []
  let { x, y, w, h } = box
  let row: { item: T; area: number }[] = []

  const worst = (areas: number[], side: number) => {
    const sum = areas.reduce((a, b) => a + b, 0)
    return Math.max((side * side * Math.max(...areas)) / (sum * sum), (sum * sum) / (side * side * Math.min(...areas)))
  }

  const flush = () => {
    const sum = row.reduce((a, r) => a + r.area, 0)
    const thick = sum / Math.min(w, h)
    if (w >= h) {
      let cy = y
      for (const r of row) {
        const rh = r.area / thick
        out.push({ ...r.item, x, y: cy, w: thick, h: rh })
        cy += rh
      }
      x += thick
      w -= thick
    } else {
      let cx = x
      for (const r of row) {
        const rw = r.area / thick
        out.push({ ...r.item, x: cx, y, w: rw, h: thick })
        cx += rw
      }
      y += thick
      h -= thick
    }
    row = []
  }

  for (const item of sorted) {
    const area = item.weight * scale
    const current = row.map(r => r.area)
    if (row.length && worst([...current, area], Math.min(w, h)) > worst(current, Math.min(w, h))) flush()
    row.push({ item, area })
  }
  if (row.length) flush()
  return out
}
