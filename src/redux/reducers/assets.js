import {
    ADD_FILE_FAIL,
    ADD_FILE_SUCCESS,
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
} from "../actions/types";

const initialState = {
    fixed: null, tools: null, physical: null, tree: null, files: null, equipment: null
}

export default function Assets(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_EQUIPMENT_SUCCESS:
            return {
                ...state, equipment: payload.data
            }
        case GET_EQUIPMENT_FAIL:
            return {
                ...state, equipment: null
            }
        case GET_FILES_SUCCESS:
            return {
                ...state, files: payload.data
            }
        case GET_FILES_FAIL:
            return {
                ...state, files: null
            }
        case GET_TREE_ASSETS_SUCCESS:
            return {
                ...state, tree: payload.data
            }
        case GET_TREE_ASSETS_FAIL:
            return {
                ...state, tree: null
            }
        case GET_FIXED_ASSETS_SUCCESS:
            return {
                ...state, fixed: payload.data
            }
        case GET_FIXED_ASSETS_FAIL:
            return {
                ...state, fixed: null
            }
        case GET_PHYSICAL_ASSETS_SUCCESS:
            return {
                ...state, physical: payload.data
            }
        case GET_PHYSICAL_ASSETS_FAIL:
            return {
                ...state, physical: null
            }
        case GET_TOOLS_SUCCESS:
            return {
                ...state, tools: payload.data
            }
        case GET_TOOLS_FAIL:
            return {
                ...state, tools: null
            }
        case ADD_FILE_SUCCESS:
        case ADD_FILE_FAIL:
        case DELETE_FILE_SUCCESS:
        case DELETE_FILE_FAIL:
        case ADD_TOOL_SUCCESS:
        case ADD_TOOL_FAIL:
        case DELETE_TOOL_SUCCESS:
        case DELETE_TOOL_FAIL:
        case UPDATE_TOOL_SUCCESS:
        case UPDATE_TOOL_FAIL:
        case ADD_FIXED_ASSET_SUCCESS:
        case ADD_FIXED_ASSET_FAIL:
        case DELETE_FIXED_ASSET_SUCCESS:
        case DELETE_FIXED_ASSET_FAIL:
        case UPDATE_FIXED_ASSET_SUCCESS:
        case UPDATE_FIXED_ASSET_FAIL:
        case ADD_PHYSICAL_ASSET_SUCCESS:
        case ADD_PHYSICAL_ASSET_FAIL:
        case DELETE_PHYSICAL_ASSET_SUCCESS:
        case DELETE_PHYSICAL_ASSET_FAIL:
        case UPDATE_PHYSICAL_ASSET_SUCCESS:
        case UPDATE_PHYSICAL_ASSET_FAIL:
            return {
                ...state,
            }

        default:
            return state
    }
}