const apiBase = 'https://rickandmortyapi.com/api';
const pageCache = new Map();
const cacheDuration = 5 * 60 * 1000;

const fetchPage = async function fetchPage(url, signal) {
  const cached = pageCache.get(url);

  signal.throwIfAborted();

  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  //Cancel when leaving the page or when an individual request takes too long
  const response = await fetch(url, {
    method: 'GET',
    signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
  });

  if (response.status === 429) {
    throw new Error('The API is limiting requests. Please wait and try again.');
  }

  if (!response.ok) {
    throw new Error(`The API returned HTTP ${response.status}.`);
  }

  const data = await response.json();

  if (
    !Array.isArray(data?.results)
    || !(data.info?.next === null || typeof data.info?.next === 'string')
    || data.info.next === ''
  ) {
    throw new Error('The API returned invalid data or pagination information.');
  }

  //Cache only successful, validated responses
  pageCache.set(url, { data, expiresAt: Date.now() + cacheDuration });
  return data;
};

const getData = async function getData(resource, signal, limit = Infinity) {
  const records = [];
  const visited = new Set();
  let nextUrl = `${apiBase}/${resource}`;

  while (nextUrl && records.length < limit) {
    const url = new URL(nextUrl);

    //Accept only pagination links for the resource requested
    if (
      url.origin !== 'https://rickandmortyapi.com'
      || url.pathname.replace(/\/$/, '') !== `/api/${resource}`
      || visited.has(url.href)
    ) {
      throw new Error('The API returned an invalid pagination link.');
    }

    visited.add(url.href);

    //Each request needs the previous page's next link
    //eslint-disable-next-line no-await-in-loo
    const data = await fetchPage(url.href, signal);

    records.push(...data.results);
    nextUrl = data.info.next;
  }

  //KEEP API FIELDS 
  //ADD: display key, even when a record or ID is missing
  //Page order stays unchanged in these read-only lists
  return records.slice(0, limit).map((record, index) => ({
    ...record,
    displayKey: `${resource}-${index}`,
  }));
};

export default getData;
