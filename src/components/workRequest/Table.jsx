import {map, size} from "lodash";
import React from "react";
import {CheckCircleIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {useDispatch, useSelector} from "react-redux";
import Skeleton from "react-loading-skeleton";
import {setAlert} from "../../redux/actions/alert";

const Table = ({data, add}) => {
    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch()

    const columns = ['', 'REVISADO', 'Fecha de solicitud', 'Cliente Interno', 'Equipo', 'Descripción',];

    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table className="w-full rounded-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700  bg-white w-max">

            <tr className={"w-max rounded-lg wg-white  "}>
                {map(columns, (column, index) => (<th key={index} className="px-6 font-medium
                   text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>


            {data !== null && size(data) > 0 ? map(data, (row, index) => (

                <tr key={index} className="bg-white border-y hover:bg-[#4687f1] hover:bg-opacity-10 ">
                    <td className="py-2 text-center text-xs font-light cursor-pointer">
                        {!row?.work_order ? <PlusCircleIcon onClick={() => {
                                me && me !== undefined && me !== null && me?.role === "Editor" ? add(row) : dispatch(setAlert('No tienes permisos para realizar esta acción', 'error'))
                            }}

                                                            className={"w-5 h-5 text-blue-400 hover:text-blue-600"}/> :
                            <CheckCircleIcon className={"w-5 h-5 text-green-400 hover:text-green-600"}/>}

                    </td>
                    <td className="py-2 text-center text-xs font-light cursor-pointer">{row?.work_order ? <span
                            className={"bg-green-400 text-green-500 p-1 rounded-full bg-opacity-30 font-bold"}>SI</span> :
                        <span
                            className={"bg-red-400 text-red-500 p-1 rounded-full bg-opacity-30 font-bold"}>NO</span>}</td>
                    <td className="py-2 text-center text-xs font-light ">{new Date(row?.date_report).toLocaleDateString('es-PE', {
                        timeZone: 'UTC',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                    })}</td>
                    <td className="py-2 text-center text-xs font-light cursor-pointer">{row?.client}</td>
                    <td className="py-2 text-center text-xs font-light cursor-pointer">{row?.equipment}</td>
                    <td className="py-2 text-center text-xs font-light cursor-pointer">{row?.description}</td>

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