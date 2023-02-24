import React, {Fragment, useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {Popover, Tab, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {map} from 'lodash'
import Table from "../../components/config/Table";
import Modal from "../../components/util/Modal";
import FormOrigin from "../../components/config/FormOrigin";
import FormType from "../../components/config/FormType";
import FormCategory from "../../components/config/FormCategory";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_category,
    delete_failure,
    delete_type,
    get_category,
    get_failures,
    get_types
} from "../../redux/actions/config";
import {MySwal} from "../../helpers/util";
import TableCategory from "../../components/config/TableCategory";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Config = () => {
    const failures = useSelector(state => state.Configuration.failures)
    const categories_data = useSelector(state => state.Configuration.categories)
    const types = useSelector(state => state.Configuration.types)
    const dispatch = useDispatch()
    let [categories] = useState(['Origen de fallas', 'Tipos de mantenimiento'])
    const [select, setSelect] = useState('Origen de fallas');
    const [category, setCategory] = useState('1');
    const columns_source = ['', 'Nombre']
    const columns_category = ['', 'Nombre', 'Descripción', 'Salario']
    const me = useSelector(state => state.Auth.user)

    useEffect(() => {
        dispatch(get_failures())
        dispatch(get_types())
        dispatch(get_category())
    }, []);


    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const handleDeleteCategory = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar esta categoría?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_category(data.id))
            }
        })
    }

    const handleDeleteOrigin = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar esta falla?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_failure(data.id))
            }
        })
    }
    const handleDeleteType = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este tipo de mantenimiento?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_type(data.id))
            }
        })
    }


    const handleAddOrigin = () => {
        setIsOpen(true)
        setContent(<FormOrigin close={openModal}/>)
    }
    const handleUpdateOrigin = (data) => {
        setIsOpen(true)
        setContent(<FormOrigin data={data} close={openModal}/>)
    }
    const handleAddType = () => {
        setIsOpen(true)
        setContent(<FormType close={openModal}/>)
    }
    const handleUpdateType = (data) => {
        setIsOpen(true)
        setContent(<FormType data={data} close={openModal}/>)
    }
    const handleAddCategory = () => {
        setIsOpen(true)
        setContent(<FormCategory close={openModal}/>)
    }
    const handleUpdateCategory = (data) => {
        setIsOpen(true)
        setContent(<FormCategory data={data} close={openModal}/>)
    }
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    return (<Layout>
        {me && me !== undefined && me !== null && me?.role === "Editor" &&
            <button className={"absolute z-30 peer right-0 bottom-0  h-14 w-14 rounded-full bg-[#4687f1] text-lg"}>
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
                                    <div className="relative grid  bg-white">
                                        <button onClick={() => {
                                            select[0] === 'Origen de fallas' ? handleAddOrigin() : select[0] === 'Categoría personal' ? handleAddCategory() : handleAddType()

                                        }}
                                                className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>

                                            <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                                             size={"2x"} icon={faPlusSquare}/>
                                            <span className={"text-[#4687f1] font-semibold"}>Añadir</span>
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
        <form className="bg-white   px-2  w-full h-screen overflow-y-auto scrollbar-hide ">
            <div className="flex justify-between items-center text-xs">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}

                    className="form-select
                      block
                      w-full
                      px-4
                      py-2.5
                      my-2
                      mx-4
                      font-medium
                      text-gray-400
                      bg-white
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out

                      text-xs

                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
                    <option value="1">Catálogo de fallas</option>
                    <option value="2">Categoría personal</option>
                </select>

            </div>
            {category === "1" ? <div className={"relative"}>
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 bg-white p-1 w-full">
                            {map(categories, category => (<Tab
                                key={category}
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={(selected) => {
                                    setSelect([category])
                                }}
                                className={({selected}) => classNames('w-full  py-2.5 text-xs  font-light leading-5 ', selected ? 'transition ease-in-out  border-b-2  border-[#4687f1] text-[#4687f1] hover:bg-[#4687f1] hover:bg-opacity-10 hover:text-[#4687f1]  duration-300 ' : 'text-gray-400    hover:bg-white/[0.12] hover:text-gray-600')}
                            >
                                {category}
                            </Tab>))}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel
                            >
                                <Table data={failures} columns={columns_source} update={handleUpdateOrigin}
                                       remove={handleDeleteOrigin}/>
                            </Tab.Panel>

                            <Tab.Panel

                            >
                                <Table data={types} columns={columns_source} update={handleUpdateType}
                                       remove={handleDeleteType}/>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </div> :
                <div className={" relative"}>
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 bg-white p-1 text-gray-400">
                            <Tab

                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                onClick={(selected) => {
                                    setSelect(['Categoría personal'])
                                }}
                                className={({selected}) => classNames('w-full  py-2.5 text-xs  font-light leading-5 text-black', selected ? 'transition ease-in-out  border-b-2  border-[#4687f1] text-[#4687f1] hover:bg-[#4687f1] hover:bg-opacity-10 hover:text-[#4687f1]  duration-300 ' : 'text-gray-400    hover:bg-white/[0.12] hover:text-gray-600')}
                            >
                                Categoría personal
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel
                            >
                                <TableCategory data={categories_data} columns={columns_category}
                                               remove={handleDeleteCategory}
                                               update={handleUpdateCategory}/>
                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>

                </div>}

        </form>


    </Layout>);
};


export default Config;
