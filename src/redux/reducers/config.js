import {
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    ADD_FAILURE_FAIL,
    ADD_FAILURE_SUCCESS,
    ADD_TYPE_FAIL,
    ADD_TYPE_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    DELETE_FAILURE_FAIL,
    DELETE_FAILURE_SUCCESS,
    DELETE_TYPE_FAIL,
    DELETE_TYPE_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_FAILURES_FAIL,
    GET_FAILURES_SUCCESS,
    GET_TYPES_FAIL,
    GET_TYPES_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_FAILURE_FAIL,
    UPDATE_FAILURE_SUCCESS,
    UPDATE_TYPE_FAIL,
    UPDATE_TYPE_SUCCESS
} from "../actions/types";

const initialState = {
    failures: null, types: null, categories: null
}

export default function Configuration(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CATEGORY_SUCCESS:
            return {
                ...state, categories: payload.data
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state, categories: null
            }
        case GET_FAILURES_SUCCESS:
            return {
                ...state, failures: payload.data
            }
        case GET_FAILURES_FAIL:
            return {
                ...state, failures: null
            }
        case GET_TYPES_SUCCESS:
            return {
                ...state, types: payload.data
            }
        case GET_TYPES_FAIL:
            return {
                ...state, types: null
            }
        case ADD_FAILURE_SUCCESS:
        case ADD_FAILURE_FAIL:
        case DELETE_FAILURE_SUCCESS:
        case DELETE_FAILURE_FAIL:
        case UPDATE_FAILURE_SUCCESS:
        case UPDATE_FAILURE_FAIL:
        case ADD_TYPE_SUCCESS:
        case ADD_TYPE_FAIL:
        case DELETE_TYPE_SUCCESS:
        case DELETE_TYPE_FAIL:
        case UPDATE_TYPE_SUCCESS:
        case UPDATE_TYPE_FAIL:
        case ADD_CATEGORY_SUCCESS:
        case ADD_CATEGORY_FAIL:
        case DELETE_CATEGORY_SUCCESS:
        case DELETE_CATEGORY_FAIL:
        case UPDATE_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state

            }
        default:
            return state
    }
}