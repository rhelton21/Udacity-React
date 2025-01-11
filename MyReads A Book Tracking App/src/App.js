import React, {Component} from 'react'
import {Switch, Route} from 'react-router'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {
    /*
        State for Books and Search Books array
     */
    state = {
        books: [],
        searchBooks: []
    }
    /*
        Get all current Books
     */

    getBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }
	/*
      Render this first
     */
    componentDidMount() {
        this.getBooks()
    }

    /*
      Query in Search
     */
    search = (query, maxResults) => {
        if (query) {
          /*
            Look for None, not included
            */
            BooksAPI.search(query, maxResults).then((books) => {
              /*
                If no error, look for None books and add them to display
                  otherwise empty search result
               */
                if (books.length && !books.error) {
                    books.forEach((book, index) => {
                        let myBook = this.state.books.find((b) => b.id === book.id);
                        book.shelf = myBook ? myBook.shelf : 'none';
                        books[index] = book;
                    })
                    this.setState({
                        searchBooks: books
                    })
                } else {
                    this.setState({
                        searchBooks: []
                    })
                }
            })
        } else {
            this.setState({
                searchBooks: []
            })
        }
    }
    /*
        Update Book Shelf, based on the Book mocinto to one of the 3 bookshelf
     */
    moveTo = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([book])
            }));
        })
    }

    /*
      Route the MoveTo and Search DashBoards
     */
    render() {
        return (
            <div className="app">
                <Switch>
                    <Route path="/search" render={() => (
                        <SearchPage
                            search={this.search}
                            results={this.state.searchBooks}
                            moveTo={this.moveTo}
                        />
                    )}/>
                    <Route exact path="/" render={() => (
                        <ListBooks
                            books={this.state.books}
                            moveTo={this.moveTo}
                        />
                    )}/>
                 </Switch>
            </div>
        )
    }
}

export default BooksApp
