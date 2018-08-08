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
            books.forEach(book => {
                book.shelf === 'currentlyReading' ? this.state.currentlyReading.push(book) : null;
                book.shelf === 'wantToRead' ? this.state.wantToRead.push(book) : null;
                book.shelf === 'read' ? this.state.read.push(book) : null;
            })
        });
        console.log('currently', this.state.currentlyReading);
        console.log('want to', this.state.wantToRead);
        console.log('read', this.state.read);
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getbooks());
    }

    renderShelf(title, books) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) => {
                            return (<Book books={book} key={index} change={this.changeShelf} />)
                        })}
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    {this.renderShelf('Currently Reading', this.state.currentlyReading)}
                    {this.renderShelf('Want to Read', this.state.wantToRead)}
                    {this.renderShelf('Read', this.state.read)}
                </div>
            </div>
        )
    }
}

export default Bookshelf;
