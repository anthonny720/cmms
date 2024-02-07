import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";
import {map} from "lodash";

const Table = ({data, remove, viewer}) => {
    const me = useSelector((state) => state.Auth.user);
    const columns = [" ", "Nombre", "Tamaño", "Fecha de creación"];

    return (<table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr>
            {columns.map((column, index) => (<th key={index} className="px-6 font-medium text-center">
                {column}
            </th>))}
        </tr>
        </thead>
        <tbody>
        {data && data.length > 0 ? (data.map((item, index) => (
            <tr key={index} className="bg-white border-y hover:bg-[#4687f1] hover:bg-opacity-10">
                <td className="py-2 px-4 text-center">
                    {(me?.role === "P" || me?.role === "B") && (<TrashIcon
                        onClick={() => remove(item)}
                        className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-pointer"
                    />)}
                </td>
                <td
                    className="py-2 whitespace-wrap px-4 text-center cursor-pointer hover:text-blue-400 hover:font-bold"
                    onClick={() => viewer(item?.file)}
                >
                    {item?.file?.split("/")[3]}
                </td>
                <td className="py-2 px-4 text-center">{item?.size}</td>
                <td className="py-2 px-4 text-center">
                    {new Date(item?.created_at).toLocaleDateString("es-PE", {
                        timeZone: "UTC", year: "numeric", month: "long", day: "numeric",
                    })}
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
    </table>);
};

export default Table;
