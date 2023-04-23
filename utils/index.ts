import { BookCriticalInfo } from "@/pages/types";

const COVER_URL = 'https://covers.openlibrary.org/b/id/'
const COVER_S = '-S.jpg';
const COVER_M = '-M.jpg';
const COVER_L = '-L.jpg';

export const getInitialSearchValues = (query?: string) => {
  if (!query) return null;

  return query.replaceAll('+', ' ');
}

export const getCoverImageUrl = (id?: number, size?: string) => {
  if (!id) return '/default-cover.jpg';

  if (!size) return `${COVER_URL}${id}${COVER_M}`;

  const sizes = {
    sm: COVER_S,
    lg: COVER_L,
  }

  if (size in sizes) {
    const key = size as keyof typeof sizes;
    return `${COVER_URL}${id}${sizes[key]}`;
  }

  return `${COVER_URL}${id}${COVER_M}`
}

export const encodeUrl = (value: string) => value.replaceAll(' ', '+');

export const updateUri = (values: string) => {
  window.history.replaceState({}, '', `?q=${encodeUrl(values)}`)
}

export const extractCriticalInfo = (arrayOfBooks: BookCriticalInfo[]) => {
  return arrayOfBooks.map(({ key, title, first_publish_year, author_name, author_key, cover_i }: BookCriticalInfo) => {
    const publish = first_publish_year ?? ''
    const author = author_name ? author_name[0] : '';
    const authorId = author_key ? author_key[0] : '';
    const cover = cover_i ?? null;

    return ({ key, title, publish, author, authorId, cover })
  })
}
