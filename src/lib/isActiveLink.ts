// Shared active-link heuristic for Nav and Sidebar.
// Replaces two divergent implementations:
//   Nav.astro:     currentPath.startsWith(link)
//   Sidebar.astro: currentPath === link || currentPath === link + '/'
//
// This version handles path-boundary matching: '/docs/motion' matches
// '/docs/motion' and '/docs/motion/' but NOT '/docs/motional'.
export function isActiveLink(currentPath: string, link?: string): boolean {
  if (!link) return false
  if (link === '/') return currentPath === '/'
  return currentPath === link
    || currentPath === link + '/'
    || currentPath.startsWith(link + '/')
}
