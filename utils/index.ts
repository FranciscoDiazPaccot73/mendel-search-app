const COVER_URL = 'https://covers.openlibrary.org/b/id/'
const COVER_M = '-M.jpg';
const COVER_L = '-L.jpg';

export const getInitialSearchValues = (query: string | undefined) => {
  if (!query) return null;

  return query.replaceAll('+', ' ');
}

export const getCoverImageUrl = (id?: number) => {
  if (!id) return '/default-cover.jpg';

  return `${COVER_URL}${id}${COVER_M}`
}
