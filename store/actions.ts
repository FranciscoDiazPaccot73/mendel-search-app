import { types } from './reducers';

import { searchBookService, getBook, getAuthor } from '@services/index';
import { updateUri } from '@utils/index';
import { DEFAULT_LIMIT } from '@utils/constants';
import { ServerSideProps } from '@/pages';

export const isFetching = (dispatch: React.Dispatch<any>, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const infiniteScrollFetching = (dispatch: React.Dispatch<any>, value: boolean) => {
  dispatch({ type: types.SET_INFINITE_SCROLL_FETCHING, value });
};

export const setInitialValues = (dispatch: React.Dispatch<any>, search: string, content: ServerSideProps | {}) => {
  dispatch({ type: types.SET_INPUT_VALUE, searchValue: search });
  dispatch({ type: types.SET_CONTENT, content });
}

export const getBookAction = async (dispatch: React.Dispatch<any>, key: string) => {
  try {
    const { data } = await getBook(key);
    dispatch({ type: types.SET_BOOK_INFO, info: data })
  } catch (error) {
    console.error(error);
  }
};

export const getAuthorAction = async (dispatch: React.Dispatch<any>, key: string) => {
  try {
    const { data } = await getAuthor(key);
    dispatch({ type: types.SET_AUTHOR, author: data })
  } catch (error) {
    console.error(error);
  }
};

export const resetModalValues = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: types.SET_AUTHOR, author: null })
  dispatch({ type: types.SET_BOOK_INFO, info: null })
}

export const searchBooks = async (dispatch: React.Dispatch<any>, title: string) => {
  isFetching(dispatch, true)
  
  try {
    dispatch({ type: types.SET_INPUT_VALUE, searchValue: title });
    updateUri(title);
    const { data } = await searchBookService(title);
    dispatch({ type: types.SET_CONTENT, content: data });
  } catch (err) {
    console.log(err)
  } finally {
    isFetching(dispatch, false)
  }
};

export const getMoreBooks = async (dispatch: React.Dispatch<any>, currentPage: number, title: string) => {
  const nextPage = currentPage + 1;
  const offset = DEFAULT_LIMIT * currentPage;
  infiniteScrollFetching(dispatch, true)
  
  try {
    const { data } = await searchBookService(title, DEFAULT_LIMIT, offset);
    dispatch({ type: types.SET_CURRENT_PAGE, page: nextPage });
    dispatch({ type: types.UPDATE_CONTENT, newContent: data });
  } catch (err) {
    console.log(err)
  } finally {
    infiniteScrollFetching(dispatch, true)
  }
}
