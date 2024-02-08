import React from 'react';
import Humanize from "humanize-plus";
import {DocumentIcon} from "@heroicons/react/24/outline";
import {ExclamationTriangleIcon, FlagIcon, HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/solid";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";
import {update_work_requester, update_work_supervisor} from "../../redux/actions/management";


const formatDate = (date) => new Date(date).toLocaleDateString('es-PE', {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
});

const TableRegister = ({data, view, update, params}) => {
    const {role} = useSelector(state => state.Auth.user) || {};
    const dispatch = useDispatch();

    const validated = (id) => {
        if (role !== 'R') {
            dispatch(setAlert('No tienes permisos para validar la solicitud', 'error'))
        } else {
            dispatch(update_work_requester(id, params))
        }
    }

    const cleaned = (id) => {
        if (role !== 'S') {
            dispatch(setAlert('No tienes permisos para validar la limpieza', 'error'))
        } else {
            dispatch(update_work_supervisor(id, params))
        }
    }


    const columns = [' ', 'Fecha', 'Origen de falla', 'Tipo de mantenimiento', 'Equipo', 'Descripción', 'Costo'];

    return (<table className="w-full rounded-full text-sm text-left text-gray-500">

        <thead className="text-xs text-gray-700 bg-white w-max">
        <tr className="w-max rounded-lg bg-white">
            {columns.map((column, index) => (<th key={index} className="px-2 font-medium text-center">
                {column}
            </th>))}
        </tr>
        </thead>

        <tbody>
        {data.length > 0 ? data.map((row, index) => (<tr className="border-gray-300 border-b" key={index}>
            <td className="w-max text-sm text-gray-800 tracking-normal leading-4">
                <div className="flex flex-row gap-4">
                    <DocumentIcon
                        onClick={() => view(row)}
                        className="w-5 h-5 text-gray-500 hover:text-blue-400 cursor-pointer"
                    />
                    {row.cleaned ? (<FlagIcon title={"Calidad"}
                                                className="w-5 h-5 text-green-400 hover:text-green-600 cursor-pointer"
                    />) : (<ExclamationTriangleIcon title={"Calidad"}
                                                    onClick={() => cleaned(row?.id)}
                                                    className="w-5 h-5 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                    />)}
                    {row.validated ? (<HandThumbUpIcon title={"Solicitante"}
                                                       className="w-5 h-5 text-green-400 hover:text-green-600 cursor-pointer"
                    />) : (<HandThumbDownIcon title={"Solicitante"}
                                              onClick={() => validated(row?.id)}
                                              className="w-5 h-5 text-red-400 hover:text-red-600 cursor-pointer"
                    />)}
                </div>
            </td>
            <td className="py-2 px-2 text-center text-xs font-light">
                <div
                    onClick={() => update(row)}
                    className="flex flex-col hover:text-blue-400 cursor-pointer hover:font-bold whitespace-nowrap"
                >
                    <p>{formatDate(row.date_start)}</p>
                    <p>{formatDate(row.date_finish)}</p>
                </div>
            </td>
            <td className="py-2 px-2 text-center text-xs font-light">{row.failure_name}</td>
            <td className="py-2 px-2 text-center text-xs font-light">{row.type_name}</td>
            <td className="py-2 px-2 text-center text-xs font-light">{row.physical_name}</td>
            <td className="py-2 px-2 text-center text-xs font-light">{row.description}</td>
            <td className="py-2 px-2 text-center text-xs font-light">
                S/{Humanize.formatNumber(row.cost, 2)}
            </td>
        </tr>)) : (<tr>
            <td colSpan={columns.length} className="text-center">No hay datos disponibles</td>
        </tr>)}


        </tbody>
    </table>);
};

export default TableRegister;