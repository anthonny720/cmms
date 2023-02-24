import axios from "axios";
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
} from "./types";


export const get_graphics_personnel = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-personnel`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_PERSONNEL_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_PERSONNEL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_PERSONNEL_FAIL
        });
    }
}
export const get_graphics_failure = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-failure`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_FAILURE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_FAILURE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_FAILURE_FAIL
        });
    }
}
export const get_graphics_type = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-type`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_TYPE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_TYPE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_TYPE_FAIL
        });
    }
}
export const get_graphics_equipment = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-equipment`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_EQUIPMENT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_EQUIPMENT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_EQUIPMENT_FAIL
        });
    }
}
export const get_graphics_facilities = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-facilities`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_FACILITES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_FACILITES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_FACILITES_FAIL
        });
    }
}
export const get_graphics_total_ot = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-total-ot`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TOTAL_TOTAL_OT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_TOTAL_TOTAL_OT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TOTAL_TOTAL_OT_FAIL
        });
    }
}

export const get_graphics_indicators = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-indicators`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_INDICATORS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_INDICATORS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_INDICATORS_FAIL
        });
    }
}
export const get_graphics_cost_day = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-cost-day`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_COST_DAY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_COST_DAY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_COST_DAY_FAIL
        });
    }
}
export const get_graphics_total_cost = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-graphics-total-cost`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GRAPHICS_TOTAL_COST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_GRAPHICS_TOTAL_COST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GRAPHICS_TOTAL_COST_FAIL
        });
    }
}
export const get_total_ot = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/graphics/get-total-ot`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TOTAL_OT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_TOTAL_OT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TOTAL_OT_FAIL
        });
    }
}