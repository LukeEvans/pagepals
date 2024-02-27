import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-white shadow">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link
          href="/"
          className="title-font mb-4 flex items-center font-medium text-white md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Bookshelf</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link href="/my_books" className="mr-5 hover:text-gray-400">
            My Bookshelf
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
