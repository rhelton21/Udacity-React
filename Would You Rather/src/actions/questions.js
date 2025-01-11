import { saveQuestion } from '../utils/api';
import  {addQuestionToUser} from './users';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION_TO_QUESTIONS = 'ADD_QUESTION_TO_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'




export function receiveQuestions ( questions ) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function answerQuestion ( { authedUser, qid, answer} ) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleAskQuestion (question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion( question )
    .then((res) => {
      dispatch(addQuestionToQuestions(res))
      dispatch(addQuestionToUser(res))
    })
    .then(() => dispatch(hideLoading()))
  }
}

export function addQuestionToQuestions (question) {
  return {
    type: ADD_QUESTION_TO_QUESTIONS,
    question
  }
}