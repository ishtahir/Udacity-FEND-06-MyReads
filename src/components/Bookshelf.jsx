import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book.jsx';

class Bookshelf extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        BooksAPI.getAll().then(books => {
            let currentlyReading = books ? books.filter(book => book.shelf === 'currentlyReading') : null;
            let wantToRead = books ? books.filter(book => book.shelf === 'wantToRead') : null;
            let read = books ? books.filter(book => book.shelf === 'read') : null;

            this.setState({ currentlyReading, wantToRead, read });
        });
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }

    displayShelf(title, books) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => {
                            return (<Book books={book} key={book.id} changeShelf={this.changeShelf.bind(this)} />)
                        })}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="list-books-content">
                {this.displayShelf('Currently Reading', this.state.currentlyReading)}
                {this.displayShelf('Want to Read', this.state.wantToRead)}
                {this.displayShelf('Read', this.state.read)}
            </div>
        )
    }
}

export default Bookshelf;
