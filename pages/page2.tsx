import { Book, useStore } from "../store";
import Link from "next/link";
import React from "react";

const BookItem = ({ book }: { book: Book }) => {
  const [removeBook] = useStore((state) => [
    state.removeBook,
  ]);

  return (
    <div className="list">
      <h2 key={book.title}>{book.title}</h2>
      <button
        onClick={() => {
          removeBook(book.title);
        }}
      >
        Delete
      </button>
    </div>
  );
};

const Form = React.memo(() => {
  const [addBook] = useStore((state) => [state.addBook]);

  return (
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
  );
});

export default function Page2() {
  const [books] = useStore((state) => [state.books]);

  return (
    <div className="App">
      <div>
        <h1>Total # of Books {books.length} </h1>
        {books.length !== 0 &&
          books.map((item: Book) => (
            <BookItem book={item} />
          ))}
        <Form />
        <Link href={"/"}>Go to Home page</Link>
      </div>
    </div>
  );
}
