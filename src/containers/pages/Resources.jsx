import React, {Fragment, useState} from 'react';
import Layout from "../../hocs/Layout";
import Table from "../../components/util/Table";
import {Popover, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import FormPersonnel from "../../components/resources/FormPersonnel";
import Modal from "../../components/util/Modal";
import {MySwal} from "../../helpers/util";
import {delete_user} from "../../redux/actions/auth";

const Resources = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.Auth.users)
    const me = useSelector(state => state.Auth.user)
    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleAddPersonnel = () => {
        setIsOpen(true)
        setContent(<FormPersonnel close={openModal}/>)
    }
    const handleUpdatePersonnel = (data) => {
        setIsOpen(true)
        setContent(<FormPersonnel data={data} close={openModal}/>)
    }
    const handleDeletePersonnel = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este usuario?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_user(data.id))
            }
        })
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
                                    <button onClick={() => handleAddPersonnel()}
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
        <div className={"w-full h-screen scrollbar-hide overflow-y-auto"}>
            <Table data={users} update={handleUpdatePersonnel} remove={handleDeletePersonnel}/>
        </div>



    </Layout>);
};

export default Resources;
