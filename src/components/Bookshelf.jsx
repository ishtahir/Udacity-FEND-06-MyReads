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
            let currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
            let wantToRead = books.filter(book => book.shelf === 'wantToRead');
            let read = books.filter(book => book.shelf === 'read');

            this.setState({ currentlyReading, wantToRead, read });
        });
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }

    displayShelf(title, books, currentShelf) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => {
                            return (<Book books={book} key={book.id} changeShelf={this.changeShelf.bind(this)} currentShelf={currentShelf} />)
                        })}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        const {currentlyReading, wantToRead, read} = this.state;
        return (
            <div className="list-books-content">
                {this.displayShelf('Currently Reading', currentlyReading, 'currentlyReading')}
                {this.displayShelf('Want to Read', wantToRead, 'wantToRead')}
                {this.displayShelf('Read', read, 'read')}
            </div>
        )
    }
}

export default Bookshelf;
