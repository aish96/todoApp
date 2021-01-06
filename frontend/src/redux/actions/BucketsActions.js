import uniqid from "uniqid";
import * as _ from "lodash";
const axios = require('axios').default;

export const CREATE_BUCKET = "create_bucket";
export const ADD_INPUT_BAR = "bucketInputBar";
export const CHANGE_INPUT = "on_input_change_bucket";
export const HIDE_INPUT_BAR = "hide_input";
export const PERSIST_BUCKETS = "persist";
export const IS_LOADING = "loading";
export const CREATE_ERROR = "error";



const colors = ["e69373", "805240", "e6d5cf", "bf5830",
    "77d36a", "488040", "d2e6cf", "43bf30",
    "557aaa", "405c80", "cfd9e6", "306ebf",
    "ff9900", "b36b00", "ffcc80",
    "00b366", "007d48", "bfffe4", "80ffc9",
    "400099", "2d006b", "dabfff", "b580ff"];
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

export const createBucket = (data) => {
    return {
        type: CREATE_BUCKET,
        payload: data
    }
}
export const persistBuckets = () => {
    return {
        type: PERSIST_BUCKETS
    };
};
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
export const createBucketAPI = (data) => {
    return (dispatch) => {
        if (data.name && data.name.trim()) {
            dispatch(isLoading());
            data.id = uniqid();
            let colorIdx = _.random(colors.length - 1);
            data.color = colors[colorIdx];

            axios.post("https://56x12e6b60.execute-api.ap-south-1.amazonaws.com/prod/addbucket", data)
                .then(() => {
                    dispatch(createBucket(data));
                })
                .catch((error) => {
                    dispatch(onError(error));
                });
        }
    }
}
export const getStore = () => {
    return (dispatch) => {
        dispatch(isLoading());
        axios.get("https://56x12e6b60.execute-api.ap-south-1.amazonaws.com/prod/getstore")
            .then((res) => {
                dispatch(persistBuckets(res.buckets));
            })
            .catch((error) => {
                dispatch(onError(error));
            });
    }
}