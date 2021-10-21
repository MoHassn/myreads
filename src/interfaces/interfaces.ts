export type Shelf = "wantToRead" | "currentlyReading" | "read";

export interface BookItem {
  id: string;
  title: string;
  authors?: string[];
  shelf: "wantToRead" | "currentlyReading" | "read";
  imageLinks: {
    thumbnail: string;
  };
}
