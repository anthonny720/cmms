import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";

const Table = ({data, remove, update}) => {
    const me = useSelector(state => state.Auth.user)
    const columns = [' ', 'NOMBRE', 'RUC', 'DIRECCIÓN', 'TELÉFONO', 'EMAIL', 'REPRESENTANTE', 'DESCRIPCIÓN'];

    return (<table className="w-full rounded-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr className="w-max rounded-lg wg-white">
            {map(columns, (column, index) => (<th key={index} className="px-6 font-medium
                   text-center">{column}</th>))}
        </tr>
        </thead>
        <tbody>


        {data !== null && size(data) > 0 ? map(data, (item, index) => (

            <tr key={index} className="bg-white border-y hover:bg-[#4687f1] hover:bg-opacity-10 ">
                <td className="py-2 px-4 text-center text-xs font-light">
                    {(me?.role === 'P' || me?.role === 'J') ? (<TrashIcon onClick={() => remove(item)}
                                                                          className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"/>) : (
                        <button
                            disabled={true}
                            className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-not-allowed">
                            <TrashIcon/>
                        </button>)}
                </td>
                <td className="py-2 px-4 text-center text-xs font-light hover:text-blue-400 hover:font-bold cursor-pointer"
                    onClick={() => (me?.role === "P" || me?.role === 'B') && update(item)}>{item?.name}</td>
                <td className="py-2 px-4 text-center text-xs font-light ">{item?.ruc}</td>
                <td className="py-2 px-4 text-center text-xs font-light ">{item?.direction}</td>
                <td className="py-2 px-4 text-center text-xs font-light ">{item?.phone}</td>
                <td className="py-2 px-4 text-center text-xs font-light ">{item?.email}</td>
                <td className="py-2 px-4 text-center text-xs font-light ">{item?.representative}</td>
                <td className="py-2 px-4 text-center text-xs font-light ">{item?.description}</td>
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