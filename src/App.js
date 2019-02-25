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
    error: null,
    loading: false
  };

  handleInput = event => {
    this.setState({ searchTerm: event.target.value });
  };

  checkInput = input => {
    if (input.trim().length < 1) {
      this.setState({ error: 'Your input is empty.' });
      return true;
    }
    this.setState({ error: null });
    return false;
  };

  getBooks = (searchTerm, startIndex) => {
    this.setState({ loading: true });

    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=10&fields=items(selfLink)&key=${GOOGLE_BOOKS_API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.error && data.error.errors.length > 0) {
          throw Error(data.error.message.split('. ')[0]);
        }

        if (Object.entries(data).length === 0 && data.constructor === Object) {
          throw Error('No matches found.');
        }

        return Promise.all(
          data.items.map(book =>
            fetch(
              `${
                book.selfLink
              }?fields=id,volumeInfo(title,authors,publisher,previewLink,imageLinks(thumbnail,small))&key=${GOOGLE_BOOKS_API_KEY}`
            )
          )
        );
      })
      .then(res => Promise.all(res.map(book => book.json())))
      .then(books => {
        if (books.length < 1) throw Error('No books found.');

        this.setState({ loading: false });
        return books.map(book => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publisher: book.volumeInfo.publisher,
          previewLink: book.volumeInfo.previewLink,
          image: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.small,
          imageFallback:
            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        }));
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.message || 'Sorry we cannot process your request.'
        });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm, startIndex, maxResults } = this.state;
    if (this.checkInput(searchTerm)) return;
    this.getBooks(searchTerm, startIndex, maxResults).then(books =>
      this.setState({ books })
    );
  };

  handleNextPage = () => {
    if (this.checkInput(this.state.searchTerm)) return;
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
    if (this.checkInput(this.state.searchTerm)) return;
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
    const bookList = (
      <div className="books">
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <BooksList data={this.state.books} />
            <div className="books__pagination">
              {this.state.startIndex > 1 ? (
                <span className="link" onClick={this.handlePreviousPage}>
                  Back
                </span>
              ) : null}
              {this.state.books ? (
                <>
                  <span className="books__pagination--page">
                    Page {this.state.startIndex / 10 + 1}
                  </span>
                  <span className="link" onClick={this.handleNextPage}>
                    Next
                  </span>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
    );

    const error = <div className="error">{this.state.error}</div>;

    return (
      <div>
        <main className="main">
          <div>
            <h1 className="logo">Book Finder</h1>
            <Search
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
            />
          </div>
          {this.state.error ? error : bookList}
          <footer className="footer">
            <a
              className="link"
              href="http://github.com/g1st/book-finder"
              target="_blank"
              rel="noopener noreferrer"
            >
              @g1st
            </a>
          </footer>
        </main>
      </div>
    );
  }
}

export default App;
