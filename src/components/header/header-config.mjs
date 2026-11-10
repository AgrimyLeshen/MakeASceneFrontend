/**
 * @template T
 * @param {{ path: string, config: T } | null} entry
 * @param {string} pathname
 * @returns {T | null}
 */
export function getHeaderConfigForPath(entry, pathname) {
  return entry?.path === pathname ? entry.config : null;
}
