import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";


// https://redux.js.org/api/applymiddleware
export default applyMiddleware(thunk, logger);
