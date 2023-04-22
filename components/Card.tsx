import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookCriticalInfoClient } from "@/pages/types";
import { getCoverImageUrl } from "@/utils";

type BookProps = {
  book: BookCriticalInfoClient
}

const Card: FC<BookProps> = ({ book }) => {
  const { author, authorId, cover, key, publish, title } = book;

  if (!title) return null;

  const coverImgUrl = getCoverImageUrl(cover);

  return (
    <Link
      href={`${key}?author=${authorId}`}
      className="h-38 grid grid-cols-content overflow-hidden gap-3 group rounded-lg border border-transparent px-2 py-3 transition-colors bg-light-secondary dark:bg-dark-secondary md:hover:border-gray-300 md:hover:bg-gray-100 md:hover:dark:border-neutral-700 md:hover:dark:bg-neutral-800/30"
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
    </Link>
  )
}

export default Card;
