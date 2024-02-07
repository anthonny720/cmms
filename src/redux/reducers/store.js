import {
    ADD_REQUIREMENT_FAIL,
    ADD_REQUIREMENT_SUCCESS,
    DELETE_REQUIREMENT_FAIL,
    DELETE_REQUIREMENT_SUCCESS,
    GET_REQUIREMENTS_FAIL,
    GET_REQUIREMENTS_SUCCESS,
    GET_STORE_FAIL,
    GET_STORE_SUCCESS,
    REMOVE_SYNC_STORE_LOADING,
    SET_SYNC_STORE_LOADING,
    SYNC_STORE_FAIL,
    SYNC_STORE_SUCCESS,
    UPDATE_REQUIREMENT_FAIL,
    UPDATE_REQUIREMENT_SUCCESS
} from "../actions/types";

const initialState = {
    articles: null, count: null, requirements: null, loading: false
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
                ...state, articles: payload.data
            }
        case GET_STORE_FAIL:
            return {
                ...state, articles: null
            }
        case SET_SYNC_STORE_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_SYNC_STORE_LOADING:
            return {
                ...state,
                loading: false
            }
        case ADD_REQUIREMENT_SUCCESS:
        case ADD_REQUIREMENT_FAIL:
        case DELETE_REQUIREMENT_SUCCESS:
        case DELETE_REQUIREMENT_FAIL:
        case UPDATE_REQUIREMENT_SUCCESS:
        case UPDATE_REQUIREMENT_FAIL:
        case SYNC_STORE_SUCCESS:
        case SYNC_STORE_FAIL:

            return {
                ...state
            }
        default:
            return state
    }
}