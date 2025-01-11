import React, { Component } from 'react'

/*
  Pulled originally from the original App.js that shows the individual Book that the ListBooks will display
   This the Books icon with the MoveTo Options
 */

class Books extends Component {
  render(){
    const book = this.props.book
    const moveTo = this.props.moveTo
    const defaultImage = 'http://via.placeholder.com/128x193?text=No%20Cover'
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks ? book.imageLinks.thumbnail : defaultImage })` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e)=>{moveTo(book, e.target.value)}} defaultValue={book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.map((author)=>{
            return(
              <span key={author} className="author-name"> {author}</span>
            )
          })}</div>
        </div>
      </li>
    )
  }
}

export default Books