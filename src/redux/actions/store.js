import axios from "axios";
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
} from "./types";
import {setAlert} from "./alert";

export const sync_store = () => async dispatch => {

    dispatch({type: SET_SYNC_STORE_LOADING})

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/store/article/sync    `, config);
        if (res.status === 200) {
            dispatch({
                type: SYNC_STORE_SUCCESS
            });
            dispatch(setAlert('Sincronización exitosa', 'success'));
            dispatch({type: REMOVE_SYNC_STORE_LOADING})
        } else {
            dispatch({
                type: SYNC_STORE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SYNC_STORE_FAIL
        });
        dispatch(setAlert('Error al sincronizar', 'danger'));
        dispatch({type: REMOVE_SYNC_STORE_LOADING})
    }
}


export const get_articles = (params, p = 1) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/store/article?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_STORE_FAIL
        });
    }
}

export const get_requirements = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/store/list-requirements`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REQUIREMENTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REQUIREMENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REQUIREMENTS_FAIL
        });
    }
}
export const add_requirements = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/store/add-requirements`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_REQUIREMENT_SUCCESS,
            });
            dispatch(get_requirements());
            dispatch(setAlert('Requerimiento registrado', 'success'));
        } else {
            dispatch({
                type: ADD_REQUIREMENT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_REQUIREMENT_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_requirements = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/store/update-requirements/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REQUIREMENT_SUCCESS,
            });
            dispatch(get_requirements());
            dispatch(setAlert('Requerimiento actualizado', 'success'));
        } else {
            dispatch({
                type: UPDATE_REQUIREMENT_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: UPDATE_REQUIREMENT_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_requirements = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/store/delete-requirements/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_REQUIREMENT_SUCCESS,
            });
            dispatch(get_requirements());
            dispatch(setAlert('Requerimiento eliminado', 'success'));
        } else {
            dispatch({
                type: DELETE_REQUIREMENT_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: DELETE_REQUIREMENT_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}