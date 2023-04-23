import Image from 'next/image'

const Footer = () => (
  <div className="fixed bottom-0 left-0 flex h-32 w-full pt-16 items-center justify-center bg-gradient-to-t from-black via-black text-xs">
    <a
      className="mx-3"
      href="https://mendel.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/mendel.svg"
        alt="Mendel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </a>
    <span className='hidden md:block md:mr-3'>Frontend challenge</span>
    By{' '}
    <a
      className="ml-2"
      href="https://www.franciscodiazpaccot.dev"
      target="_blank"
      rel="noopener noreferrer"
    >
      Francisco Diaz Paccot
    </a>
  </div>
)

export default Footer;
