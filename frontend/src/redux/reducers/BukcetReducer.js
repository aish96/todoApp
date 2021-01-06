import * as _ from "lodash";
import { ADD_INPUT_BAR, CHANGE_INPUT, HIDE_INPUT_BAR, CREATE_BUCKET, PERSIST_BUCKETS, IS_LOADING } from "../actions/BucketsActions";
const initialState = {
    buckets: [],
    isAddBucketClicked: false,
    tempText: "",
    loading: false
}


export const BucketReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSIST_BUCKETS:
            let todoState = JSON.parse(window.localStorage.getItem("bucketState"));
            return todoState || { ...state };
        case ADD_INPUT_BAR:
            {
                return { ...state, isAddBucketClicked: true };
            }
        case CHANGE_INPUT:
            {
                return { ...state, tempText: action.payload };
            }
        case HIDE_INPUT_BAR:
            return { ...state, isAddBucketClicked: false, tempText: "" };
        case CREATE_BUCKET: {
            let prevBuckets = _.cloneDeep(state.buckets);
            prevBuckets.push({ name: action.payload.name, id: action.payload.id, color: action.payload.color });
            window.localStorage.setItem("bucketState", JSON.stringify({ ...state, buckets: prevBuckets, isAddBucketClicked: false }));
            return { ...state, buckets: prevBuckets, tempText: "", isAddBucketClicked: false, loading: false }
        }
        case IS_LOADING: {
            return { ...state, loading: true }
        }
        default: return state;
    }
}