import {
    GET_GRAPHICS_COST_DAY_FAIL,
    GET_GRAPHICS_COST_DAY_SUCCESS,
    GET_GRAPHICS_EQUIPMENT_FAIL,
    GET_GRAPHICS_EQUIPMENT_SUCCESS,
    GET_GRAPHICS_FACILITES_FAIL,
    GET_GRAPHICS_FACILITES_SUCCESS,
    GET_GRAPHICS_FAILURE_FAIL,
    GET_GRAPHICS_FAILURE_SUCCESS,
    GET_GRAPHICS_PERSONNEL_FAIL,
    GET_GRAPHICS_PERSONNEL_SUCCESS,
    GET_GRAPHICS_TOTAL_COST_FAIL,
    GET_GRAPHICS_TOTAL_COST_SUCCESS,
    GET_GRAPHICS_TYPE_FAIL,
    GET_GRAPHICS_TYPE_SUCCESS,
    GET_INDICATORS_FAIL,
    GET_INDICATORS_SUCCESS,
    GET_TOTAL_OT_FAIL,
    GET_TOTAL_OT_SUCCESS,
    GET_TOTAL_TOTAL_OT_FAIL,
    GET_TOTAL_TOTAL_OT_SUCCESS
} from "../actions/types";

const initialState = {
    count_fail: null,
    count_type: null,
    ot_finished: null,
    ot_pending: null,
    ot_compliance: null,
    total_days: null,
    count_total_ot: null,
    total_hours: null,
    count_physical: null,
    count_fixed: null,
    indicators: null,
    cost_day: null,
    cost_user: null,
    cost_material: null,
    total_ot: null
};

export default function Graphics(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_TOTAL_OT_SUCCESS:
            return {
                ...state, total_ot: payload.data
            }
        case GET_TOTAL_OT_FAIL:
            return {
                ...state, total_ot: null
            }
        case GET_GRAPHICS_TOTAL_COST_SUCCESS:
            return {
                ...state, cost_user: payload.user, cost_material: payload.material
            }
        case GET_GRAPHICS_TOTAL_COST_FAIL:
            return {
                ...state, cost_user: null, cost_material: null
            }
        case GET_GRAPHICS_COST_DAY_SUCCESS:
            return {
                ...state, cost_day: payload.data
            }
        case GET_GRAPHICS_COST_DAY_FAIL:
            return {
                ...state, cost_day: null
            }
        case GET_INDICATORS_SUCCESS:
            return {
                ...state, indicators: payload.data
            }
        case GET_INDICATORS_FAIL:
            return {
                ...state, indicators: null
            }

        case GET_GRAPHICS_FACILITES_SUCCESS:
            return {
                ...state, count_fixed: payload.count_facilities
            }
        case GET_GRAPHICS_FACILITES_FAIL:
            return {
                ...state, count_fixed: null
            }
        case GET_TOTAL_TOTAL_OT_SUCCESS:
            return {
                ...state, ot_finished: payload.finished, ot_pending: payload.pending, ot_compliance: payload.compliance
            }
        case GET_TOTAL_TOTAL_OT_FAIL:
            return {
                ...state, ot_finished: null, ot_pending: null, ot_compliance: null
            }
        case GET_GRAPHICS_EQUIPMENT_SUCCESS:
            return {
                ...state, count_physical: payload.count_equipment
            }
        case GET_GRAPHICS_EQUIPMENT_FAIL:
            return {
                ...state, count_physical: null
            }

        case GET_GRAPHICS_FAILURE_SUCCESS:
            return {
                ...state, count_fail: payload.count_failure
            }
        case GET_GRAPHICS_FAILURE_FAIL:
            return {
                ...state, count_fail: null
            }
        case GET_GRAPHICS_PERSONNEL_SUCCESS:
            return {
                ...state,
                count_total_ot: payload.count_total_ot,
                total_hours: payload.total_hours,
                total_days: payload.days
            }
        case GET_GRAPHICS_PERSONNEL_FAIL:
            return {
                ...state, count_total_ot: null, total_hours: null, total_days: null
            }
        case  GET_GRAPHICS_TYPE_SUCCESS:
            return {
                ...state, count_type: payload.count_type
            }
        case  GET_GRAPHICS_TYPE_FAIL:
            return {
                ...state, count_type: null
            }


        default:
            return state
    }
}