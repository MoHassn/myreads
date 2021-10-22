import React from "react";
import { BookItem, Shelf } from "../interfaces/interfaces";

export interface BookProps {
  book: BookItem;
  setBookShelf: (book: BookItem, shelf: Shelf) => void;
}

const Book = ({ book, setBookShelf }: BookProps) => {
  const { title, authors, shelf, imageLinks: { thumbnail } = {} } = book;
  return (
    <>
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${thumbnail})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                value={shelf || "none"}
                onChange={(e) => {
                  const shelf = e.target.value as Shelf;
                  setBookShelf(book, shelf);
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors && authors.join(" & ")}</div>
        </div>
      </li>
    </>
  );
};

export default Book;
