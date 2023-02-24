import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React from "react";
import Humanize from "humanize-plus";

const Table = ({data}) => {

    const columns = ['Código', 'Familia', 'Sub familia', 'Tipo de existencia', 'Descripción', 'Stock', 'U.M.', 'Moneda', 'Valor unitario'];

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
                    <td className=" py-2 text-center text-xs font-light ">{row?.code_sap}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.family}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.sub_family}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.kind_of_existence}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.description}</td>
                    <td className=" py-2 text-center text-xs font-light "><span
                        className={`${row?.stock<3 ? "bg-red-400 text-red-400" :"bg-green-400 text-green-400"}  text-xs  bg-opacity-20 font-semibold p-1 rounded-xl  w-2 h-2`}>{row?.stock}</span>
                    </td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.unit_measurement}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row?.money}</td>
                    <td className=" py-2 text-center text-xs font-light ">{Humanize.formatNumber(row?.value, 2)}</td>
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