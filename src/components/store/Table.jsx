import React, {memo} from 'react';
import {map, size} from 'lodash-es'; // Importando específicamente desde lodash-es

// Utilidad ligera para formatear números
const formatNumber = (number, decimals = 0) => {
    return number.toLocaleString(undefined, {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals,
    });
};

const Table = memo(({data}) => {
    const columns = ['Stock', 'Descripción', 'Grupo', 'Código', 'U.M', 'Costo'];

    return (<table className="w-full rounded-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-white">
        <tr className="w-max rounded-lg wg-white">
            {columns.map((column, index) => (<th key={index} className="px-6 font-medium text-center">
                {column}
            </th>))}
        </tr>
        </thead>
        <tbody>
        {data !== null && size(data) > 0 ? (map(data, (row, index) => (
            <tr key={index} className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10">
                <td className="py-2 text-center text-xs font-light">
                <span
                    className={`text-xs font-semibold p-1 rounded-xl w-2 h-2 ${row?.stock < 1 ? 'bg-red-400 text-red-400' : 'bg-green-400 text-green-400'} bg-opacity-20`}
                >
                  {formatNumber(row?.stock)}
                </span>
                </td>
                <td className="py-2 text-center text-xs font-light">{row.description}</td>
                <td className="py-2 text-center text-xs font-light">{row.group}</td>
                <td className="py-2 text-center text-xs font-light">{row.code_sap}</td>
                <td className="py-2 text-center text-xs font-light">{row.unit_measurement}</td>
                <td className="py-2 text-center text-xs font-light">{row.value}</td>
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
});

export default Table;
