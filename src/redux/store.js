import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { TodoReducer } from "./reducers/TodoReducer.reducer";

// This would produce the following state object
export const store = createStore(TodoReducer, applyMiddleware(logger));