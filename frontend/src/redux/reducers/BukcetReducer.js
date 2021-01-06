import * as _ from "lodash";
import uniqid from "uniqid";
import { ADD_INPUT_BAR, CHANGE_INPUT, HIDE_INPUT_BAR, CREATE_BUCKET, PERSIST_BUCKETS } from "../actions/BucketsActions";
const initialState = {
    buckets: [],
    isAddBucketClicked: false,
    tempText: "",
}

const colors = ["e69373", "805240", "e6d5cf", "bf5830",
    "77d36a", "488040", "d2e6cf", "43bf30",
    "557aaa", "405c80", "cfd9e6", "306ebf",
    "ff9900", "b36b00", "ffcc80",
    "00b366", "007d48", "bfffe4", "80ffc9",
    "400099", "2d006b", "dabfff", "b580ff"];

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
            let colorIdx = _.random(colors.length - 1);
            prevBuckets.push({ name: state.tempText, id: uniqid(), color: colors[colorIdx] });
            window.localStorage.setItem("bucketState", JSON.stringify({ ...state, buckets: prevBuckets, isAddBucketClicked: false }));
            return { ...state, buckets: prevBuckets, tempText: "", isAddBucketClicked: false }
        }
        default: return state;
    }
}