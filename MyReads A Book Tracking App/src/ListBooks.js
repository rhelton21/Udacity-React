import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Books from './Books'


/*
	Part of the original App.js to list the books in the main dashboard
    Broken down by the 3 categories that contains a Map/List of Books.js
 */
class ListBooks extends Component {
  render(){ 
    const { books } = this.props
    const categories = {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want To Reading',
      read: 'Read'
    }
    return(
     <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(categories).map(shelf => {
            return (
              <div key={categories[shelf]} className="bookshelf">
                <h2 className="bookshelf-title">{categories[shelf]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter((book=>book.shelf===shelf)).map((book)=>{
                      return(
                        <Books 
                          key={book.id.toString()}
                          book={book}
                          shelf={book.shelf} 
                          moveTo={this.props.moveTo}
                        />
                      )
                    })}
                  </ol>
                </div>
              </div>
            )
          })}
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>  
    )
  }
}

export default ListBooks