import React from 'react';
import PropTypes from 'prop-types';

import fallbackImg from '../../static/fallbackImage.jpg';

const SingleBook = ({ image, title, authors, publisher, link }) => {
  return (
    <li className="books__books-grid__item">
      <div className="books__books-grid__item--image">
        <img src={image || fallbackImg} alt={title} />
      </div>
      <div className="books__books-grid__item--bookinfo">
        <h3 className="books__books-grid__item--title">{title}</h3>
        {authors.length <= 1 ? (
          <h4 className="books__books-grid__item--author">
            Author: {authors[0]}
          </h4>
        ) : (
          <h4 className="books__books-grid__item--author">
            Authors: {authors.join(', ')}
          </h4>
        )}
        <h4 className="books__books-grid__item--publisher">
          Published by: {publisher}
        </h4>
        <div>
          <a
            className="link"
            // className="more-info"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            More info
          </a>
        </div>
      </div>
    </li>
  );
};

SingleBook.defaultProps = {
  authors: ['Not specified.'],
  title: 'Missing title.',
  publisher: 'Missing publisher.'
};

SingleBook.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  publisher: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SingleBook;
