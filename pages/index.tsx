import Link from "next/link";
import { useStore } from "../store";

export default function App() {
  const { books, addBook, removeBook } = useStore(
    (state) => ({
      books: state.books,
      addBook: state.addBook,
      removeBook: state.removeBook,
    })
  );

  console.log("books", books);

  return (
    <div className="App">
      <div>
        <h1>Total # of Books {books.length} </h1>
        {books.length !== 0 &&
          books.map((item) => {
            return (
              <div className="list">
                <h2 key={item.title}>{item.title}</h2>
                <button
                  onClick={() => {
                    removeBook(item.title);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            const data = {
              title: e.target.title.value,
            };
            addBook(data);
            e.target.title.value = "";
          }}
        >
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Add book"
            required
          />
        </form>
        <Link href={"/page2"}>Go to Page2</Link>
        <Link href={"/count"}>Go to Counter</Link>
        <Link href={"/posts-async"}>Go to Post page</Link>
      </div>
    </div>
  );
}
