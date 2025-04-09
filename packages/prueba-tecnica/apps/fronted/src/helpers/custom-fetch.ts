export async function customFetch (endpont: URL, options: RequestInit = {}) {
  const { href: url } = new URL(endpont)
  console.log(url)
  const defaultHeaders = {
    'accept': 'application/json'
  }

  options.method = options.method || 'GET'
  options.headers = options.headers ? { ...defaultHeaders, ...options.headers } : defaultHeaders

  if (options.body instanceof FormData === false) {
    options.body = options.body ? JSON.stringify(options.body) : undefined;
  }

  const res = await fetch(endpont, options)
  return res
}
