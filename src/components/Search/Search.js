import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ handleInput, handleSubmit }) => (
  <div className="search">
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchTerm" />
      <input
        id="searchTerm"
        type="text"
        onChange={handleInput}
        autoFocus
        placeholder="Harry Potter"
      />
      <button type="submit">Search</button>
    </form>
  </div>
);

Search.propTypes = {
  handleInput: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default Search;
