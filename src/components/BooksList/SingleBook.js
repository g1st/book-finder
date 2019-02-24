import React from 'react';
import PropTypes from 'prop-types';

const SingleBook = ({ image, title, authors, publisher, link }) => {
  return (
    <li className="booksgrid-item">
      <div className="image-item">
        <img src={image || '../../static/fallbackImage.jpg'} alt={title} />
      </div>
      <div className="bookinfo-item">
        <h3 className="title">{title}</h3>
        {authors.length <= 1 ? (
          <h4 className="author">Author: {authors[0]}</h4>
        ) : (
          <h4 className="author">Authors: {authors.join(', ')}</h4>
        )}
        <h4 className="publisher">Published by: {publisher}</h4>
        <div className="link">
          <a
            className="more-info"
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
  image: '../../static/fallbackImage.jpg',
  title: 'Missing title.',
  publisher: 'Missing publisher.'
};

SingleBook.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  publisher: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SingleBook;
