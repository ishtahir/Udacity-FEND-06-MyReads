import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Search from './components/Search.js';
import Bookshelf from './components/Bookshelf.js';


class BooksApp extends Component {
    state = {
        books: [],
        shelves: {
            currentlyReading: {
                name: 'Currently Reading',
                id: 'current',
                books: []
            },
            wantToRead: {
                name: 'Want to Read',
                id: 'want',
                books: []
            },
            read: {
                name: 'Read',
                id: 'read',
                books: []
            }
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books });
        });
        console.log(this)
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <Bookshelf />
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>
                <Route path='/search' render={({history}) => (
                    <Search />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
