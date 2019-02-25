import React from 'react';
import PropTypes from 'prop-types';

import SingleBook from './SingleBook';

const BooksList = ({ data }) => {
  return data ? (
    <div>
      <ul className="books__books-grid">
        {data.map(book => (
          <SingleBook
            key={book.id}
            id={book.id}
            image={book.image || book.imageFallback}
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

BooksList.propTypes = {
  data: PropTypes.array
};

export default BooksList;
