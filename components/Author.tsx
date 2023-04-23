import Image from "next/image";
import Skeleton from "./Skeleton";

import { getCoverImageUrl } from "@/utils";

const Author = ({ author, name }: any) => {
  const authorCover = author?.photos ? getCoverImageUrl(author?.photos[0], 'sm') : null;

  const Element = author?.wikipedia ? 'a' : 'span';
  const elementProps = author?.wikipedia ? { href: author?.wikipedia, target: '_blank' } : {};

  const renderAuthorContent = () => {
    if (!author)  return <Skeleton />;
  
    if (!author.bio) return <p>No hay informacion sobre este autor.</p>;
  
    return author?.bio
  }

  return (
    <div className="w-full mt-6">
      <p className="text-xl font-bold mb-4">Autor: <Element {...elementProps} className="underline text-lg ml-1">{name}</Element></p>
      <p>
        {authorCover ? (
          <Image
            className="mr-4 mb-1 float-left"
            src={authorCover}
            alt={author?.key}
            width={60}
            height={80}
          />
        ) : null}
        {renderAuthorContent()}
      </p>
    </div>
  )
}

export default Author;
