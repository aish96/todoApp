import { ADD_TODO, DELETE_TODO, EDIT_TODO, ADD_INPUT_BAR, CHANGE_INPUT, HIDE_INPUT_BAR, UPDATE_TODO, FINISH_ITEM_UPDATE, HIDE_EDIT, PERSIST_TODOS, TOGGLE_STATE, IS_LOADING, CREATE_ERROR } from "../actions/todoActionTypes";
import * as _ from "lodash";
const initialState = {
    todos: [],
    selected: null,
    isAddTaskClicked: false,
    editItem: {},
    taskText: "",
    loading: false
}
export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSIST_TODOS:
            let todoState = JSON.parse(window.localStorage.getItem("todosState"));
            let prevstate = todoState || state;
            return {
                ...prevstate, todos: action.payload, loading: false
            };
        case ADD_INPUT_BAR:
            {
                return { ...state, isAddTaskClicked: true, bucketId: action.payload };
            }
        case CHANGE_INPUT:
            {
                return { ...state, taskText: action.payload };
            }
        case HIDE_INPUT_BAR:
            return { ...state, isAddTaskClicked: false, taskText: "" };
        case ADD_TODO:
            {
                let prevTodos = _.cloneDeep(state.todos);
                if (state.taskText && state.taskText.trim())
                    prevTodos.push({ task: state.taskText.trim(), id: action.payload.id, bucketId: action.payload.bucketId, completed: false });
                window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos: prevTodos, isAddTaskClicked: false, editItem: {}, selected: null }));
                return { ...state, todos: prevTodos, taskText: "", isAddTaskClicked: false, loading: false };
            }
        case DELETE_TODO:
            let todos = state.todos.filter(todo => todo.id !== action.payload);
            window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos, isAddTaskClicked: false, editItem: {}, selected: null }));
            return {
                ...state,
                todos,
                loading: false
            };
        case EDIT_TODO:
            {
                return {
                    ...state,
                    selected: action.payload.id,
                    editItem: state.todos.find(todo => todo.id === action.payload.id)
                };
            }
        case UPDATE_TODO: {
            let editItem = _.cloneDeep(state.editItem);
            editItem.task = action.payload;
            return {
                ...state,
                editItem
            }
        }
        case FINISH_ITEM_UPDATE: {
            let prevTodos = _.cloneDeep(state.todos);
            prevTodos = prevTodos.map(todo => {
                if (todo.id === state.selected) {
                    todo.task = state.editItem.task;
                }
                return todo;
            });
            window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos: prevTodos, isAddTaskClicked: false, editItem: {}, selected: null }));
            return { ...state, todos: prevTodos, selected: null, loading: false }
        }
        case HIDE_EDIT:
            return { ...state, selected: false, editItem: {} };
        case TOGGLE_STATE:
            {
                let prevTodos = _.cloneDeep(state.todos);
                prevTodos = prevTodos.map(todo => {
                    if (todo.id === action.payload) {
                        todo.completed = !todo.completed;
                    }
                    return todo;
                });
                window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos: prevTodos, isAddTaskClicked: false, editItem: {}, selected: null }));
                return { ...state, todos: prevTodos, selected: null, isAddTaskClicked: false, editItem: {}, loading: false }
            }
        case IS_LOADING: {
            return { ...state, loading: true }
        }
        case CREATE_ERROR: {
            return { ...state, loading: false }
        }
        default:
            return state;
    }
};