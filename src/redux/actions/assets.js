import axios from "axios";
import {
    ADD_FILE_FAIL,
    ADD_FILE_SUCCESS,
    ADD_FILE_TO_PHYSICAL_ASSET_FAIL,
    ADD_FILE_TO_PHYSICAL_ASSET_SUCCESS,
    ADD_FIXED_ASSET_FAIL,
    ADD_FIXED_ASSET_SUCCESS,
    ADD_PHYSICAL_ASSET_FAIL,
    ADD_PHYSICAL_ASSET_SUCCESS,
    ADD_TOOL_FAIL,
    ADD_TOOL_SUCCESS,
    DELETE_FILE_FAIL,
    DELETE_FILE_SUCCESS,
    DELETE_FIXED_ASSET_FAIL,
    DELETE_FIXED_ASSET_SUCCESS,
    DELETE_PHYSICAL_ASSET_FAIL,
    DELETE_PHYSICAL_ASSET_SUCCESS,
    DELETE_TOOL_FAIL,
    DELETE_TOOL_SUCCESS,
    GET_EQUIPMENT_FAIL,
    GET_EQUIPMENT_SUCCESS,
    GET_FILES_FAIL,
    GET_FILES_SUCCESS,
    GET_FIXED_ASSETS_FAIL,
    GET_FIXED_ASSETS_SUCCESS,
    GET_PHYSICAL_ASSETS_FAIL,
    GET_PHYSICAL_ASSETS_SUCCESS,
    GET_TOOLS_FAIL,
    GET_TOOLS_SUCCESS,
    GET_TREE_ASSETS_FAIL,
    GET_TREE_ASSETS_SUCCESS,
    UPDATE_FIXED_ASSET_FAIL,
    UPDATE_FIXED_ASSET_SUCCESS,
    UPDATE_PHYSICAL_ASSET_FAIL,
    UPDATE_PHYSICAL_ASSET_SUCCESS,
    UPDATE_TOOL_FAIL,
    UPDATE_TOOL_SUCCESS
} from "./types";
import {setAlert} from "./alert";


export const get_files = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets/files`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_FILES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FILES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_FILES_FAIL
        });
    }
}
export const get_tree = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets/tree`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TREE_ASSETS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_TREE_ASSETS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TREE_ASSETS_FAIL
        });
    }
}
export const get_fixed = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets/fixed`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_FIXED_ASSETS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FIXED_ASSETS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_FIXED_ASSETS_FAIL
        });
    }
}
export const get_physical = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets/physical`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PHYSICAL_ASSETS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PHYSICAL_ASSETS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PHYSICAL_ASSETS_FAIL
        });
    }
}
export const get_physical_by_id = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets/update-physical/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_EQUIPMENT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_EQUIPMENT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_EQUIPMENT_FAIL
        });
    }
}
export const get_tools = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets/tools`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TOOLS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_TOOLS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TOOLS_FAIL,
        });
    }
}

export const add_file = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/assets/add-file`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_FILE_SUCCESS,
                payload: res.data
            });
            dispatch(get_files());
            dispatch(setAlert("Documento registrado ", 'success'));
        } else {
            dispatch({
                type: ADD_FILE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_FILE_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const delete_file = (id, pk) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/assets/delete-file/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_FILE_SUCCESS,
            });
            dispatch(get_files());
            dispatch(get_physical());
            pk && dispatch(get_physical_by_id(pk))
            dispatch(setAlert("Documento eliminado", 'success'));
        } else {
            dispatch({
                type: DELETE_FILE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_FILE_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}


export const add_tool = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/assets/add-tool`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_TOOL_SUCCESS,
                payload: res.data
            });
            dispatch(get_tools());

            dispatch(setAlert("Herramienta registrada", 'success'));
        } else {
            dispatch({
                type: ADD_TOOL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_TOOL_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const update_tool = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/assets/update-tool/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_TOOL_SUCCESS,
                payload: res.data
            });
            dispatch(get_tools());

            dispatch(setAlert("Herramienta actualizada ", 'success'));
        } else {
            dispatch({
                type: UPDATE_TOOL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_TOOL_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const delete_tool = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/assets/delete-tool/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_TOOL_SUCCESS,
            });
            dispatch(get_tools());
            dispatch(setAlert("Herramienta eliminada", 'success'));
        } else {
            dispatch({
                type: DELETE_TOOL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_TOOL_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}


export const add_fixed = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/assets/add-fixed`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_FIXED_ASSET_SUCCESS,
                payload: res.data
            });
            dispatch(get_fixed());
            dispatch(get_tree());

            dispatch(setAlert("Activo registrado", 'success'));
        } else {
            dispatch({
                type: ADD_FIXED_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_FIXED_ASSET_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const update_fixed = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/assets/update-fixed/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_FIXED_ASSET_SUCCESS,
            });
            dispatch(get_fixed());

            dispatch(setAlert("Activo actualizado", 'success'));
        } else {
            dispatch({
                type: UPDATE_FIXED_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_FIXED_ASSET_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const delete_fixed = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/assets/delete-fixed/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_FIXED_ASSET_SUCCESS,
            });
            dispatch(get_fixed());
            dispatch(setAlert("Herramienta eliminada", 'success'));
        } else {
            dispatch({
                type: DELETE_FIXED_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_TOOL_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}

export const add_physical = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/assets/add-physical`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PHYSICAL_ASSET_SUCCESS,
                payload: res.data
            });
            dispatch(get_physical());
            dispatch(get_tree());

            dispatch(setAlert("Activo registrado", 'success'));
        } else {
            dispatch({
                type: ADD_PHYSICAL_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PHYSICAL_ASSET_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const update_physical = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/assets/update-physical/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PHYSICAL_ASSET_SUCCESS,
            });
            dispatch(get_physical());
            dispatch(setAlert("Activo actualizado", 'success'));
        } else {
            dispatch({
                type: UPDATE_PHYSICAL_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PHYSICAL_ASSET_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
export const delete_physical = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/assets/delete-physical/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PHYSICAL_ASSET_SUCCESS,
            });
            dispatch(get_physical());
            dispatch(setAlert("Activo eliminado", 'success'));
        } else {
            dispatch({
                type: DELETE_PHYSICAL_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PHYSICAL_ASSET_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}

export const add_file_physical = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/assets/add-file-physical/${id}`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_FILE_TO_PHYSICAL_ASSET_SUCCESS,
                payload: res.data
            });
            dispatch(get_physical());
            dispatch(get_physical_by_id(id));
            dispatch(setAlert("Documento registrado", 'success'));
        } else {
            dispatch({
                type: ADD_FILE_TO_PHYSICAL_ASSET_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_FILE_TO_PHYSICAL_ASSET_FAIL
        });
        dispatch(setAlert("No se puede procesar la solicitud", 'error'));

    }
}
