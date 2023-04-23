import { FC, useEffect, useRef } from "react";
import Image from "next/image";

import { BookCriticalInfoClient } from "@pages/types";
import { getCoverImageUrl } from "@utils/index";

type BookProps = {
  book: BookCriticalInfoClient
  next: () => void
  isLast: boolean
  onExpand: (book: BookCriticalInfoClient, coverImage: string) => void
}

const Card: FC<BookProps> = ({ book, isLast, next, onExpand }) => {
  const { author, cover, key, publish, title } = book;
  const cardRef = useRef(null);

  if (!title) return null;

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        next();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  const coverImgUrl = getCoverImageUrl(cover);

  return (
    <div
      onClick={() => onExpand(book, coverImgUrl)}
      ref={cardRef}
      className="cursor-pointer h-38 grid grid-cols-content overflow-hidden gap-3 group rounded-lg border border-transparent px-2 py-3 transition-colors bg-dark-secondary md:hover:bg-gray-100 md:hover:border-neutral-700 md:hover:bg-neutral-800/30"
    >
      <aside className="w-20 flex flex-col items-center min-h-[110px]">
        <Image alt={title} src={coverImgUrl} width={70} height={120} />
      </aside>
      <aside className="overflow-hidden">
        <h2 title={title} className="mb-4 text-lg font-semibold md:text-xl">
          <p className="md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            {title}
          </p>
        </h2>
        <p className="m-0 text-sm w-full text-start font-bold">
          Autor: <span className="opacity-50 font-normal">{author}</span>
        </p>
        {publish ? (
          <p className="m-0 text-sm w-full text-start font-bold">
            Primera publicacion: <span className="opacity-50 font-normal">{publish}</span>
          </p>
        ) : null}
      </aside>
    </div>
  )
}

export default Card;
