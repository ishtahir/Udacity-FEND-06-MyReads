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
        BooksAPI.search(query).then(results => this.setState({ results }));
        // console.log(this.checkID(this.props.books, this.state.results))
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => shelf !== 'none' ? alert('Books is now added to your library') : null).catch(alert('Something is not right.'))
    }

    checkID(books, searched) {
        let same;
        const bookID = [];
        books.forEach(book => {
            bookID.push(book.id);
        });

        if (searched && searched.length > 0) {
            const searchedID = [];
            searched.forEach(search => {
                searchedID.push(search.id);
            });

            same = String(bookID.diff(searchedID));
        }

        const shelf = this.props.books.filter(book => book.id === same);
        console.log(shelf)

        if (this.state.results && this.state.results.length > 0) {
            this.state.results.forEach(book => {
                if (book.id === same) {
                    book.shelf = shelf[0].shelf;
                    console.log(this.state.results)
                }
            });
        }

        // return same;
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={event => this.handleSearch(event.target.value)} value={this.state.query}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {/* {console.log(this.state.results[0])} */}
                        {(this.state.results) && (this.state.results.length > 0) ? Array.from(this.state.results).map((book, index) => <li key={index}><Book books={book} changeShelf={this.changeShelf} /></li>) : null}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
