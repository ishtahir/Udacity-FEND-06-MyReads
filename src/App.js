import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './components/Search.jsx';
import Bookshelf from './components/Bookshelf.jsx';
import './App.css';

class BooksApp extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books});
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <Bookshelf books={this.state.books} />
                      <div className="open-search">
                        <Link to="/search">Add a book</Link>
                      </div>
                    </div>
                )}/>
                <Route path='/search' render={() => (
                    <Search books={this.state.books} />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
