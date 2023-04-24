import { useState, useContext, FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { PageContext } from "@store/index";
import { searchBooks, setContent } from "@store/actions";

type SearchBarProps = {
  defaultSearch?: string
}

const SearchBar: FC<SearchBarProps> = ({ defaultSearch }) => {
  const { dispatch, state: { isFetching, trendings } } = useContext(PageContext);
  const [inputValue, setValue] = useState<string>(defaultSearch ?? '');

  const handleChange = (e: { target: { value: string }; }) => {
    const { value } = e.target;
    setValue(value);
  }

  const handleSearch = () => {
    if (inputValue?.length >= 3) {
      scrollTo(0,0)
      searchBooks(dispatch, inputValue)
    }
  }

  const searchOnEnter = (e: { key: string; keyCode: number; }) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSearch()
    }
  }

  const resetAndReturn = () => {
    setValue('')
    setContent(dispatch, trendings)
  }

  return (
    <header className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit">
      <div className="max-w-6xl mx-auto px-10 w-full relative">
        <Link onClick={resetAndReturn} href="/" className="absolute top-1/2 -translate-y-1/2 w- left-10">
          <Image src='/home-icon.svg' height={30} width={30} alt="Home icon" />
        </Link>
        <input
          id="search-input"
          disabled={isFetching}
          value={inputValue}
          onKeyUp={searchOnEnter}
          onChange={handleChange}
          placeholder="Nombre del libro"
          className="h-10 w-input-40 ml-10 pl-4 pr-16 overflow-hidden rounded-full bg-dark-secondary text-white"
          type="text"
        />
        <button
          disabled={isFetching}
          onClick={handleSearch}
          className="absolute h-full px-2 right-10 top-1/2 -translate-y-1/2 border-l rounded-br-full rounded-tr-full border-light-secondary border-opacity-30 md:hover:bg-dark-main"
        >
          Buscar
        </button>
      </div>
    </header>
  )
}

export default SearchBar;
