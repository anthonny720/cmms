import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const Table = ({data, update, remove}) => {

    const columns = [' ', 'Habilitado', 'Nombres', 'Apellidos', 'Clasificación', 'Email', 'Teléfono', 'DNI', 'Rol']
    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch()
    return (<table className="w-full rounded-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr className="w-max rounded-lg wg-white">
            {map(columns, (column, index) => (<th key={index} className="px-6 font-medium
                   text-center">{column}</th>))}
        </tr>
        </thead>
        <tbody>

        {data !== null && size(data) > 0 ? map(data, (item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10">
                <td className={'py-2 px-4 text-center text-xs font-light'}>
                    {(me?.role === 'P' || me?.role === 'B') ? (<TrashIcon onClick={() => remove(item)}
                                                                          className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-pointer"/>) : (
                        <button
                            disabled={true}
                            className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-pointer cursor-not-allowed">
                            <TrashIcon/>
                        </button>)}
                </td>

                <td className={'py-2 px-4 text-center text-xs font-light flex justify-center'}>
                    <p
                        className={` w-max ${item?.is_active ? "bg-green-100 text-green-400" : "bg-red-100 text-red-400"}  rounded-lg  font-semibold text-center p-2`}>{item?.is_active ? "Si" : "No"}</p>
                </td>
                <td onClick={() => {
                    (me?.role === 'P' || me?.role === 'B') ? update(item) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))
                }}

                    className={'py-2 px-4 text-center text-xs font-light hover:text-blue-400 hover:font-bold cursor-pointer '}>
                    {item?.first_name}</td>
                <td className={'py-2 px-4 text-center text-xs font-light'}>

                    {item?.last_name}</td>
                <td className={'py-2 px-4 text-center text-xs font-light'}>

                    {item?.get_category_name}</td>
                <td className={'py-2 px-4 text-center text-xs font-light'}>

                    {item?.email}</td>
                <td className={'py-2 px-4 text-center text-xs font-light'}>

                    {item?.phone}</td>
                <td className={'py-2 px-4 text-center text-xs font-light'}>

                    {item?.dni}</td>
                <td className={'py-2 px-4 text-center text-xs font-light'}>

                    {item?.get_role_name}</td>

            </tr>)) : (<tr>
            {map(columns, (_, index) => (<td key={index} className="py-4 px-6 text-center mt-4">
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
            </td>))}
        </tr>)}

        </tbody>
    </table>);
};
export default Table;