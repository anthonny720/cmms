import React, {Fragment, useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {useDispatch, useSelector} from "react-redux";
import {delete_requirements, get_requirements} from "../../redux/actions/store";
import TableRequirements from "../../components/store/TableRequirements";
import Modal from "../../components/util/Modal";
import {Popover, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import FormRequirements from "../../components/store/FormRequirements";
import {MySwal} from "../../helpers/util";
import {enGB} from "date-fns/locale";
import {DocumentIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";
import {DateRangePicker} from "react-nice-dates";
import DocumentViewerRequirement from "../../components/store/Document";

const Requirements = () => {
    const requirements = useSelector(state => state.Store.requirements)
    const me = useSelector(state => state.Auth.user)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const dispatch = useDispatch()
    const [params, setParams] = useState({'date_start': startDate, 'date_end': endDate});

    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const handleAddRequirement = () => {
        setIsOpen(true)
        setContent(<FormRequirements close={openModal}/>)
    }
    const handleUpdateRequirement = (data) => {
        setIsOpen(true)
        setContent(<FormRequirements data={data} close={openModal}/>)
    }
    const handleDeleteRequirement = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este requerimiento?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_requirements(data.id))

            }
        })
    }

    const handleSubmit = () => {
        startDate !== '' && endDate !== '' && dispatch(get_requirements({'date_start': startDate, 'date_end': endDate}))
    }


    useEffect(() => {
        dispatch(get_requirements(params))
    }, []);

    const handleViewTask = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}><DocumentViewerRequirement data={data}/></div>)
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        {me && me !== undefined && me !== null && me?.role === "Técnico" && <button
            className={"absolute z-30 peer md:right-0 right-0 bottom-0  h-14 w-14 rounded-full bg-[#4687f1] text-lg"}>
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
                                    <button onClick={() => handleAddRequirement()}
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

        <div className={"py-2 relative h-screen overflow-y-auto scrollbar-hide w-full"}>
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                minimumLength={1}
                format='yyyy-MM-dd'
                locale={enGB}
            >
                {({startDateInputProps, endDateInputProps, focus}) => (
                    <div className='date-range text-gray-400 w-max  rounded-lg flex space-x-1 items-center py-4'>
                        <input
                            className={'text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs' + (focus === "START_DATE" ? ' -focused' : '')}
                            {...startDateInputProps}
                            placeholder='Start date'
                        />
                        <span className='date-range_arrow'/>
                        <input
                            className={'text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs' + (focus === "END_DATE" ? ' -focused' : '')}
                            {...endDateInputProps}
                            placeholder='End date'
                        />
                        <PaperAirplaneIcon onClick={handleSubmit}
                                           className={'h-12 w-12 text-gray-400 mt-4 hover:text-blue-400 cursor-pointer'}/>
                        <DocumentIcon className={'h-12 w-12 text-gray-400 mt-4 hover:text-blue-400 cursor-pointer'}
                                      onClick={() => handleViewTask(requirements)}/>
                    </div>)}
            </DateRangePicker>
            <TableRequirements data={requirements} update={handleUpdateRequirement} remove={handleDeleteRequirement}/>
        </div>
    </Layout>);
};

export default Requirements;
