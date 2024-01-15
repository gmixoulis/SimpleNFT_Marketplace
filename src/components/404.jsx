import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="text-large font-h1">Error 404</span>
          </h2>
          <p className="text-large font-h1 ">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to="/"
            rel="noopener noreferrer"
            className="md:text-[1.5rem] text-[1.5rem] h-auto sm:w-auto w-[80%] py-3 px-2 m-auto font-bold
            border-[2px] rounded-2xl bg-transparent border-border text-textgray hover:text-black my-12"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
