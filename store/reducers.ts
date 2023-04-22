export const types = {
  FETCHING: 'FETCHING',
  SET_CONTENT: 'set/CONTENT',
  SET_INPUT_VALUE: 'set/INPUT_VALUE',
  SET_CURRENT_PAGE: 'set/CURRENT_PAGE',
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
