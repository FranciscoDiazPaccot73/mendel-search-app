import { FC } from "react";
import clsx from "clsx";

type LoaderPorps = {
  top?: string,
}

const Loader: FC<LoaderPorps> = ({ top }) => {
  const clases = clsx("absolute left-1/2 -translate-x-1/2 z-10",  top ?? 'top-32')

    return (
    <div className={clases}>
      <div className="book">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div>
    </div>
  )
}

export default Loader;
