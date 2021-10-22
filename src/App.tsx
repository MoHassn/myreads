import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./components/Book";
import { BookItem, Shelf } from "./interfaces/interfaces";

function BooksApp() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [searchResult, setSearchResult] = useState<BookItem[]>([]);
  const [noResult, setNoResult] = useState(false);
  const abortController = useRef<AbortController>();

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const setBookShelf = (book: BookItem, shelf: Shelf) => {
    BooksAPI.update(book, shelf)
      .then((d) => {
        setBooks([
          ...books.filter((bookItem) => bookItem.id !== book.id),
          { ...book, shelf },
        ]);
      })
      .catch((e) => console.log("Error Happened while updating book", e));
  };

  const searchBooks = (query: string) => {
    /*
    This is to cancel previous requests.
    To avoid delayed previous search results
    being shown instead of the new ones.
    I learned the concepts from these two sources:
      https://davidwalsh.name/cancel-fetch
      https://css-tricks.com/how-to-cancel-pending-api-requests-to-show-correct-data/
    */
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    const signal = abortController.current.signal;
    BooksAPI.search(query, signal)
      .then((books) => {
        if (books && !books.error) {
          setSearchResult(books);
        } else {
          setNoResult(true);
          setSearchResult([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        .filter((book) => book.shelf === "currentlyReading")
                        .map((book) => (
                          <Book
                            key={book.id}
                            book={book}
                            setBookShelf={setBookShelf}
                          />
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        .filter((book) => book.shelf === "wantToRead")
                        .map((book) => (
                          <Book
                            key={book.id}
                            book={book}
                            setBookShelf={setBookShelf}
                          />
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        .filter((book) => book.shelf === "read")
                        .map((book) => (
                          <Book
                            key={book.id}
                            book={book}
                            setBookShelf={setBookShelf}
                          />
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
        <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  onChange={(e) => {
                    setNoResult(false);
                    searchBooks(e.target.value);
                  }}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchResult.map((book) => (
                  <Book key={book.id} book={book} setBookShelf={setBookShelf} />
                ))}
                {noResult && <div>No Results where found </div>}
              </ol>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default BooksApp;
