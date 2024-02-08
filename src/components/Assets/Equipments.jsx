import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {delete_physical, get_fixed, get_physical} from "../../redux/actions/assets";
import TableEquipments from "./TableEquipments";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";
import ButtonAdd from "../util/ButtonAdd";
import ModalHook from "../util/hooks";
import Modal from "../util/Modal";
import FormEquipments from "./FormEquipments";

const Equipments = () => {
    const physical = useSelector(state => state.Assets.physical);
    const dispatch = useDispatch();
    const [params, setParams] = useState({name: ''});
    /*Modal*/
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    useEffect(() => {
        dispatch(get_fixed());
    }, [dispatch]);

    useEffect(() => {
        dispatch(get_physical(params));
    }, [params, dispatch]);

    const handleAddEquipment = () => {
        setIsOpen(true)
        setContent(<FormEquipments close={openModal}/>)
    }
    const handleUpdateEquipments = (data) => {
        setIsOpen(true)
        setContent(<FormEquipments data={data} close={openModal}/>)
    }

    const handleDeleteEquipments = (equipment) => {
        MySwal.fire({
            title: '¿Desea eliminar este activo?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_physical(equipment.id));
            }
        });
    };


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <ButtonAdd>
            <button onClick={handleAddEquipment}
                    className="text-xs space-x-4 border-b-2 flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]">
                <FontAwesomeIcon className="text-[#4687f1] bg-white rounded-full" size="2x"
                                 icon={faPlusSquare}/>
                <p className="text-[#4687f1] font-semibold">Añadir</p>
            </button>
        </ButtonAdd>
        <div className="h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl">
            <SearchBar setParams={setParams}/>
            <Filter/>
            <div className={"w-full overflow-scroll scrollbar-hide"}>
                <TableEquipments
                    columns={['', 'Fecha de compra', 'Nombre', 'Modelo', 'Ubicación', 'Codigo', 'Criticidad']}
                    data={physical} remove={handleDeleteEquipments} update={handleUpdateEquipments}/>
            </div>
        </div>

    </Layout>);
};

export default Equipments;
