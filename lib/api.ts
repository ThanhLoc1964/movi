const BASE_URL = 'https://phim.nguonc.com/api';

export const fetchMovies = async (endpoint: string, page: number = 1) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?page=${page}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};

export const fetchMovieDetail = async (slug: string) => {
  try {
    const res = await fetch(`${BASE_URL}/film/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};

export const searchMovies = async (keyword: string) => {
  try {
    const res = await fetch(`${BASE_URL}/films/search?keyword=${encodeURIComponent(keyword)}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};