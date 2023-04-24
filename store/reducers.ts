export const types = {
  FETCHING: 'FETCHING',
  SET_INFINITE_SCROLL_FETCHING: 'set/INFINITE_SCROLL_FETCHING',
  SET_CONTENT: 'set/CONTENT',
  SET_INPUT_VALUE: 'set/INPUT_VALUE',
  SET_CURRENT_PAGE: 'set/CURRENT_PAGE',
  SET_AUTHOR: 'set/AUTHOR',
  SET_TRENDINGS: 'set/TRENDINGS',
  SET_BOOK_INFO: 'set/BOOK_INFO',
  UPDATE_CONTENT: 'update/CONTENT',
};

export const init = (config: any) => {
  return {
    ...config,
  };
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCHING: {
      return {...state, isFetching: action.value}
    }
    case types.SET_TRENDINGS: {
      return {...state, trendings: action.content}
    }
    case types.SET_INFINITE_SCROLL_FETCHING: {
      return {...state, isISFetching: action.value}
    }
    case types.SET_AUTHOR: {
      return {...state, author: action.author}
    }
    case types.SET_BOOK_INFO: {
      return {...state, bookInfo: action.info}
    }
    case types.SET_CURRENT_PAGE: {
      return {...state, currentPage: action.page}
    }
    case types.SET_CONTENT: {
      return {...state, content: action.content}
    }
    case types.UPDATE_CONTENT: {
      const { content } = state;
      const { newContent } = action;

      const newBooks = [...content.books, ...newContent.books];
      return {...state, content: { ...newContent, books: newBooks }}
    }
    case types.SET_INPUT_VALUE: {
      return {...state, searchValue: action.searchValue}
    }
    default:
      return null;
  }
};
