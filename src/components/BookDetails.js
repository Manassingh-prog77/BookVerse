import React from "react";
import { gql, useQuery } from "@apollo/client";

// Updated GraphQL query to match the schema
const GET_BOOK_DETAIL = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        booksWritten {
          name
          id
        }
      }
    }
  }
`;

const BookDetails = ({ id }) => {
  // Fetch book details based on the provided ID
  const { loading, error, data } = useQuery(GET_BOOK_DETAIL, {
    variables: { id },
    skip: !id, // Skip the query if `id` is falsy
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle the case where the book data is not available
  if (!data || !data.book) {
    return <p>No book found.</p>;
  }

  const { book } = data;

  return (
    <div id="book-details">
      <h2>{book.name || "Unknown Book"}</h2>
      <p>Genre: {book.genre || "Unknown Genre"}</p>
      <p>Author: {book.author?.name || "Unknown Author"}</p>
      <p>Author Age: {book.author?.age || "Unknown Age"}</p>
      <p>Other books by this author:</p>
      <ul>
        {book.author?.booksWritten?.length > 0 ? (
          book.author.booksWritten.map((b) => (
            <li key={b.id}>{b.name || "Unnamed Book"}</li>
          ))
        ) : (
          <li>No other books found.</li>
        )}
      </ul>
    </div>
  );
};

export default BookDetails;
