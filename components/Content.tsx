import { useContext, FC } from 'react';
import { motion } from 'framer-motion';

import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '@components/Card';
import Spinner from './Spinner';

import { DEFAULT_LIMIT } from '@utils/constants';
import { PageContext } from '@store/index';
import { getMoreBooks } from '@store/actions';
import { BookCriticalInfoClient } from '@/pages/types';

type ContentProps = {
  books: BookCriticalInfoClient[]
  totalBooks?: number
}

const Content: FC<ContentProps> = ({ books, totalBooks }) => {
  const { dispatch, state: { isFetching, currentPage = 1, searchValue } } = useContext(PageContext);

  const hasMore = totalBooks ? DEFAULT_LIMIT * currentPage < totalBooks : false;

  const getMorePost = () => {
    console.log("llegamos hasta aca?")
    if (totalBooks) {
      getMoreBooks(dispatch, currentPage, searchValue)
    }
  };

  console.log(hasMore)

  return (
    <motion.div
      animate={{
        scale: isFetching ? 0.95 : 1,
        opacity: isFetching ? 0.5 : 1
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      <InfiniteScroll
        dataLength={books.length}
        className='grid gap-6 text-center md:grid-cols-cards'
        next={getMorePost}
        hasMore={hasMore}
        loader={<Spinner />}
        scrollableTarget="main-container"
      >
        {books?.map((book: BookCriticalInfoClient) => <Card key={book.key} book={book} />)}
      </InfiniteScroll>
    </motion.div>
  )
}

export default Content;
