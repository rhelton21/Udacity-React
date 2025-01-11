const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {headers})
        .then(res => res.json())
        .then(data => data.book)
/*
Method Signature:

getAll()
Returns a Promise which resolves to a JSON object containing a collection of book objects.
This collection represents the books currently in the bookshelves in your app.	

*/

export const getAll = () =>
    fetch(`${api}/books`, {headers})
        .then(res => res.json())
        .then(data => data.books)
/*
update

Method Signature:

update(book, shelf)
book: <Object> containing at minimum an id attribute
shelf: <String> contains one of ["wantToRead", "currentlyReading", "read"]
Returns a Promise which resolves to a JSON object containing the response data of the POST request
*/
export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shelf})
    }).then(res => res.json())
/*
search

Method Signature:

search(query, maxResults)
query: <String>
maxResults: <Integer> Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
*/
export const search = (query, maxResults) =>
    fetch(`${api}/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, maxResults})
    }).then(res => res.json())
        .then(data => data.books)
