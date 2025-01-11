import React, {Component} from 'react'
import {Link} from 'react-router-dom'
/*
Debounce lets us make multiple calls to a function and only run that function after a delay from when the last call was made.
 */
import {Debounce} from 'react-throttle'
import Books from './Books'
/*
  Render the Search Page, many pieces from the original App.js, broke Seach into seperate page
  */ 
class SearchPage extends Component {
    state = {
        query: ''   // Start with an empty search
    }
    updateQuery = (event => {
        var currentValue = event.target.value
        this.setState({
            query: currentValue
        })
        this.props.search(currentValue, 40)
    })

	/*
      Render the search page
      */
    render() {
        const results = this.props.results
        let result
        /*
          Provide the Individual Books Move To the shelf
         */
        if (Object.prototype.toString.call(results) === '[object Array]') {
            result = results.map((book) => {
                return (
                    <Books
                        key={book.id.toString()}
                        book={book}
                        shelf={book.shelf}
                        moveTo={this.props.moveTo}
                    />
                )
            })
        }
		/*
        	Search results
         */
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="250" handler="onChange">
                            <input type="text" onChange={this.updateQuery} placeholder="Search by title or author"/>
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <div>{(Object.prototype.toString.call(this.props.results) === '[object Array]') ? `Showing ${results.length} results` : ''}</div>
                    <div>{(Object.prototype.toString.call(this.props.results) === '[object Object]') ? `No results, Try Again` : ''}</div>
                    <ol className="books-grid">{result}</ol>
                </div>
            </div>
        )
    }
}

export default SearchPage