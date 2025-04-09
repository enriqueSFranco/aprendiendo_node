import { createRequire } from 'node:module'

/**
 * @param url {string}
*/
export function loadFile (url) {
  const require = createRequire(import.meta.url)
  return require(url)
}