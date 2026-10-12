import { Book } from "../../models";

export async function batchBooksbyAuthorIds(authorIds: string[]) {
  const books = await Book.find({ authorId: { $in: authorIds } });

  const booksMap = new Map<string, any>();
  books.forEach((book) => {
    if (!booksMap.has(book.authorId.toString())) {
      booksMap.set(book.authorId.toString(), []);
    }
    booksMap.get(book.authorId.toString()).push(book);
  });

  const returnValue = authorIds.map(
    (authorId) => booksMap.get(authorId.toString()) || [],
  );
  return returnValue;
}
