import React, {Fragment, useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {filter, map, size} from "lodash";
import {
    faCheck,
    faCircle,
    faClipboardCheck,
    faEye,
    faHourglass,
    faPlusCircle,
    faPlusSquare,
    faTrash,
    faUser
} from "@fortawesome/free-solid-svg-icons";

import {Popover, Transition} from "@headlessui/react";
import FormTasks from "../../components/workOrder/FormTasks";
import Modal from "../../components/util/Modal";
import {useDispatch, useSelector} from "react-redux";
import {get_physical, get_tools} from "../../redux/actions/assets";
import {get_failures, get_types} from "../../redux/actions/config";
import {get_users} from "../../redux/actions/auth";
import {delete_work, get_work_finished, get_work_pending} from "../../redux/actions/management";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {MySwal} from "../../helpers/util";
import Filter from "../../components/workOrder/Filter";
import DocumentViewer from "../../components/workOrder/Document";
import {ClockIcon} from "@heroicons/react/24/solid";
import FormResourcesOrder from "../../components/workOrder/FormResourcesOrder";
import {get_articles} from "../../redux/actions/store";
import Humanize from "humanize-plus";
import FormSupervisor from "../../components/workOrder/FormSupervisor";


const WorkOrder = () => {
    const dispatch = useDispatch()
    const me = useSelector(state => state.Auth.user)

    const work_pending = useSelector(state => state.Management.pending)
    const work_finished = useSelector(state => state.Management.finished)
    const [params, setParams] = useState({});
    const users = useSelector(state => state.Auth.users)
    const physical = useSelector(state => state.Assets.physical)
    const types = useSelector(state => state.Configuration.types)
    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleAddTask = () => {
        setIsOpen(true)
        setContent(<FormTasks close={openModal} params={params}/>)
    }
    const handleViewTask = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}><DocumentViewer data={data}/></div>)
    }
    const handleUpdateTask = (data) => {
        setIsOpen(true)
        setContent(<FormTasks params={params} id={data.id} close={openModal} data={data}/>)
    }
    const handleUpdateSupervisor = (data) => {
        setIsOpen(true)
        setContent(<FormSupervisor params={params} id={data.id} close={openModal} data={data}/>)
    }

    const handleUpdateResource = (data) => {
        setIsOpen(true)
        setContent(<FormResourcesOrder close={openModal} data={data} params={params}/>)
    }

    const handleDeleteWork = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar esta OT?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_work(data.id))
            }
        })
    }
    useEffect(() => {
        dispatch(get_physical())
        dispatch(get_tools())
        dispatch(get_types())
        dispatch(get_failures())
        dispatch(get_users())
        dispatch(get_work_pending())
        dispatch(get_work_finished())
        dispatch(get_articles())
    }, []);


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        {me && me !== undefined && me !== null && me?.role === "Editor" && "Técnico" && <button
            className={"absolute z-30 peer md:right-0 right-4 xs:left-20 bottom-0  h-14 w-14 rounded-full bg-[#4687f1] text-lg"}>
            <Popover className="relative">
                {({open}) => (<>
                    <Popover.Button
                        className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center space-x-2 p-2 rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <FontAwesomeIcon className={"text-white rounded-full"} icon={faPlusCircle}/>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className="absolute bottom-1/2 z-10 mt-3 w-max  -translate-x-2/3 transform px-4 sm:px-0 lg:max-w-3xl">
                            <div
                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid  bg-white   ">
                                    <button type={"button"} onClick={() => handleAddTask()}
                                            className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                                        <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                                         size={"2x"} icon={faPlusSquare}/>
                                        <p className={"text-[#4687f1] font-semibold"}>Añadir</p>
                                    </button>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>)}
            </Popover>

        </button>}
        <Filter setParams={setParams} action_one={get_work_pending} action_two={get_work_finished}/>
        <div
            className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-12 lg:p-6    w-full h-screen scrollbar-hide overflow-y-auto  ">


            {/*earring*/}
            <div className={"mt-4  "}>
                <div className={"flex items-center bg-white w-full p-2 rounded-xl border border-gray-200"}>
                    <FontAwesomeIcon className={"text-red-400 bg-red-600 bg-opacity-10 p-2 rounded-full "}
                                     icon={faHourglass}/>
                    <span className={"text-red-400 font-normal text-sm p-2"}>Tareas pendientes</span>
                </div>
                <div className={"h-44 lg:h-screen scrollbar-hide overflow-y-auto"}>
                    {work_pending && size(work_pending) > 0 && work_pending !== null && map(work_pending, (item, index) => {
                        return (<div key={index}
                                     className={"flex flex-col items-start bg-white w-full p-2 rounded-xl border border-gray-200 mt-2 "}>


                            <div className={"flex items-center relative w-full"}>

                                {me && me !== undefined && me !== null && me?.role === "Editor" &&
                                    <FontAwesomeIcon onClick={() => handleDeleteWork(item)}
                                                     className={"cursor-pointer text-red-400 bg-red-700 bg-opacity-10 p-2 rounded-full absolute right-0 top-0"}
                                                     size={"2xs"} icon={faTrash}/>}
                                <FontAwesomeIcon
                                    className={"text-gray-500 bg-gray-700 bg-opacity-10 p-2 rounded-full"}
                                    size={"lg"} icon={faUser}/>

                                <div>

                                    {item?.technical?.map((it, index) => {
                                        return (<p key={index}
                                                   className={"text-gray-400 font-semibold text-xs ml-2"}>{filter(users, (i) => i?.id === it).map(j => j?.first_name)} </p>)
                                    })}
                                    <div className={"flex items-center ml-2"}>
                                    <span
                                        className={"text-gray-400 font-light  text-[10px] "}>{new Date(item.date_start).toLocaleDateString('es-PE', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })}</span>
                                        <span
                                            className={"text-gray-400 font-light  text-[10px] ml-2"}>S/ {Humanize.formatNumber(item?.cost, 2)}</span>
                                    </div>
                                </div>
                            </div>
                            <span
                                className={"bg-gray-200 h-2 w-full text-end rounded-xl text-[8px] text-blue-400 my-1"}>100%</span>
                            <span
                                className={"text-[8px] md:text-xs text-black font-normal flex gap-2 mt-2 hover:text-gray-600"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         onClick={() => me && me !== undefined && me !== null && me?.role !== "Visualizador" && handleUpdateResource(item)}
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M4.867 19.125h.008v.008h-.008v-.008z"/>
                                    </svg>
                                    <ReactStars
                                        value={parseInt(item?.criticity)}
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#5F9CF4"
                                    />

                                {filter(physical, (i) => i?.id === item?.asset).map(j => j?.name).join(', ')}
                                    </span>
                            <hr className={"w-full mt-2"}/>
                            <div className={"flex flex-row justify-between w-full"}>
                                <p onClick={() => me && me !== undefined && me !== null && me?.role !== "Visualizador" && handleUpdateTask(item)}
                                   className={"text-sm text-normal text-black cursor-pointer"}>{item?.code_ot}</p>
                                <div className={"flex items-center justify-center"}>
                                    <FontAwesomeIcon className={"text-red-500  p-2 rounded-full"}
                                                     size={"2xs"} icon={faCircle}/>
                                    <p className={"text-sm font-light text-red-400 text-end"}>
                                        {filter(types, (i) => i?.id === item?.type_maintenance).map(j => j?.name).join(', ')}
                                    </p>

                                </div>
                            </div>


                        </div>)
                    })}
                </div>


            </div>

            {/*finished*/}
            <div className={"mt-4"}>
                <div className={"flex items-center bg-white w-full p-2 rounded-xl border border-gray-200"}>
                    <FontAwesomeIcon className={"text-green-400 bg-green-600 bg-opacity-10 p-2 rounded-full"}
                                     icon={faCheck}/>
                    <span className={"text-green-400 font-normal text-sm p-2"}>Tareas finalizadas</span>
                </div>
                <div className={"h-44 lg:h-screen scrollbar-hide overflow-y-auto"}>
                    {work_finished && size(work_finished) > 0 && work_finished !== null && map(work_finished, (item, index) => {
                        return (<div key={index}
                                     className={"flex flex-col items-start bg-white w-full p-2 rounded-xl border border-gray-200 mt-2 "}>
                            <div className={"flex items-center relative w-full"}>

                                {me && me !== undefined && me !== null && me?.role === "Supervisor" && <FontAwesomeIcon
                                    onClick={() => handleUpdateSupervisor(item)}
                                    className={"cursor-pointer text-cyan-400 bg-cyan-700 bg-opacity-10 p-2 rounded-full absolute right-0 top-0"}
                                    size={"2xs"} icon={faClipboardCheck}/>}
                                <FontAwesomeIcon onClick={() => handleViewTask(item)}
                                                 className={"cursor-pointer text-gray-400 bg-gray-700 bg-opacity-10 p-2 rounded-full absolute right-8 top-0"}
                                                 size={"2xs"} icon={faEye}/>
                                {me && me !== undefined && me !== null && me?.role === "Editor" && <FontAwesomeIcon
                                    onClick={() => handleDeleteWork(item)}
                                    className={"cursor-pointer text-red-400 bg-red-700 bg-opacity-10 p-2 rounded-full absolute right-0 top-0"}
                                    size={"2xs"} icon={faTrash}/>}
                                <FontAwesomeIcon
                                    className={"text-gray-500 bg-gray-700 bg-opacity-10 p-2 rounded-full"}
                                    size={"lg"} icon={faUser}/>
                                <div>
                                    {item?.technical.map((it, index) => {
                                        return (<p key={index}
                                                   className={"text-gray-400 font-semibold text-xs ml-2"}>{filter(users, (i) => i?.id === it).map(j => j?.first_name)} </p>)
                                    })}
                                    <div className={"flex items-center ml-2"}>
                                    <span
                                        className={"text-gray-400 font-light  text-[10px] "}>{new Date(item.date_start).toLocaleDateString('es-PE', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })}</span>
                                        <span
                                            className={"text-gray-400 font-light  text-[10px] ml-2"}>S/ {Humanize.formatNumber(item?.cost, 2)}</span>
                                    </div>
                                </div>
                            </div>
                            <span
                                className={`${item?.validated ? 'bg-blue-400 text-blue-400 w-full' : 'bg-yellow-400 text-yellow-400 w-10/12'} h-2  text-end rounded-xl text-[8px]  my-1`}>{item?.validated ? "100%" : "80%"}</span>
                            <span
                                className={"text-[8px] md:text-xs text-black font-normal flex gap-2 mt-2 hover:text-gray-600"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         onClick={() => me && me !== undefined && me !== null && me?.role === "Editor" && handleUpdateResource(item)}
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M4.867 19.125h.008v.008h-.008v-.008z"/>
                                    </svg>
                                    <ReactStars
                                        value={item.criticity}
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#5F9CF4"
                                    />

                                {filter(physical, (i) => i?.id === item?.asset).map(j => j?.name).join(', ')}
                                    </span>
                            <hr className={"w-full mt-2"}/>
                            <div className={"flex flex-row justify-between w-full"}>
                                <p onClick={() => me && me !== undefined && me !== null && me?.role === "Editor" && handleUpdateTask(item)}
                                   className={"text-xs  text-center text-normal text-black cursor-pointer flex items-center gap-1"}>{item?.code_ot}
                                    <span><ClockIcon className={"w-4 h-4 text-gray-400 "}/></span><span
                                        className={"text-xs font-extralight"}> {item?.time}</span></p>
                                <div className={"flex items-center justify-center"}>
                                    <FontAwesomeIcon className={"text-blue-500  p-2 rounded-full"}
                                                     size={"2xs"} icon={faCircle}/>
                                    <p className={"text-xs font-light text-blue-400 text-end"}>
                                        {filter(types, (i) => i?.id === item?.type_maintenance).map(j => j?.name).join(', ')}
                                    </p>

                                </div>
                            </div>


                        </div>)
                    })}
                </div>
            </div>

        </div>

    </Layout>);
};

export default WorkOrder;
