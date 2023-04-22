import { types } from './reducers';

import { searchBookService } from '@/services';
import { updateUri } from '@/utils';
import { DEFAULT_LIMIT } from '@/utils/constants';
import { ServerSideProps } from '@/pages';

export const isFetching = (dispatch: React.Dispatch<any>, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const setInitialValues = (dispatch: React.Dispatch<any>, search: string, content: ServerSideProps | {}) => {
  dispatch({ type: types.SET_INPUT_VALUE, searchValue: search });
  dispatch({ type: types.SET_CONTENT, content });
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
  
  try {
    const { data } = await searchBookService(title, DEFAULT_LIMIT, offset);
    dispatch({ type: types.SET_CURRENT_PAGE, page: nextPage });
    dispatch({ type: types.UPDATE_CONTENT, newContent: data });
  } catch (err) {
    console.log(err)
  }  
}
