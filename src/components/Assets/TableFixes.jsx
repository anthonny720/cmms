import {map} from "lodash";
import React from "react";
import {Switch} from "@headlessui/react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {update_fixed} from "../../redux/actions/assets";
import {setAlert} from "../../redux/actions/alert";

const TableFixes = ({data, update, remove}) => {
    const columns = ['Activos fijos'];
    const dispatch = useDispatch();
    const {role} = useSelector(state => state.Auth.user);

    const isEditable = role === "B" || role === "P";
    const handleChange = (enabled, id) => {
        if (isEditable) {
            const formData = new FormData();
            formData.append("enabled", enabled);
            dispatch(update_fixed(formData, id));
        } else {
            dispatch(setAlert("No tienes permisos para realizar esta acción", "error"));
        }
    };


    return (<table className="w-full rounded-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr className="rounded-lg bg-white w-full">
            {columns.map((column, index) => (<th key={index} className="px-6 font-medium text-center">{column}</th>))}
        </tr>
        </thead>

        <tbody>

        {data && data.length > 0 ? (data.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10 ">
                <td className="py-2 px-4 text-center text-xs font-light flex gap-4">

                    {isEditable ? (<TrashIcon onClick={() => remove(item)}
                                              className="w-5  text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-pointer "/>) : (
                        <span
                            className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-not-allowed self-center">
                                        <TrashIcon/>
                                    </span>)}
                    <Switch
                        checked={item.enabled}
                        onChange={(e) => handleChange(e, item.id)}
                        className={`${item.enabled ? 'bg-green-400' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                        <span
                            className={`${item.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
                    </Switch>
                    <p className="py-2  text-center text-xs font-light cursor-pointer hover:text-blue-400 hover:font-bold w-max"
                       onClick={() => isEditable ? update(item) : dispatch(setAlert("No tienes permisos para realizar esta acción", 'error'))}>
                        {item.name}
                    </p>

                </td>

            </tr>))) : (<tr>
            {map(columns, (_, index) => (<td key={index} className="py-4 px-6 text-center mt-4">
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
            </td>))}
        </tr>)}

        </tbody>
    </table>)

};
export default TableFixes;