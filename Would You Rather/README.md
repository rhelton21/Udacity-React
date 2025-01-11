# React-WouldYouRather

The objective of this application is the creation, display and voting of questions in the form 'Would you rather ?. To be able to use the application it will be necessary to log in and after that, you will be able to access the questions already created, divided in turn into 'answered' and 'not answered'. You can also create new questions, answer them and see the results of the voting.

## TL;DR
To get started developing right away:
   * install all project dependencies with `npm install`
   * start the development server with `npm start`
## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   ├── index.html # DO NOT MODIFY
|   └── logos.png # React logos
|   
└── src
	├── App.js # This is the root of the app. Contains the starting route, and the private routes which happens after login. 
	├── App.scss # Styles for the app. 
	├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
	├── index.css # Styles for the DOM. 
    ├── index.js # It is used for DOM rendering of store and call to root. https://redux.js.org/recipes/configuring-your-store
    ├── logo.svg # the React Logo from react template
    ├── serviceWorker.js # A Service worker is basically a script (JavaScript file) that runs in background and assists in offline first web application development. From react template
    ├── actions
    |   ├── authedUser.js # Actions to authetication user
    │   ├── questions.js # Actions to questions (saveQuestion, addQuestion, saveQuestionAnswer)
    |   ├── shared.js # Actions to get users, questions and set authentication user
    |   └── users.js # Action to users (saveQuestion, getUsers, saveQuestionAnswer)
    ├── components
    |   
    │   ├── AnswerQuestion.js # Component to show the Answered Questions View
    │   ├── AskQuestion.js # Component to show the Ask a Question View
    │   ├── ErrorPage.js # Component to show the Error page View with displaying a 404 error when a bad path is used.
    │   ├── Leader.js # Component to show the Leader table cells for the Leaber Board.
    |   ├── LeaderBoard.js # Component to show the ranking users. The leaderboard consists of data transformations to user in order to display user scores.
    |   ├── Login.js # Component to login user
    |   ├── Navbar.js # Function to show the navBar with the Link to Components 'Home' 'New Poll' 'LeaderBoard'
    |   ├── PollResultsPage.js # Component to show the count of the results Poll
    |   ├── Question.js # Component to show the one question
    |   ├── QuestionList.js # Component to collect the list of questions. 
    |   ├── QuestionListPage.js # Component to show a grid list of the available quesions in the question list.
    ├── middleware  
    |   ├── applyMiddleware.js # Apply all middlewares 
    |   └── logger.js # Show actions of the aplication
    ├── reducers
    |   ├── authedUser.js # Reducers to switch the action.type authetication user
    |   ├── questions.js # Reducers to switch the action.type of questions
    |   ├── rootReducer.js # The Redux store calls the root reducer with the current state and the action. The root reducer combines the output of multiple reducers into a single state tree. https://alligator.io/redux/redux-intro/
    |   └── users.js # Reducers to switch the action.type of users
    ├── utils
        ├── _DATA.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
        ├── api.js # Functions to call the _DATA functions
        └── helpers.js #  Call the api's functions
```
## Backend Server
To simplify your development process, we've provided a backend server for you to develop against. The provided file [`_DATA.js`](src/utils/_DATA.js) contains the methods you will need to perform necessary operations on the backend:

* [`getQuestions`](#getQuestions)
* [`getUsers`](#getUsers)
* [`saveQuestion`](#saveQuestion)
* [`saveQuestionAnswer`](#saveQuestionAnswer)

### `getQuestions`
    
Method Signature:
```js
    _getQuestions()
```
Returns a Promise which resolves to a JSON object containing a collection of questions objects.
This collection represents the questions currently in the dashboard in your app.

### `getUsers`

Method Signature:
```js
    _getUsers()
```
Returns a Promise which resolves to a JSON object containing a collection of users objects.
This collection represents the users currently in the backend in your app.

### `saveQuestion`

Method Signature:
```js
    _saveQuestion(question)
```
question: <Object> containing at  id, timestamp, author, optionOne<Object>, optionTwo<Object> with votes and text
Returns a Promise which resolves to a JSON object containing the response data of request saveQuestion

### `saveQuestionAnswer`

Method Signature:
```js
    _saveQuestionAnswer({ authedUser, qid, answer })
```
authedUser: <String> The logged-in user 
qid: <String> The question id to response
answer: <Object> The answer to the question with the text of the option
Returns a Promise which resolves to a JSON object containing the response data of request saveQuestionAnswer

### Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
