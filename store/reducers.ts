export const types = {
  FETCHING: 'FETCHING',
  SET_CONTENT: 'set/CONTENT'
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
    case types.SET_CONTENT: {
      return {...state, content: action.content}
    }
    default:
      return null;
  }
};
