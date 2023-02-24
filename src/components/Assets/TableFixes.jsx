import Skeleton from "react-loading-skeleton";
import {map, size} from "lodash";
import React from "react";
import {Switch} from "@headlessui/react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {update_fixed} from "../../redux/actions/assets";
import {setAlert} from "../../redux/actions/alert";

const TableFixes = ({data, update, columns, remove}) => {
    const dispatch = useDispatch()
    const me = useSelector(state => state.Auth.user)
    const handleChange = (e, row) => {
        const data = new FormData()
        data.append("enabled", e)
        me && me !== undefined && me !== null && me?.role === "Editor" ? dispatch(update_fixed(data, row?.id)) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))
    }


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
                    <td className=" py-2 flex justify-center  text-center text-xs font-light cursor-pointer p-2 ">
                        <TrashIcon
                            onClick={() => me && me !== undefined && me !== null && me?.role === "Editor" ? remove(row) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))}
                            className={"w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"}/></td>

                    <td className=" py-2 text-center text-xs font-light "><Switch
                        checked={row.enabled}
                        onChange={(e) => handleChange(e, row)}

                        className={`${row.enabled ? 'bg-green-400' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${row.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch></td>

                    <td className=" py-2 text-center text-xs font-light cursor-pointer "
                        onClick={() => me && me !== undefined && me !== null && me?.role === "Editor" ? update(row) : dispatch(setAlert("No tienes permisos para realizar esta acción", 'error'))}>{row.name}</td>
                    <td className=" py-2 text-center text-xs font-light ">{row.description}</td>


                </tr>)) : <tr>
                {map(columns, (column, index) => (
                    <th key={index} className="px-6 py-3 text-center"><Skeleton className={"bg-red-500"} count={10}/>
                    </th>))}
            </tr>}

            </tbody>
        </table>
    </div>);
};
export default TableFixes;