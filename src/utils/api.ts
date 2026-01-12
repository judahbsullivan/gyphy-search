const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY || '';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export interface GifData {
  id: string;
  title: string;
  images: {
    original: { url: string };
    fixed_height: { mp4: string };
  };
}

export interface GiphyResponse {
  data: GifData[];
  pagination: { total_count: number };
}

async function request<T>(path: string, params: Record<string, string | number> = {}, options: RequestInit = {}): Promise<T> {
  if (!GIPHY_API_KEY) throw new Error('MISSING_API_KEY');

  const searchParams = new URLSearchParams({ api_key: GIPHY_API_KEY, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  const response = await fetch(`${BASE_URL}${path}?${searchParams}`, options);

  if (response.status === 429) throw new Error('API_LIMIT_REACHED');
  if (!response.ok) throw new Error('Failed to fetch from GIPHY');

  return response.json();
}

export async function fetchGifs(query: string, offset = 0, limit = 20): Promise<GiphyResponse> {
  const endpoint = query ? '/search' : '/trending';
  const params = { limit, offset, ...(query ? { q: query } : {}) };
  return request<GiphyResponse>(endpoint, params, { next: { revalidate: 3600 } });
}

export async function fetchRandomGifs(limit = 3): Promise<GifData[]> {
  try {
    // Just use trending for "random" look or a single random call
    // If limit is small (like 3), we can just fetch trending with a random offset
    const randomOffset = Math.floor(Math.random() * 100);
    const res = await fetchGifs('', randomOffset, limit);
    return res.data;
  } catch (error) {
    console.error('Random fetch failed, falling back:', error);
    const res = await fetchGifs('', 0, limit);
    return res.data;
  }
}
