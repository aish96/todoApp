import { ADD_TODO, EDIT_TODO, DELETE_TODO, CHANGE_INPUT, HIDE_INPUT_BAR, ADD_INPUT_BAR, UPDATE_TODO, FINISH_ITEM_UPDATE, HIDE_EDIT, PERSIST_TODOS, IS_LOADING, CREATE_ERROR, TOGGLE_STATE } from "./todoActionTypes"
import uniqid from "uniqid";
const axios = require('axios').default;

export const persistTodos = () => ({
    type: PERSIST_TODOS
});

export const addTodo = (data) => {
    return {
        type: ADD_TODO,
        payload: data
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

export const addInputBar = (bucketId) => {
    return {
        type: ADD_INPUT_BAR,
        payload: bucketId
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
export const finishUpdateItem = (data) => {
    return {
        type: FINISH_ITEM_UPDATE,
        payload: data
    }
}
export const hideEditBar = () => {
    return {
        type: HIDE_EDIT,
    }
}
export const toggleTodoState = (todoId) => {
    return {
        type: TOGGLE_STATE,
        payload: todoId
    }
}
export const isLoading = () => {
    return {
        type: IS_LOADING
    }
}
export const onError = (e) => {
    return {
        type: CREATE_ERROR,
        payload: e
    }
}
export const createTodoAPI = (data) => {
    return (dispatch) => {
        if (data.task && data.task.trim()) {
            dispatch(isLoading());
            data.id = uniqid();
            data.completed = false;
            axios.post("https://56x12e6b60.execute-api.ap-south-1.amazonaws.com/prod/addtodo", data)
                .then(() => {
                    dispatch(addTodo(data));
                })
                .catch((error) => {
                    dispatch(onError(error));
                });
        }
    }
}
export const deleteTodoApi = (data) => {
    return (dispatch) => {
        dispatch(isLoading());
        axios.post("https://56x12e6b60.execute-api.ap-south-1.amazonaws.com/prod/deletetodo",
            [{ todoId: data }])
            .then(() => {
                dispatch(deleteTodo(data));
            })
            .catch((error) => {
                dispatch(onError(error));
            });
    }
}
export const updateTodoApi = (data) => {
    return (dispatch) => {
        if ((data.task && data.task.trim()) || data.completed !== undefined) {
            dispatch(isLoading());
            data.todoId = data.id;
            axios
                .post("https://56x12e6b60.execute-api.ap-south-1.amazonaws.com/prod/updatetodo",
                    data)
                .then(() => {
                    if (data.task)
                        dispatch(finishUpdateItem(data));
                    else
                        dispatch(toggleTodoState(data.id))
                })
                .catch((error) => {
                    dispatch(onError(error));
                });
        }
    }
}