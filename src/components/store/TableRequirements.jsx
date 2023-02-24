import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {setAlert} from "../../redux/actions/alert";
import {useDispatch, useSelector} from "react-redux";

const TableRequirements = ({data, remove, update}) => {
    const dispatch = useDispatch()
    const me = useSelector(state => state.Auth.user)


    const columns = ['', 'Estado', 'Solicitante', 'Fecha', 'Producto', 'Descripción', 'Cantidad', 'Unidad de medida'];

    return (<div className="overflow-x-auto  scrollbar-hide">
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
                    <td className=" py-2 flex justify-center   text-center text-xs font-light cursor-pointer p-2 ">
                        <TrashIcon onClick={() => {
                            me && me !== undefined && me !== null && me?.role === "Editor" ? remove(row) : dispatch(setAlert("No tienes permisos para eliminar este requerimiento técnico", "error"))
                        }}
                                   className={"w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"}/></td>
                    <td className={`py-2 text-center text-xs font-bold rounded-lg w-max bg-opacity-10 
                    ${row?.status === "Pendiente" ? "bg-blue-400 text-blue-400" : row?.status === "Aprobado" ? "bg-green-400 text-green-400" : row?.status === "Rechazado" ? "bg-red-400 text-red-400" : row?.status === "Parcial" ? "bg-yellow-400 text-yellow-400" : row?.status === "Finalizado" ? "bg-gray-400 text-gray-400" : "bg-gray-400 text-gray-400"} `}>{row?.status}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.user_name}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.date}</td>
                    <td className=" py-2 text-center text-xs font-light cursor-pointer"
                        onClick={() => me && me !== undefined && me !== null && (me?.role === "Editor" || me?.role ==="Compras") && update(row)}>{row?.product}</td>
                    <td className={`py-2 text-center text-xs font-light`}>{row?.description}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.quantity}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.unit_measurement}</td>
                </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton className={"bg-red-500"} count={10}/>
                    </th>))}
            </tr>}

            </tbody>
        </table>
    </div>);
};
export default TableRequirements;