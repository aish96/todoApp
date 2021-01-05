import { ADD_TODO, DELETE_TODO, EDIT_TODO, ADD_INPUT_BAR, CHANGE_INPUT, HIDE_INPUT_BAR, UPDATE_TODO, FINISH_ITEM_UPDATE, HIDE_EDIT, PERSIST_TODOS } from "../actions/todoActionTypes";
import * as _ from "lodash";
import uniqid from "uniqid";
const initialState = {
    todos: [],
    selected: null,
    isAddTaskClicked: false,
    editItem: {},
    taskText: "",
}
export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSIST_TODOS:
            let todoState = JSON.parse(window.localStorage.getItem("todosState"));
            return todoState || { ...state };
        case ADD_INPUT_BAR:
            {
                return { ...state, isAddTaskClicked: true };
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
                    prevTodos.push({ text: state.taskText.trim(), id: uniqid() });
                window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos: prevTodos, isAddTaskClicked: false, editItem: {}, selected: null }));
                return { ...state, todos: prevTodos, taskText: "", isAddTaskClicked: false };
            }
        case DELETE_TODO:
            let todos = state.todos.filter(todo => todo.id !== action.payload);
            window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos, isAddTaskClicked: false, editItem: {}, selected: null }));
            return {
                ...state,
                todos
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
            editItem.text = action.payload;
            return {
                ...state,
                editItem
            }
        }
        case FINISH_ITEM_UPDATE: {
            let prevTodos = _.cloneDeep(state.todos);
            prevTodos = prevTodos.map(todo => {
                if (todo.id === state.selected) {
                    todo.text = state.editItem.text;
                }
                return todo;
            });
            window.localStorage.setItem("todosState", JSON.stringify({ ...state, todos: prevTodos, isAddTaskClicked: false, editItem: {}, selected: null }));
            return { ...state, todos: prevTodos, selected: null }
        }
        case HIDE_EDIT:
            return { ...state, selected: false, editItem: {} };
        default:
            return state;
    }
};