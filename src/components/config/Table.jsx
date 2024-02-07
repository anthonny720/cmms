import {map, size} from "lodash";
import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";

const Table = ({data, update, columns, remove}) => {

    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch()
    return (<div className="overflow-x-auto relative scrollbar-hide">
        <table className="w-full rounded-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700  bg-white w-max">

            <tr className={"w-max rounded-lg wg-white"}>
                {map(columns, (column, index) => (<th key={index} className="px-6 font-medium
                   text-center">{column}</th>))}
            </tr>
            </thead>
            <tbody>


            {data !== null && size(data) > 0 ? map(data, (item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-[#4687f1] hover:bg-opacity-10">
                    <td className=" py-2 flex justify-center  text-center text-xs font-light cursor-pointer p-2 ">
                        {(me?.role === 'P' || me?.role === 'B') ? (<TrashIcon onClick={() => remove(item)}
                                                                              className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full"/>) : (
                            <button
                                disabled={true}
                                className="w-5 p-0.5 text-red-400 bg-red-500 bg-opacity-10 rounded-full cursor-not-allowed">
                                <TrashIcon/>
                            </button>)}
                    </td>

                    <td onClick={() => me && me !== undefined && me !== null && (me?.role === 'P' || me?.role === 'B') ? update(item) : dispatch(setAlert("No tienes permisos para realizar esta acción", "error"))}
                        className=" py-2 text-center text-xs font-light cursor-pointer hover:text-blue-400 hover:font-bold">{item.name}</td>

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
        </table>
    </div>);
};
export default Table;