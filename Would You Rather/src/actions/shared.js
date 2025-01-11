import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, userAnswerQuestion } from "./users";
import { receiveQuestions, answerQuestion } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
export const AUTHED_ID = "authedId";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}

export function handleAnswerQuestion(info) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestionAnswer(info)
      .then(() => {
        dispatch(userAnswerQuestion(info));
        dispatch(answerQuestion(info));
      })
      .then(() => dispatch(hideLoading()))
      .catch(() => {
        alert("There was an error answering this question. Try again.");
      });
  };
}
