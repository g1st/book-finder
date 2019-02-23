import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ handleInput, handleSubmit }) => (
  <div className="search">
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleInput} />
      <button type="submit">Search</button>
    </form>
  </div>
);

Search.propTypes = {
  updateBooksList: PropTypes.func
};

export default Search;
