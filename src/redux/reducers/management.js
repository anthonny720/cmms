import {
    ADD_RESOURCE_OT_FAIL,
    ADD_RESOURCE_OT_SUCCESS,
    ADD_WORK_FAIL,
    ADD_WORK_REQUEST_FAIL,
    ADD_WORK_REQUEST_SUCCESS,
    ADD_WORK_SUCCESS,
    DELETE_RESOURCE_OT_FAIL,
    DELETE_RESOURCE_OT_SUCCESS,
    DELETE_WORK_FAIL,
    DELETE_WORK_SUCCESS,
    GET_WORK_FINISHED_FAIL,
    GET_WORK_FINISHED_SUCCESS,
    GET_WORK_ORDER_FAIL,
    GET_WORK_ORDER_SUCCESS,
    GET_WORK_PENDING_FAIL,
    GET_WORK_PENDING_SUCCESS,
    GET_WORK_REQUEST_FAIL,
    GET_WORK_REQUEST_SUCCESS,
    UPDATE_WORK_FAIL,
    UPDATE_WORK_SUCCESS,
    UPDATE_WORK_SUPERVISOR_FAIL,
    UPDATE_WORK_SUPERVISOR_SUCCESS
} from '../actions/types'

const initialState = {
    pending: null, finished: null, work_request: null, work: null
}

export default function Management(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_WORK_ORDER_SUCCESS:
            return {
                ...state,
                work: payload.data
            }
        case GET_WORK_ORDER_FAIL:
            return {
                ...state,
                work: null
            }
        case GET_WORK_REQUEST_SUCCESS:
            return {
                ...state,
                work_request: payload.data
            }
        case GET_WORK_REQUEST_FAIL:
            return {
                ...state,
                work_request: null
            }
        case GET_WORK_PENDING_SUCCESS:
            return {
                ...state,
                pending: payload.data
            }
        case GET_WORK_PENDING_FAIL:
            return {
                ...state,
                pending: null
            }
        case GET_WORK_FINISHED_SUCCESS:
            return {
                ...state,
                finished: payload.data
            }
        case GET_WORK_FINISHED_FAIL:
            return {
                ...state,
                finished: null
            }
        case ADD_WORK_SUCCESS:
        case ADD_WORK_FAIL:
        case DELETE_WORK_SUCCESS:
        case DELETE_WORK_FAIL:
        case UPDATE_WORK_SUCCESS:
        case UPDATE_WORK_FAIL:
        case ADD_WORK_REQUEST_SUCCESS:
        case ADD_WORK_REQUEST_FAIL:
        case ADD_RESOURCE_OT_FAIL:
        case ADD_RESOURCE_OT_SUCCESS:
        case DELETE_RESOURCE_OT_SUCCESS:
        case DELETE_RESOURCE_OT_FAIL:
        case UPDATE_WORK_SUPERVISOR_SUCCESS:
        case UPDATE_WORK_SUPERVISOR_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}