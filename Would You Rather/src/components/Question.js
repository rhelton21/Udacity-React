import React, { Component } from 'react'
import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';
import AnswerQuestion from './AnswerQuestion';
import PollResultsPage from './PollResultsPage';

class Question extends Component {
  render() {
    if (this.props.isQuestionValid === false) {
      return <ErrorPage />
    }

    const {user, questionId, questions, questionAuthor} = this.props
    const notAnswered = Object.keys(user.answers).includes(questionId);
    return (
      <div>
        {notAnswered ? (
          <PollResultsPage question={questions[questionId]} authedUser={user} author={questionAuthor} />
        ) : (
          <AnswerQuestion  qid={questionId} />
        )}
      </div>
    )
  }
}

function mapStateToProps({authedUser,users,questions}, ownProps) {
  const {questionId} = ownProps.match.params
  const isQuestionValid = Object.keys(questions).includes(questionId)
  const user = users[authedUser]
  const question = questions[questionId]
  const questionAuthor = isQuestionValid && users[question.author]
  return {
    authedUser,
    user,
    questionId,
    questions,
    questionAuthor,
    isQuestionValid
  }
}

export default connect(mapStateToProps)(Question)