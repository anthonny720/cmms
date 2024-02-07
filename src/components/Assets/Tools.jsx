import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TableTools from "./TableTools";
import FormTools from "./FormTools";
import Modal from "../util/Modal";
import {useDispatch, useSelector} from "react-redux";
import {delete_tool, get_tools} from "../../redux/actions/assets";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";
import ButtonAdd from "../util/ButtonAdd";
import ModalHook from "../util/hooks";

const Tools = () => {
    const columns = [' ', 'Nombre', 'Fabricante', 'Modelo']
    const dispatch = useDispatch();
    const [params, setParams] = useState({name: ''});
    const tools = useSelector(state => state.Assets.tools)

    useEffect(() => {
        dispatch(get_tools(params))
    }, [params]);


    /*Modal*/
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleAddTool = () => {
        setIsOpen(true)
        setContent(<FormTools close={openModal}/>)
    }
    const handleToolOperation = (data) => {
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
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <ButtonAdd>
            <button onClick={() => handleAddTool()}
                    className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                 size={"2x"} icon={faPlusSquare}/>
                <p className={"text-[#4687f1] font-semibold"}>Añadir</p>
            </button>
        </ButtonAdd>


        <div className="h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl">
            <Filter/>
            <SearchBar setParams={setParams}/>
            <TableTools columns={columns} data={tools} onEdit={handleToolOperation} onDelete={handleDeleteTool}/>
        </div>

    </Layout>);
};

export default Tools;
