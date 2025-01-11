import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Tab, Item } from 'semantic-ui-react';
import QuestionListPage from './QuestionListPage';

class QuestionList extends Component {
  render() {
    
    const {answeredQuestions, unAnsweredQuestions } = this.props

    const panes = [
      { menuItem: 'Unaswered',
       render: () => (<Tab.Pane>
         <Item.Group>
          {unAnsweredQuestions.length === 0 && <p>You have answered all the questions!</p>}
          {unAnsweredQuestions.map(qid => (<QuestionListPage key={qid} id={qid} buttonText='Answer Poll' />))}
         </Item.Group>
       </Tab.Pane>)
      },
      { menuItem: 'Answered',
      render: () => (<Tab.Pane>
        <Item.Group>
         {answeredQuestions.map(qid => (<QuestionListPage key={qid} id={qid} buttonText='See Results' />))}
        </Item.Group>
      </Tab.Pane>)
     },
    ]

    return (
      <div className='container'>
        <Tab panes={panes} />
      </div>
    )
  }
}

function mapStateToProps({questions, authedUser, users }) {
  const user = users[authedUser]

  const answeredQuestions = Object.keys(questions)
    .filter(id => user.answers[id] !== undefined)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

  const unAnsweredQuestions = Object.keys(questions)
    .filter(id => user.answers[id] === undefined)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  
  return {
    answeredQuestions,
    unAnsweredQuestions
  }
}


export default connect(mapStateToProps)(QuestionList)
