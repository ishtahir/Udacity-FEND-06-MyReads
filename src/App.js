import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Search from './components/Search.jsx';
import Bookshelf from './components/Bookshelf.jsx';
import './App.css';

class BooksApp extends Component {
    state = {
        /**
        * TODO: Instead of using this state variable to keep track of which page
        * we're on, use the URL in the browser's address bar. This will ensure that
        * users can use the browser's back and forward buttons to navigate between
        * pages, as well as provide a good URL they can bookmark and share.
        */
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <Bookshelf />
                      <div className="open-search">
                        <Link to="/search">Add a book</Link>
                      </div>
                    </div>)}
                />
                <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp;
