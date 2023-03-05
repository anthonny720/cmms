import axios from "axios";
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
    GENERATE_OT_FAIL,
    GENERATE_OT_SUCCESS,
    GET_WORK_FINISHED_FAIL,
    GET_WORK_FINISHED_SUCCESS,
    GET_WORK_ORDER_FAIL,
    GET_WORK_ORDER_SUCCESS,
    GET_WORK_PENDING_FAIL,
    GET_WORK_PENDING_SUCCESS,
    GET_WORK_REQUEST_FAIL,
    GET_WORK_REQUEST_SUCCESS,
    UPDATE_WORK_FAIL,
    UPDATE_WORK_SUCCESS, UPDATE_WORK_SUPERVISOR_FAIL, UPDATE_WORK_SUPERVISOR_SUCCESS
} from "./types";
import {setAlert} from "./alert";


export const get_work_pending = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/pending`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_WORK_PENDING_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_WORK_PENDING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_WORK_PENDING_FAIL
        });
    }
}
export const get_work_finished = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/finished`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_WORK_FINISHED_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_WORK_FINISHED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_WORK_FINISHED_FAIL
        });
    }
}

export const add_work = (form,params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/add-work`, form, config);
        if (res.status === 200) {
            dispatch({
                type: ADD_WORK_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_finished(params))
            dispatch(get_work_pending(params))
            dispatch(setAlert('OT registrada', 'success'));
        } else {
            dispatch({
                type: ADD_WORK_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_WORK_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_work = (form, pk,params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/management/update-work/${pk}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_WORK_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_finished(params))
            dispatch(get_work_pending(params))
            dispatch(setAlert('OT actualizada', 'success'));
        } else {
            dispatch({
                type: UPDATE_WORK_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_WORK_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_work_supervisor = (form, pk) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/management/update-work-supervisor/${pk}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_WORK_SUPERVISOR_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_finished())
            dispatch(get_work_pending())
            dispatch(setAlert('OT actualizada', 'success'));
        } else {
            dispatch({
                type: UPDATE_WORK_SUPERVISOR_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_WORK_SUPERVISOR_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_work = (pk) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/management/delete-work/${pk}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_WORK_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_finished())
            dispatch(get_work_pending())
            dispatch(setAlert('OT eliminada', 'success'));
        } else {
            dispatch({
                type: DELETE_WORK_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_WORK_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}

export const get_work_request = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/list-work-request`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_WORK_REQUEST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_WORK_REQUEST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_WORK_REQUEST_FAIL
        });
    }
}
export const add_work_request = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/add-work-request`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_WORK_REQUEST_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_request())
            dispatch(setAlert('Solicitud registrada', 'success'));
        } else {
            dispatch({
                type: ADD_WORK_REQUEST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_WORK_REQUEST_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}

export const generate_ot = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/generate-work`, form, config);
        if (res.status === 201) {
            dispatch({
                type: GENERATE_OT_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_request())
            dispatch(setAlert('OT registrado', 'success'));
        } else {
            dispatch({
                type: GENERATE_OT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GENERATE_OT_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}

export const add_resource_ot = (form, pk, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/add-resource/${pk}`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_RESOURCE_OT_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_finished(params))
            dispatch(get_work_pending(params))
            dispatch(get_work(pk))
            dispatch(setAlert('Artículo registrado', 'success'));
        } else {
            dispatch({
                type: ADD_RESOURCE_OT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_RESOURCE_OT_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_resource_ot = (pk, params, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/management/delete-resource/${pk}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_RESOURCE_OT_SUCCESS,
                payload: res.data
            });
            dispatch(get_work_finished(params))
            dispatch(get_work_pending(params))
            dispatch(get_work(id))
            dispatch(setAlert('Artículo eliminado', 'success'));
        } else {
            dispatch({
                type: DELETE_RESOURCE_OT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_RESOURCE_OT_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}


export const get_work = (pk) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/get-work/${pk}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_WORK_ORDER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_WORK_ORDER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_WORK_ORDER_FAIL
        });
    }
}
