import React, {useState} from 'react';
import {filter, map, size} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";
import DocumentViewer from "../workOrder/Document";
import Modal from "../util/Modal";

const Table = ({total_ot}) => {
    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleViewTask = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}><DocumentViewer data={data}/></div>)
    }
    const physical = useSelector(state => state.Assets.physical)
    const types = useSelector(state => state.Configuration.types)
    const failures = useSelector(state => state.Configuration.failures)
    return (<div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className="w-full overflow-x-scroll xl:overflow-x-hidden  h-44 overflow-y-auto scrollbar-hide">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                <tr className="w-full  border-gray-300 dark:border-gray-200 border-b ">

                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal ">
                        <div
                            className="text-gray-600 dark:text-gray-400 opacity-0 cursor-default  w-10">
                            <div
                                className="absolute top-0 right-0 w-5  mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">3
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-file" width={28}
                                 height={28} viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                                <path
                                    d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
                            </svg>
                        </div>
                    </th>
                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Fecha
                    </th>
                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Origen
                        de falla
                    </th>
                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Tipo
                        de mantenimiento
                    </th>
                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Equipo</th>
                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Descripción</th>
                    <th className="text-gray-600 text-center dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Costo</th>
                </tr>
                </thead>
                <tbody>
                {total_ot && size(total_ot) > 0 && map(total_ot, (row, index) => {
                    return (<tr className="p-6 border-gray-300 dark:border-gray-200 border-b" key={index}>
                        <td className="text-sm pr-6 p-2 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            <div onClick={() => handleViewTask(row)}
                                className="relative w-10 text-gray-600 dark:text-gray-400 left-5 cursor-pointer ">

                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="icon icon-tabler icon-tabler-file text-gray-400 hover:text-blue-400" width={28}
                                     height={28} viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                                    <path
                                        d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
                                </svg>
                            </div>
                        </td>
                        <td className="text-xs text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal font-light leading-4">{new Date(row?.date_start).toLocaleDateString()}</td>
                        <td className="text-xs text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal font-light leading-4">{filter(failures, (item) => item.id === row?.failure)[0]?.name}</td>
                        <td className="text-xs text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal font-light leading-4">{filter(types, (item) => item.id === row?.type_maintenance)[0]?.name}</td>
                        <td className="text-xs text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal font-light leading-4">{filter(physical, (item) => item.id === row?.asset)[0]?.name}</td>
                        <td className="text-xs text-center pr-6 whitespace-no-wrap overflow-x-auto scrollbar-hide max-w-xs font-light text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                            {row?.description}
                        </td>
                        <td className="text-xs text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 "> S/{Humanize.formatNumber(row?.cost, 2)}</td>

                    </tr>)
                })}


                </tbody>
            </table>
        </div>
    </div>);
};

export default Table;
