import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const booksToAuthors = pgTable("books_to_authors", 
    {
    authorId: uuid("author_id"),
    bookId: uuid("book_id"),
  }, (table) => {
    return {
      pk: primaryKey({ columns: [table.bookId, table.authorId] }),
      pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] }),
    };
  }
);

export type BoToAU = InferSelectModel<typeof booksToAuthors>
export type NewBoToAU = InferInsertModel<typeof booksToAuthors>