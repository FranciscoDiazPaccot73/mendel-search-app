import { useMemo, useReducer, createContext, FC, PropsWithChildren } from 'react';

import { reducer, init } from './reducers';
import { AppContextType } from './types';

export const contextDefaultValues = {
  state: {
    list: [],
  },
  dispatch: () => {},
};

export const PageContext = createContext<AppContextType>(contextDefaultValues);

const PageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {}, init);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
};

export default PageProvider;
