import axios from "axios";
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
} from "./types";
import {setAlert} from "./alert";


export const get_failures = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/configuration/failure`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_FAILURES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FAILURES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_FAILURES_FAIL
        });
    }
}
export const get_types = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/configuration/type`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TYPES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_TYPES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TYPES_FAIL,
        });
    }
}

export const add_type = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/configuration/add-type`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_TYPE_SUCCESS,
            });
            dispatch(get_types());
            dispatch(setAlert("Tipo de mantenimiento registrado", 'success'));
        } else {
            dispatch({
                type: ADD_TYPE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_TYPE_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_type = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/configuration/update-type/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_TYPE_SUCCESS,
            });
            dispatch(get_types());
            dispatch(setAlert("Tipo de mantenimiento actualizado", 'success'));
        } else {
            dispatch({
                type: UPDATE_TYPE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_TYPE_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_type = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/configuration/delete-type/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_TYPE_SUCCESS,
            });
            dispatch(get_types());
            dispatch(setAlert("Tipo de mantenimiento eliminado", 'success'));
        } else {
            dispatch({
                type: DELETE_TYPE_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: DELETE_TYPE_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}


export const add_failure = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/configuration/add-failure`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_FAILURE_SUCCESS,
            });
            dispatch(get_failures());
            dispatch(setAlert("Origen de falla registrado", 'success'));
        } else {
            dispatch({
                type: ADD_FAILURE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_FAILURE_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_failure = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/configuration/update-failure/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_FAILURE_SUCCESS,
            });
            dispatch(setAlert("Origen de falla actualizado", 'success'));

            dispatch(get_failures());

        } else {
            dispatch({
                type: UPDATE_FAILURE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_FAILURE_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_failure = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/configuration/delete-failure/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_FAILURE_SUCCESS,
            });
            dispatch(get_failures());
            dispatch(setAlert("Origen de falla eliminado", 'success'));

        } else {
            dispatch({
                type: DELETE_FAILURE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_FAILURE_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}


export const get_category = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/configuration/category`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CATEGORY_FAIL,
        });
    }
}

export const add_category = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/configuration/add-category`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_CATEGORY_SUCCESS,
            });
            dispatch(get_category());
            dispatch(setAlert("Categoría registrada", 'success'));
        } else {
            dispatch({
                type: ADD_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_CATEGORY_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_category = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/configuration/update-category/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS,
            });
            dispatch(get_category());
            dispatch(setAlert("Categoría actualizada", 'success'));
        } else {
            dispatch({
                type: UPDATE_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_category = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/configuration/delete-category/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_CATEGORY_SUCCESS,
            });
            dispatch(get_category());
            dispatch(setAlert("Categoría eliminada", 'success'));
        } else {
            dispatch({
                type: DELETE_CATEGORY_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}