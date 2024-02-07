import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const TableTools = ({data, onEdit, columns, onDelete}) => {
    const me = useSelector(state => state.Auth.user);
    const canEdit = me?.role === 'P' || me?.role === 'B';

    return (<table className="w-full rounded-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr className="rounded-lg bg-white w-full">
            {columns.map((column, index) => (<th key={index} className="px-6 font-medium text-center">{column}</th>))}
        </tr>
        </thead>
        <tbody>
        {data && size(data) > 0 ? (data.map((item, index) => (
            <TableRow key={index} item={item} onEdit={onEdit} onDelete={onDelete} canEdit={canEdit}/>))) : (<tr>
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

export default TableTools;

const TableRow = ({item, onEdit, onDelete, canEdit}) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        if (canEdit) {
            onEdit(item);
        } else {
            dispatch(setAlert("No tienes permisos para realizar esta acción", "error"));
        }
    };

    return (<tr className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10">
        <td className="py-2 px-4 text-center text-xs font-light">
            {canEdit ? (<TrashIcon onClick={() => onDelete(item)}
                                   className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-pointer"/>) : (
                <TrashIcon
                    className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-not-allowed"/>)}
        </td>
        <td className="py-2 px-4 text-center text-xs font-light cursor-pointer hover:text-blue-400 hover:font-bold"
            onClick={handleEdit}>{item.name}</td>
        <td className="py-2 px-4 text-center text-xs font-light">{item.model}</td>
        <td className="py-2 px-4 text-center text-xs font-light">{item.maker}</td>
    </tr>);
};
