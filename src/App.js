import React, { Component } from 'react';

import './index.css';
import { GOOGLE_BOOKS_API_KEY } from './config';
import Search from './components/Search/Search';
import BooksList from './components/BooksList/BooksList';

class App extends Component {
  state = {
    searchTerm: '',
    books: null,
    startIndex: 0,
    loading: false
  };

  handleInput = event => {
    this.setState({ searchTerm: event.target.value });
  };

  getBooks = (searchTerm, startIndex) => {
    this.setState({ loading: true });

    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=10&fields=items(selfLink)&key=${GOOGLE_BOOKS_API_KEY}`
    )
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.items.map(book =>
            fetch(
              `${
                book.selfLink
              }?fields=id,volumeInfo(title,authors,publisher,previewLink,imageLinks(thumbnail,small))&key=${GOOGLE_BOOKS_API_KEY}`
            )
          )
        )
      )
      .then(res => Promise.all(res.map(book => book.json())))
      .then(books => {
        this.setState({ loading: false });
        return books.map(book => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publisher: book.volumeInfo.publisher,
          previewLink: book.volumeInfo.previewLink,
          image: book.volumeInfo.imageLinks.small,
          imageFallback: book.volumeInfo.imageLinks.thumbnail
        }));
      })
      .catch(err => {
        console.error(err);

        this.setState({ loading: false });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm, startIndex, maxResults } = this.state;
    this.getBooks(searchTerm, startIndex, maxResults).then(books =>
      this.setState({ books })
    );
  };

  handleNextPage = () => {
    this.setState(
      prevState => ({
        startIndex: prevState.startIndex + 10
      }),
      () => {
        const { searchTerm, startIndex, maxResults } = this.state;

        this.getBooks(searchTerm, startIndex, maxResults).then(books =>
          this.setState({ books })
        );
      }
    );
  };

  handlePreviousPage = () => {
    if (this.state.startIndex < 1) return;

    this.setState(
      prevState => ({
        startIndex: prevState.startIndex - 10
      }),
      () => {
        const { searchTerm, startIndex, maxResults } = this.state;

        this.getBooks(searchTerm, startIndex, maxResults).then(books =>
          this.setState({ books })
        );
      }
    );
  };

  render() {
    return (
      <div>
        <main>
          <h1>Book Finder</h1>
          <Search
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>
                {this.state.startIndex > 1 ? (
                  <span onClick={this.handlePreviousPage}>Back</span>
                ) : null}
                {this.state.books ? (
                  <>
                    <span>Page {this.state.startIndex / 10 + 1}</span>
                    <span onClick={this.handleNextPage}>Next</span>
                  </>
                ) : null}
              </div>
              <BooksList data={this.state.books} />
            </>
          )}
        </main>
      </div>
    );
  }
}

export default App;
