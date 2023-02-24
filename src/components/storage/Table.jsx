import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const Table = ({data, remove, viewer}) => {
    const dispatch = useDispatch()
    const me = useSelector(state => state.Auth.user)
    const columns = [' ', 'Nombre', 'Tamaño', 'Fecha de creación',];

    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table className="w-full rounded-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700  bg-white w-max">

            <tr className={"w-max rounded-lg wg-white invisible sm:visible "}>
                {map(columns, (column, index) => (<th key={index} className="px-6 font-medium
                   text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>


            {data !== null && size(data) > 0 ? map(data, (row, index) => (

                <tr key={index} className="bg-white border-y hover:bg-[#4687f1] hover:bg-opacity-10 ">
                    <td className=" py-2 flex justify-center   text-center text-xs font-light cursor-pointer p-2 ">
                        <TrashIcon onClick={() => {
                            me && me !== undefined && me !== null && me?.role === "Editor" ? remove(row) : dispatch(setAlert("No tienes permisos para eliminar archivos", "error"))
                        }}
                                   className={"w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"}/></td>
                    <td className="py-2 text-center text-xs font-light cursor-pointer"
                        onClick={() => viewer(row?.file)}>{row?.file?.split('/')[3]}</td>
                    <td className="py-2 text-center text-xs font-light cursor-pointer">{row?.size}</td>
                    <td className="py-2 text-center text-xs font-light invisible sm:visible">{new Date(row?.created_at).toLocaleDateString('es-PE', {
                        timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'
                    })}</td>
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