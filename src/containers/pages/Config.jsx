import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {Tab} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
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
import ButtonAdd from "../../components/util/ButtonAdd";
import ModalHook from "../../components/util/hooks";
import Header from "../../components/navigation/Header";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Config = () => {
    /*Modal*/
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const failures = useSelector(state => state.Configuration.failures)
    const categories_data = useSelector(state => state.Configuration.categories)
    const types = useSelector(state => state.Configuration.types)
    const dispatch = useDispatch()
    let [categories] = useState(['Origen de fallas', 'Tipos de mantenimiento'])
    const [select, setSelect] = useState('Origen de fallas');
    const [category, setCategory] = useState('1');
    const columns_source = ['', 'Nombre']
    const columns_category = ['', 'Nombre', 'Descripción', 'Salario']

    useEffect(() => {
        dispatch(get_failures())
        dispatch(get_types())
        dispatch(get_category())
    }, []);


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


    return (<Layout>
        <ButtonAdd>
            <button onClick={() => {
                select[0] === 'Origen de fallas' ? handleAddOrigin() : select[0] === 'Categoría personal' ? handleAddCategory() : handleAddType()

            }}
                    className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>

                <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                 size={"2x"} icon={faPlusSquare}/>
                <span className={"text-[#4687f1] font-semibold"}>Añadir</span>
            </button>
        </ButtonAdd>

        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl"}>
            <Header/>
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

                </div> : <div className={" relative"}>
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
        </div>


    </Layout>);
};


export default Config;
