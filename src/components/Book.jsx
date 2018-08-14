import React, { Component } from 'react';

class Book extends Component {
    changeShelf = event => {
        this.props.changeShelf(this.props.books, event.target.value);
    }

    render() {
        const imgUrl = this.props.books.imageLinks ? `url(${this.props.books.imageLinks.thumbnail})` : 'url("http://via.placeholder.com/200x13")';
        const author = this.props.books.authors? this.props.books.authors[0] : 'N/A';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${imgUrl}` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.changeShelf} defaultValue={this.props.books.shelf ? this.props.books.shelf : 'none'}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.books.title}</div>
                <div className="book-authors">{author}</div>
            </div>
        )
    }
}

export default Book;
