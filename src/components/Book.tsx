import React from "react";

export interface BookProps {
  id: string;
  title: string;
  authors: string[];
  shelf: "wantToRead" | "currentlyReading" | "read";
  imageLinks: {
    thumbnail: string;
  };
}

const Book = ({
  title,
  authors,
  shelf,
  imageLinks: { thumbnail },
}: BookProps) => {
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
              <select value={shelf}>
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
          <div className="book-authors">{authors.join(" & ")}</div>
        </div>
      </li>
    </>
  );
};

export default Book;
