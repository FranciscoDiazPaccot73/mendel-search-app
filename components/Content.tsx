import { useContext, FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Card from './Card';
import Modal from './ModalInfo';
import Spinner from './Spinner';
import { ContentWithImage } from './ModalInfo';

import { DEFAULT_LIMIT } from '@utils/constants';
import { PageContext } from '@store/index';
import { getMoreBooks } from '@store/actions';
import { BookCriticalInfoClient } from '@pages/types';
import { getBooksToShow } from '@/utils';

type ContentProps = {
  books: BookCriticalInfoClient[]
  totalBooks?: number
}

const Content: FC<ContentProps> = ({ books, totalBooks }) => {
  const { dispatch, state: { isFetching, currentPage = 1, searchValue, isISFetching } } = useContext(PageContext);
  const [selectedBook, setSelectedBook] = useState<ContentWithImage | null>();
  const hasMore = totalBooks ? DEFAULT_LIMIT * currentPage < totalBooks : false;
  const booksToShow = getBooksToShow(books);

  const getMorePost = () => {
    if (totalBooks && hasMore) {
      const inputElem = document.getElementById('search-input') as HTMLInputElement;
      const inputValue = searchValue ?? inputElem?.value;
      getMoreBooks(dispatch, currentPage, inputValue)
    }
  };

  const onExpand = (book: BookCriticalInfoClient, coverImage: string) => {
    setSelectedBook({ ...book, coverImage })
  }
  
  const handleResetModal = () => {
    setSelectedBook(null);
  }

  return (
    <div className='relative'>
      <motion.div
        animate={{
          scale: isFetching || selectedBook ? 0.95 : 1,
          opacity: isFetching || selectedBook ? 0.5 : 1
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <AnimatePresence>
          <div className='grid gap-6 text-center md:grid-cols-cards'>
            {booksToShow?.map((book: BookCriticalInfoClient, index: number) => (
              <Card key={book.key} book={book} isLast={index === booksToShow.length - 1} next={getMorePost} onExpand={onExpand} />
            ))}
          </div>
        </AnimatePresence>
        {isISFetching ? <Spinner /> : null}
      </motion.div>
      <Modal content={selectedBook} resetModal={handleResetModal} />
    </div>
  )
}

export default Content;
