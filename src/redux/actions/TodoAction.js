import { ADD_TODO, EDIT_TODO, DELETE_TODO, CHANGE_INPUT, HIDE_INPUT_BAR, ADD_INPUT_BAR, UPDATE_TODO, FINISH_ITEM_UPDATE, HIDE_EDIT, PERSIST_TODOS } from "./todoActionTypes"

export const persistTodos = () => ({
    type: PERSIST_TODOS
});

export const addTodo = () => {
    return {
        type: ADD_TODO,
    }
}

export const editTodo = ({ id, text }) => {
    return {
        type: EDIT_TODO,
        payload: { id, text }
    }
}

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const addInputBar = () => {
    return {
        type: ADD_INPUT_BAR
    }
}

export const changeInputText = (text) => {
    return {
        type: CHANGE_INPUT,
        payload: text
    }
}

export const hideInputBar = () => {
    return {
        type: HIDE_INPUT_BAR,
    }
}

export const updateTodoItem = (text) => {
    return {
        type: UPDATE_TODO,
        payload: text
    }
}
export const finishUpdateItem = () => {
    return {
        type: FINISH_ITEM_UPDATE,
    }
}
export const hideEditBar = () => {
    return {
        type: HIDE_EDIT,
    }
}
