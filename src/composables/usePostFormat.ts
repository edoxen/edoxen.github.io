// Post formatting — pure functions shared by BlogIndex and BlogByline.
// Tests target this module directly; no Vue mount required.

export interface Post {
  date?: string
  authors?: string[]
  lastUpdated?: number
}

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatLastUpdated(timestamp: number | undefined): string {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Oxford-comma join for author lists.
//   ['A']            → 'A'
//   ['A','B']        → 'A & B'
//   ['A','B','C']    → 'A, B & C'
export function formatAuthors(authors: string[] | undefined): string {
  if (!authors || authors.length === 0) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`
  return authors.slice(0, -1).join(', ') + ' & ' + authors[authors.length - 1]
}
