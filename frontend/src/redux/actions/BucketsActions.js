export const CREATE_BUCKET = "create_bucket";
export const ADD_INPUT_BAR = "bucketInputBar";
export const CHANGE_INPUT = "on_input_change_bucket";
export const HIDE_INPUT_BAR = "hide_input";
export const PERSIST_BUCKETS = "persist";

export const addInputBar_Bucket = () => {
    return {
        type: ADD_INPUT_BAR
    }
}
export const changeInputText_Bucket = (text) => {
    return {
        type: CHANGE_INPUT,
        payload: text
    }
}

export const hideInputBar_Bucket = () => {
    return {
        type: HIDE_INPUT_BAR,
    }
}

export const createBucket = () => {
    return {
        type: CREATE_BUCKET
    }
}
export const persistBuckets = () => ({
    type: PERSIST_BUCKETS
});
