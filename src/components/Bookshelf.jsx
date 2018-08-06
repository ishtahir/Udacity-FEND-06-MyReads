import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book.jsx';

class Bookshelf extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        titles: ['Currently Reading', 'Want to Read', 'Read']
    }

    getBooks() {
        BooksAPI.getAll().then(book => {
            book.shelf === 'currentlyReading' ? this.setState(this.state.currentlyReading.push(book)) : null;
            book.shelf === 'wantToRead' ? this.setState(this.state.wantToRead.push(book)) : null;
            book.shelf === 'read' ? this.setState(this.state.read.push(book)) : null;
        })
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getbooks());
    }

    render() {
        // const titles = ['Currently Reading', 'Want to Read', 'Read'];
        return (
            <div className="list-books-content">
                {this.state.titles.map((title, index) => {
                    return (
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">{title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                </ol>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Bookshelf;
