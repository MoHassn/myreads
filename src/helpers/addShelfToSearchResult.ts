import { BookItem, Shelves } from "../interfaces/interfaces";

export default function addShelf(
  currentBooks: BookItem[],
  searchResult: BookItem[]
) {
  // first create a hash object.
  // to use it to get the book shelf efficiently
  // using its id instead of looping over the whole array
  const shelves: Shelves = currentBooks.reduce(
    (acc: Shelves, book: BookItem) => {
      acc[book.id] = book.shelf;
      return acc;
    },
    {}
  );
  // we add shelf property to each book and return the new maped array
  return searchResult.map((book) => {
    if (shelves[book.id]) {
      book.shelf = shelves[book.id];
    }
    return book;
  });
}
