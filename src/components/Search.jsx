import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book.jsx';

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
    }

    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => shelf !== 'none' ? alert('Books is now added to your library') : null).catch(alert('Something is not right.'))
    }

    render() {
        console.log('books', this.props.books)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={event => this.handleSearch(event.target.value.trim())} value={this.state.query}/>
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
