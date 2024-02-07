import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const TableEquipments = ({data, update, columns, remove}) => {
    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch();


    return (<table className="w-full rounded-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr className="w-max rounded-lg wg-white">
            {columns.map((column, index) => (<th key={index} className="px-6 font-medium text-center">
                {column}
            </th>))}
        </tr>
        </thead>
        <tbody>

        {data !== null && size(data) > 0 ? map(data, (item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10">
                <td className="py-2 px-4 text-center text-xs font-light">
                    {(me?.role === 'P' || me?.role === 'B') ? (<TrashIcon onClick={() => remove(item)}
                                                                          className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"/>) : (
                        <button
                            disabled={true}
                            className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-not-allowed">
                            <TrashIcon/>
                        </button>)}
                </td>
                <td className="py-2 px-4 text-center text-xs font-light">{new Date(item?.buy_date).toLocaleDateString('es-PE', {
                    timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'
                })}</td>
                <td className="py-2 px-4 text-center text-xs font-light hover:text-blue-400 hover:font-bold cursor-pointer"
                    onClick={() => (me?.role === 'P' || me?.role === 'B') ? update(item) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))}>{item?.name}</td>
                <td className="py-2 px-4 text-center text-xs font-light">{item?.model}</td>

                <td className="py-2 px-4 text-center text-xs font-light">{item?.parent_name}</td>
                <td className=" py-2 text-center text-xs font-light flex justify-center">
                    {item?.thumbnail_url !== null &&
                        <img className={"w-20"} src={`${process.env.REACT_APP_API_URL}${item?.thumbnail_url}`}
                             alt=""/>}
                </td>
                <td className={`py-2 px-4 text-center text-xs font-light`}>
                        <span
                            className={`p-2 rounded-xl bg-opacity-10 text-xs ${item?.criticality === "L" ? "text-green-400 bg-green-500" : item.criticality === "M" ? "text-orange-400 bg-orange-500" : item?.criticality === "H" && "text-red-400 bg-red-500"}`}>{item?.criticality === "L" ? "Baja" : item?.criticality === "M" ? "Medio" : "Alta"}</span>
                </td>

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
export default TableEquipments;