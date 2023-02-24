import React, {Fragment, useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {Popover, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TableThird from "../../components/thirdParties/Table";
import {useDispatch, useSelector} from "react-redux";
import {MySwal} from "../../helpers/util";
import {delete_third_party, get_third_parties} from "../../redux/actions/auth";
import FormThird from "../../components/thirdParties/FormThird";

const ThirdParties = () => {

    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const me = useSelector(state => state.Auth.user)
    const thirdParties = useSelector(state => state.Auth.thirdParties)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_third_parties())
    }, [])

    const handleAddThird = () => {
        setIsOpen(true)
        setContent(<FormThird close={openModal}/>)
    }
    const handleUpdateThird = (data) => {
        setIsOpen(true)
        setContent(<FormThird data={data} close={openModal}/>)
    }
    const handleDeleteThird = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(delete_third_party(data?.id))

            }
        })
    }

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        {me && me !== undefined && me !== null && me?.role === "Editor" && <button
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
                                    <button onClick={() => handleAddThird()}
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

            <TableThird data={thirdParties} remove={handleDeleteThird} update={handleUpdateThird}/>
        </div>
    </Layout>);
};

export default ThirdParties;
