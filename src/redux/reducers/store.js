import {
    ADD_REQUIREMENT_FAIL,
    ADD_REQUIREMENT_SUCCESS,
    DELETE_REQUIREMENT_FAIL,
    DELETE_REQUIREMENT_SUCCESS,
    GET_REQUIREMENTS_FAIL,
    GET_REQUIREMENTS_SUCCESS,
    GET_STORE_FAIL,
    GET_STORE_SUCCESS,
    UPDATE_REQUIREMENT_FAIL,
    UPDATE_REQUIREMENT_SUCCESS
} from "../actions/types";

const initialState = {
    articles: null, count: null, requirements: null
}

export default function Store(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_REQUIREMENTS_SUCCESS:
            return {
                ...state, requirements: payload.data
            }
        case GET_REQUIREMENTS_FAIL:
            return {
                ...state, requirements: null
            }
        case GET_STORE_SUCCESS:
            return {
                ...state, articles: payload.results.data, count: payload.count
            }
        case GET_STORE_FAIL:
            return {
                ...state, articles: null, count: null
            }
        case ADD_REQUIREMENT_SUCCESS:
        case ADD_REQUIREMENT_FAIL:
        case DELETE_REQUIREMENT_SUCCESS:
        case DELETE_REQUIREMENT_FAIL:
        case UPDATE_REQUIREMENT_SUCCESS:
        case UPDATE_REQUIREMENT_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}