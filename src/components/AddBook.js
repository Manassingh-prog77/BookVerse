import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const getAuthorsQuery = gql`
{
  allAuthors {
    name
    id
  }
}`;

const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      author {
        name
      }
    }
  }
`;

const getBookQuery = gql`
{
  allBooks {
    name
    genre
    id
  }
}`;

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(ADD_BOOK);

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error loading authors: {error.message}</p>;

  const submit = (e) => {
    e.preventDefault();
    console.log('Submitting book with:', { name, genre, authorId });

    addBook({
      variables: { name:name, genre:genre, authorId:authorId },
      onCompleted: () => {
        setName('');
        setGenre('');
        setAuthorId('');
      },
      refetchQueries: [{ query: getBookQuery }],
    }).catch(err => {
      console.error('Error adding book:', err);
    });
  };

  return (
    <div>
      <form id='add-Book' onSubmit={submit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
            <option value="">Select Author</option>
            {data.allAuthors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default AddBook;
