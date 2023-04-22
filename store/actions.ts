import { types } from './reducers';

import { searchBookService } from '@/services';

export const isFetching = (dispatch: React.Dispatch<any>, value: boolean) => {
  dispatch({ type: types.FETCHING, value });
};

export const searchBooks = async (dispatch: React.Dispatch<any>, title: string) => {
  isFetching(dispatch, true)
  
  try {
    const { data } = await searchBookService(title);
    dispatch({ type: types.SET_CONTENT, content: data });
  } catch (err) {
    console.log(err)
  } finally {
    isFetching(dispatch, false)
  }
};
