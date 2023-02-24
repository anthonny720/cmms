import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const Table = ({data, update, remove}) => {

    const columns = [' ', 'Habilitado', 'Nombres', 'Apellidos', 'Clasificación', 'Email', 'Teléfono', 'DNI', 'Rol']
    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch()
    return (<div className="overflow-x-auto relative scrollbar-hide mt-4">
        <table className="w-full rounded-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700  bg-white w-max">

            <tr className={"w-max rounded-lg wg-white"}>
                {map(columns, (column, index) => (<th key={index} className="px-6 font-medium
                   text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>

            {data !== null && size(data) > 0 ? map(data, (row, index) => (
                <tr key={index} className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10">
                    <td className=" py-2  justify-center  text-center text-xs font-light cursor-pointer p-2 ">
                        <TrashIcon onClick={() => {
                            me && me !== undefined && me !== null && me?.role === "Editor" ? remove(row) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))
                        }}

                                   className={"w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"}/></td>

                    <td className=" py-2 flex  justify-center  text-center text-xs font-light  p-2 "><p
                        className={` w-max ${row?.is_active ? "bg-green-100 text-green-400" : "bg-red-100 text-red-400"}  rounded-lg  font-semibold text-center p-2`}>{row?.is_active ? "Si" : "No"}</p>
                    </td>
                    <td onClick={() => {
                        me && me !== undefined && me !== null && me?.role === "Editor" ? update(row) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))
                    }}
                        className=" py-2  justify-center  text-center text-xs font-light  p-2 cursor-pointer ">{row?.first_name}</td>
                    <td className=" py-2  justify-center  text-center text-xs font-light  p-2  ">{row?.last_name}</td>
                    <td className=" py-2  justify-center  text-center text-xs font-light  p-2  ">{row?.get_category_name}</td>
                    <td className=" py-2  justify-center  text-center text-xs font-light  p-2  ">{row?.email}</td>
                    <td className=" py-2  justify-center  text-center text-xs font-light  p-2  ">{row?.phone}</td>
                    <td className=" py-2  justify-center  text-center text-xs font-light  p-2  ">{row?.dni}</td>
                    <td className=" py-2  justify-center  text-center text-xs font-light  p-2  ">{row?.role}</td>

                </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton className={"bg-red-500"} count={10}/>
                    </th>))}
            </tr>}

            </tbody>
        </table>
    </div>);
};
export default Table;