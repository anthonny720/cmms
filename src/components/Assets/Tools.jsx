import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import TableTools from "./TableTools";
import FormTools from "./FormTools";
import Modal from "../util/Modal";
import {useDispatch, useSelector} from "react-redux";
import {delete_tool, get_tools} from "../../redux/actions/assets";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";

const Tools = () => {
    const me = useSelector(state => state.Auth.user)
    const columns = [' ', 'Nombre', 'Descripción', 'Fabricante', 'Modelo']
    const dispatch = useDispatch();
    const [params, setParams] = useState({name: ''});
    const tools = useSelector(state => state.Assets.tools)

    useEffect(() => {
        dispatch(get_tools(params))
    }, []);


    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleAddTool = () => {
        setIsOpen(true)
        setContent(<FormTools close={openModal}/>)
    }
    const handleUpdateTool = (data) => {
        setIsOpen(true)
        setContent(<FormTools close={openModal} data={data}/>)
    }

    const handleDeleteTool = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar esta herramienta?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_tool(data.id))
            }
        })
    }

    return (<Layout>
        {me && me !== undefined && me !== null && me?.role === "Editor" && <button title={"Añadir"} type={"button"}
                                                                                  onClick={() => handleAddTool()}
                                                                                  className={"absolute z-30 peer bottom-0 right-0 h-14 w-14 rounded-full text-lg"}>
            <FontAwesomeIcon className={"text-blue-600 rounded-full bg-white "}
                             size={"2x"} icon={faPlusCircle}/></button>}
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={"bg-white w-full rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide"}>
            <SearchBar setParams={setParams} action={get_tools}/>
            <Filter/>
            <TableTools columns={columns} data={tools} update={handleUpdateTool} remove={handleDeleteTool}/>


        </div>

    </Layout>);
};

export default Tools;
