import React, {Fragment, useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "../../components/Assets/Filter";
import {faLocationDot, faPlusCircle, faTools, faTruck} from "@fortawesome/free-solid-svg-icons";
import {Disclosure, Popover, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {MapPinIcon, WrenchScrewdriverIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {get_tree} from "../../redux/actions/assets";
import {map} from "lodash";
import Modal from "../../components/util/Modal";
import FormFacilities from "../../components/Assets/FormFacilities";
import FormTools from "../../components/Assets/FormTools";
import FormEquipments from "../../components/Assets/FormEquipments";

const Assets = () => {
    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch()
    const tree = useSelector(state => state.Assets.tree)
    let [isOpenPage, setIsOpenPage] = useState(true)


    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const handleAddFacilities = () => {
        setIsOpen(true)
        setContent(<FormFacilities close={openModal}/>)
    }
    const handleAddTool = () => {
        setIsOpen(true)
        setContent(<FormTools close={openModal}/>)
    }

    const handleAddEquipments = () => {
        setIsOpenPage(false)
        setContent(<FormEquipments close={ChangePage}/>)
    }


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    const ChangePage = () => {
        setIsOpenPage((prev) => !prev)

    }

    useEffect(() => {
        dispatch(get_tree())
    }, []);

    return (<Layout>
        {me && me !== undefined && me !== null && me?.role === "Editor" &&
        <button
            className={"absolute z-30 peer bottom-0 right-0     h-14 w-14 rounded-full bg-[#4687f1] text-lg"}>
            <Popover className="relative">
                {({open}) => (<>
                    <Popover.Button
                        className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center space-x-2 p-2 rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <FontAwesomeIcon size={"2x"} className={"text-white  rounded-full"} icon={faPlusCircle}/>
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
                            className="absolute bottom-1/2 z-10 mt-3 w-max  -translate-x-2/3 transform px-4 sm:px-4 lg:max-w-3xl">
                            <div
                                className="overflow-hidden  ">
                                <div className="relative grid  p-4">
                                    <button onClick={() => handleAddFacilities()} type={"button"}
                                            className={"text-xs space-4 bg-white rounded-full mt-2   flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-full hover:bg-[#5f9cf4]"}>

                                        <FontAwesomeIcon className={"text-gray-400  "}
                                                         size={"lg"} icon={faLocationDot}/>
                                    </button>
                                    <button onClick={() => {
                                        ChangePage()
                                        handleAddEquipments()
                                    }} type={"button"}
                                            className={"text-xs space-x-4 bg-white rounded-full mt-2   flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-full hover:bg-[#5f9cf4]"}>

                                        <FontAwesomeIcon className={"text-gray-400 "}
                                                         size={"lg"} icon={faTruck}/>
                                    </button>
                                    <button onClick={() => handleAddTool()} type={"button"}
                                            className={"text-xs space-x-4 bg-white rounded-full  mt-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-full hover:bg-[#5f9cf4]"}>

                                        <FontAwesomeIcon className={"text-gray-400 "}
                                                         size={"lg"} icon={faTools}/>
                                    </button>
                                </div>

                            </div>

                        </Popover.Panel>
                    </Transition>
                </>)}
            </Popover>

        </button>
        }
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        {isOpenPage ? <div className={"bg-white w-full  rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide  "}>
            <Filter/>
            {tree && tree !== null && map(tree, i => {
                return <Disclosure as="div">
                    {({open}) => (<>
                        <Disclosure.Button
                            className="flex w-full mt-4 justify-start gap-2 border-b-2  items-center  bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            {i?.children?.length > 0 && !open ? <PlusIcon
                                    className={"h-6 w-6 bg-gray-400 text-blue-400  bg-opacity-20 rounded-full hover:bg-white "}/> :

                                <MinusIcon
                                    className={` h-6 w-6 bg-gray-400 text-blue-400  bg-opacity-20 rounded-full hover:bg-white`}/>}
                            <MapPinIcon
                                className={`h-5 w-5 text-blue-500 `}
                            />
                            <p>
                                <span className={"font-normal font-sans text-xs"}>{i?.name}</span>
                                <br/>
                                <span
                                    className={"font-normal text-gray-400 font-sans text-[10px]"}>{"// GREENBOX/"}</span>
                            </p>

                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            {map(i?.children, j => {
                                return <Disclosure.Panel
                                    className="flex w-full   justify-start gap-2 border-b-2  items-center  bg-white pl-16  py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <WrenchScrewdriverIcon
                                        className={`h-5 w-5 text-blue-500 `}
                                    />
                                    <p>
                                        <span className={"font-normal font-sans text-xs"}>{j.name}</span>
                                        <br/>
                                        <span
                                            className={"font-normal text-gray-400 font-sans text-[10px]"}>{"// GREENBOX/ "}{i?.name}/</span>
                                    </p>
                                </Disclosure.Panel>
                            })}

                        </Transition>
                    </>)}
                </Disclosure>
            })}


        </div> : content}

    </Layout>);
};

export default Assets;
