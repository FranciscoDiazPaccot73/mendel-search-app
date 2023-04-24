import { FC, useContext, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Description from "./Description";
import Author from "./Author";

import { BookCriticalInfoClient } from "@pages/types";
import { PageContext } from "@store/index";
import { getBookAction, resetModalValues, getAuthorAction } from "@store/actions";

export interface ContentWithImage extends BookCriticalInfoClient {
  coverImage: string
}

type ModalProps = {
  content?: ContentWithImage | null
  resetModal: () => void
}

const Modal: FC<ModalProps> = ({ content, resetModal }) => {
  const { dispatch, state: { bookInfo, author } } = useContext(PageContext);

  useEffect(() => {
    if (content) {
      getBookAction(dispatch, content.key)
      getAuthorAction(dispatch, content.authorId)
    }
  }, [content])

  const handleReset = () => {
    resetModal();
    resetModalValues(dispatch);
  }

  return (
    <AnimatePresence>
      {content && (
        <div className="z-20 px-5 fixed h-full w-full flex overflow-y-auto justify-center top-0 left-0 pt-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{
              y: -50,
              opacity: 0
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute t-0 min-h-[320px] z-10 p-7 h-auto w-full max-w-xs rounded my-7 shadow-md md:max-w-2xl bg-dark-secondary"
          >
            <button
              aria-label="Close modal"
              onClick={handleReset}
              className="absolute top-0 right-0 -mt-4 -mr-4 border border-slate-600 h-8 w-8 block mb-2 rounded-full text-white bg-dark-secondary"
            >
              &times;
            </button>
            <div className="overflow-y-auto max-h-modal-dialog">
              <div className="relative overflow-hidden h-auto w-full flex flex-col items-center gap-2">
                <p className="w-full text-center font-bold text-xl mb-3 text-white md:hidden">{content.title}</p>
                <Image
                  className="md:hidden"
                  src={content.coverImage}
                  alt={content?.key}
                  width={180}
                  height={300}
                />
                <aside className="w-full">
                  <p className="w-full text-center font-bold text-xl mb-3 text-white hidden md:block">{content.title}</p>
                  <p className="m-0 text-sm w-full text-start font-bold mb-5">
                    Primera publicacion: <span className="opacity-50 font-normal">{content.publish ?? '-'}</span>
                  </p>
                  <p>
                    <Image
                      className="hidden float-left mr-4 mb-1 md:block"
                      src={content.coverImage}
                      alt={content?.key}
                      width={180}
                      height={300}
                    />
                    <Description bookInfo={bookInfo} />
                  </p>
                </aside>
                <Author author={author} name={content.author} />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={handleReset}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal;
