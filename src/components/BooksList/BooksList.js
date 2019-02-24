import React from 'react';

import SingleBook from './SingleBook';

const BooksList = ({ data }) => {
  return data ? (
    <div>
      <ul className="books-grid">
        {data.map(book => (
          <SingleBook
            key={book.id}
            id={book.id}
            image={book.image || book.fallbackImage}
            title={book.title}
            authors={book.authors}
            publisher={book.publisher}
            link={book.previewLink}
          />
        ))}
      </ul>
    </div>
  ) : (
    <div>Try to search.</div>
  );
};

export default BooksList;
