import {
    ADD_THIRD_PARTY_FAIL,
    ADD_THIRD_PARTY_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    DELETE_THIRD_PARTY_FAIL,
    DELETE_THIRD_PARTY_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    GET_THIRD_PARTIES_FAIL,
    GET_THIRD_PARTIES_SUCCESS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
    REMOVE_AUTH_LOADING,
    SET_AUTH_LOADING,
    UPDATE_THIRD_PARTY_FAIL,
    UPDATE_THIRD_PARTY_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS
} from './types'
import axios from 'axios'
import {setAlert} from "./alert";

export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}

export const login = (form) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, form, config);

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user());
            dispatch(get_users())
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch(setAlert("La combinación de usuario y contraseña no es correcta", "error"));

            dispatch({
                type: REMOVE_AUTH_LOADING
            });
        }
    } catch (err) {
        dispatch(setAlert("La combinación de usuario y contraseña no es correcta", "error"));

        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }
}


export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}


export const get_users = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_USERS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_USERS_FAIL
        });
    }
}
export const add_user = (form) => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_USER_SUCCESS,
            });
            dispatch(setAlert("Usuario registrado", "success"));

            dispatch(get_users());

        } else {
            dispatch({
                type: ADD_USER_FAIL
            });
        }
    } catch (err) {
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

        dispatch({
            type: ADD_USER_FAIL
        });


    }
}
export const delete_user = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/delete-user/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_USER_SUCCESS,
            });
            dispatch(setAlert("Usuario eliminado", 'success'));
            dispatch(get_users());

        } else {
            dispatch({
                type: DELETE_USER_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const update_user = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/update-user/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_USER_SUCCESS,
            });
            dispatch(setAlert("Usuario actualizado", 'success'));
            dispatch(get_users());

        } else {
            dispatch({
                type: UPDATE_USER_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: UPDATE_USER_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const change_password = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/set_password/`, form, config);
        if (res.status === 204) {
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
            });
            dispatch(setAlert("Se actualizó la contraseña correctamente", 'success'));

        } else {
            dispatch({
                type: CHANGE_PASSWORD_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}

export const get_third_parties = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/third-parties`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_THIRD_PARTIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_THIRD_PARTIES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_THIRD_PARTIES_FAIL
        });
    }
}
export const add_third_party = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/third-parties/add`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_THIRD_PARTY_SUCCESS,
                payload: res.data
            });
            dispatch(get_third_parties())
            dispatch(setAlert('Usuario externo registrado', 'success'));
        } else {
            dispatch({
                type: ADD_THIRD_PARTY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_THIRD_PARTY_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const update_third_party = (form, pk) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/third-parties/update/${pk}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_THIRD_PARTY_SUCCESS,
                payload: res.data
            });
            dispatch(get_third_parties())
            dispatch(setAlert('Usuario externo actualizada', 'success'));
        } else {
            dispatch({
                type: UPDATE_THIRD_PARTY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_THIRD_PARTY_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}
export const delete_third_party = (pk) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/third-parties/delete/${pk}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_THIRD_PARTY_SUCCESS,
                payload: res.data
            });
            dispatch(get_third_parties())
            dispatch(setAlert('Usuario externo eliminado', 'success'));
        } else {
            dispatch({
                type: DELETE_THIRD_PARTY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_THIRD_PARTY_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));
    }
}