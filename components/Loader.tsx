import { FC } from "react";
import clsx from "clsx";

type LoaderPorps = {
  top?: string,
  position?: string,
}

const Loader: FC<LoaderPorps> = ({ top = 'top-30', position = 'absolute' }) => {
  const clases = clsx("left-1/2 -translate-x-1/2 z-10", top, position)

  return (
    <div className='fixed top-48 left-0 w-full h-full'>
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
    </div>
  )
}

export default Loader;
