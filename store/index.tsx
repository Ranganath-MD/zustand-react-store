import create, { GetState, SetState, StoreApi } from "zustand";
import { persist } from "zustand/middleware";

export type StoreSlice<
  T extends object,
  E extends object = T
> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
  api?: StoreApi<E extends T ? E : E & T>,
  
) => T;

// counter store
export interface CounterProps {
  count: number;
  countUp: () => void;
  countDown: () => void;
}

export const countSlice: StoreSlice<CounterProps> = (
  set,
  get
) => ({
  count: 0,
  countDown: () => {
    set((state) => ({
      count: state.count - 1,
    }));
  },
  countUp: () => {
    set((state) => ({
      count: state.count + 1,
    }));
  },
});

// book store
export type Book = {
  title: string;
};

export interface BookProps {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (title: string) => void;
}

const bookSlice: StoreSlice<BookProps> = persist((set, get) => ({
  books: [],
  addBook: (book: Book) => {
    set((state) => ({
      books: [...state.books, book],
    }));
  },
  removeBook: (title: string) => {
    set((state) => ({
      books: state.books.filter(
        (book) => book.title !== title
      ),
    }));
  },
}), {name: 'books'});

// post store
export interface PostProps {
  posts: any[];
  loading?: boolean;
  fetchPosts: () => void;
}

const postsSlice: StoreSlice<PostProps> = (set, get) => ({
  posts: [],
  loading: false,
  fetchPosts: async () => {
    set(() => ({
      loading: true,
    }));
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await res.json();
    set(() => ({
      posts: data,
      loading: false,
    }));
  },
});

const createRootSlice = (
  set: SetState<any>,
  get: GetState<any>,
  api?: StoreApi<any>
) => ({
  ...bookSlice(set, get, api),
  ...countSlice(set, get),
  ...postsSlice(set, get),
});

export const useStore = create(createRootSlice)
