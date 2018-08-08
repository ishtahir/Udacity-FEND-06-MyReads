import React, { Component } from 'react';

class Book extends Component {
    render() {
        // console.log('Book.props', this.props);
        const imgUrl = this.props.books.imageLinks ? `url(${this.props.books.imageLinks.thumbnail})` : 'url("")';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${imgUrl}` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.books.title}</div>
                <div className="book-authors">{this.props.books.authors[0]}</div>
            </div>
        )
    }
}

export default Book;
