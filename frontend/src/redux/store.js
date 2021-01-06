import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { TodoReducer } from "./reducers/TodoReducer.reducer";
import { BucketReducer } from "./reducers/BukcetReducer";
const rootReducer = combineReducers({
    todos: TodoReducer,
    buckets: BucketReducer
})
// This would produce the following state object
export const store = createStore(rootReducer, applyMiddleware(logger));