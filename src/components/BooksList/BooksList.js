import React from 'react';

const BooksList = ({ data }) => {
  return data ? (
    <div>
      <ul>
        {data.map(book => {
          // extract into its own component
          return (
            <li key={book.id}>
              <h1>{book.title}</h1>
              {book.authors.length <= 1 ? (
                <h4>Author: {book.authors[0]}</h4>
              ) : (
                <h4>Authors: {book.authors.join(', ')}</h4>
              )}
              <h5>Published by: {book.publisher}</h5>
              <img src={book.image || book.imageFallback} alt={book.title} />
              <a
                href={book.previewLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                More info
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>Try to search.</div>
  );
};

export default BooksList;
