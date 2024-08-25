import React, { useState } from "react";
import { gql,useQuery } from "@apollo/client";
import BookDetails from "./BookDetails";

const getBookQuery = gql`
{
  allBooks{
  name
  genre
  id
  }
}`

function BookList() {
  const [select, Setselect] = useState('');
  const {loading,error,data} = useQuery(getBookQuery);
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>
 
  return (
    <>
    <div>
        <ul className="book-list">
            {data.allBooks.map((book)=>(
              <li key={book.id} onClick={(e)=>{
                Setselect(book.id);
              }}>
                {book.name}
              </li>
            ))}
        </ul>
        <BookDetails id={select}/>
    </div>
    </>
  );
}

export default BookList;
