import { useState, useContext, useEffect, FC } from "react";

import { PageContext } from "@store/index";
import { searchBooks } from "@store/actions";

type SearchBarProps = {
  defaultSearch?: string
}

const SearchBar: FC<SearchBarProps> = ({ defaultSearch = '' }) => {
  const { dispatch, state: { isFetching } } = useContext(PageContext);
  const [inputValue, setValue] = useState<string>(defaultSearch);

  useEffect(() => {

  }, [])

  const handleChange = (e: { target: { value: string }; }) => {
    const { value } = e.target;
    setValue(value);
  }

  const handleSearch = () => {
    if (inputValue?.length >= 3) {
      searchBooks(dispatch, inputValue)
    }
  }

  const searchOnEnter = (e: { key: string; keyCode: number; }) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSearch()
    }
  }

  return (
    <header className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
      <div className="max-w-6xl mx-auto px-10 w-full relative">
        <input
          disabled={isFetching}
          value={inputValue}
          onKeyUp={searchOnEnter}
          onChange={handleChange}
          placeholder="Nombre del libro"
          className="text-black h-8 w-full pl-3 pr-16 overflow-hidden rounded-full"
          type="text"
        />
        <button disabled={isFetching} onClick={handleSearch} className="absolute right-12 top-1/2 -translate-y-1/2">Buscar</button>
      </div>
    </header>
  )
}

export default SearchBar;
