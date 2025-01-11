# MyReads Project


## Introduction
This is project is a book tracking web application developed using the React library, that allows the user to search through a list of books and add a number of books to 3 different Bookshelves from a Search Page or move Books into other Shelves on the main Dash Board:
1. Currently Reading book shelf
2. Want to Reading book shelf
3. Read book shelf

## Instructions

  ### How to start the MyReads React application
	
		* install all project dependencies with `npm install`
		* start the development server with `npm start`

 	### How to use MyReads React application.
  #### App Main Page.
  - On Main Page, or Dash Board, you may click on the drop down arrow located at the bottom right of each book icon to switch that particular book between one of the 3 book shelfs (Currently Reading, Want to Reading, Read).
  - Upon changing book shelf of currently selected book, bthe ook will move to  the main page to the specific shelf location. The Shelves beibng Currently Reading, Want to Reading, and Read.
  - If a shelf value of none is selected the book will be removed from the main page.
  - You may click on the plus button located at the bottom right of the main page to go to the app's search page where you can search for books to add into the shelves of the main page.


  #### App Search Page.
  - The search page can be access in one of two ways:
    1. Directly typing in the search url into your browser address bar, i.e. `localhost:3000/search`
    2. Or from the main, or dashboard, page by clicking on the plus button at the bottom right of the page to get redirected to the `localhost:3000/search` page.
    
  - When on the search page, you may enter a search term into the text input field at the top of the page, the app will begin searhcing for the book matches from a list of available books. 
  - The app searches by book title or author(s) name(s).
  - If no results are returned for your search term you, it will display 'Showing 0 results".
  _ All books that are found will have a displayed Book icon with the Name and Author and asscoiciated dropdown to move to the Book's shelf on the main page. 
  - If any book in the results that is already in the main page's Book shelf, if will currenlty show that preset shelf that it bleongs to in the dropdown. 
  - If any book in the results that is not in the main page's Book shelf, if will currenlty show "None" in the dropdown. 
  - After completing your search you may return to the main book shelf page by clicking on the back button located in the top left corner,
  - After returning to the mian page, it should be updated with added books to the Book Shelf. 
  * There are only a limite dnumber of search terms that work with the app which can be found in the root project directory in the `SEARCH_TERMS.md` file.


## What You're Getting
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains statte and react routes of the main and search page.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── Books.js # Functional component that renders each book with book image, title and author.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── ListBooks.js # Functional component that renders a list (array) of Books components to render in the 				main page.
    └──SearchPage.js # Class based component that will render all custom components for the searchPage and 					assist in the search.

 
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
