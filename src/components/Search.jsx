import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book.jsx';

// function from https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};

class Search extends Component {
    state = {
        results: [],
        query: ''
    }

    handleSearch(query) {
        this.setState({ query });
        this.searchLibrary(query);
    }

    searchLibrary(query) {
        if (query) {
            BooksAPI.search(query).then(results => {
                if (results.error) {
                    this.setState({ results: [] });
                } else {
                    this.setState({ results });
                }
            });
        } else {
            this.setState({ results: [] });
        }
        this.checkID(this.props.books, this.state.results);
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then(books => book.shelf = books.find(book1 => book1.id === book.id).shelf);
        });
    }

    checkID(books, searched) {
        let same;
        const bookID = [];
        const searchedID = [];
        books.forEach(book => {
            bookID.push(book.id);
        });

        if (searched && searched.length > 0) {
            searched.forEach(search => {
                searchedID.push(search.id);
            });

            same = String(bookID.diff(searchedID));
        }

        const shelf = this.props.books.filter(book => book.id === same);

        if (this.state.results && this.state.results.length > 0) {
            this.state.results.forEach(sameBook => {
                if (sameBook.id === same) {
                    sameBook.shelf = shelf[0].shelf;
                    console.log(sameBook)
                }
            });
        }
    }

    render() {
        const {results, query, sameBook} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={event => this.handleSearch(event.target.value)} value={query}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results.map((book, index) => <li key={index}><Book books={book} key={book.id} changeShelf={this.changeShelf} /></li>)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
