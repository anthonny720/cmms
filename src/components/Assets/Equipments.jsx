import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormEquipments from "./FormEquipments";
import {useDispatch, useSelector} from "react-redux";
import {delete_physical, get_fixed, get_physical} from "../../redux/actions/assets";
import TableEquipments from "./TableEquipments";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";
import ButtonAdd from "../util/ButtonAdd";

const Equipments = () => {
    const physical = useSelector(state => state.Assets.physical);
    const dispatch = useDispatch();
    const [isEquipmentPageOpen, setIsEquipmentPageOpen] = useState(true);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [params, setParams] = useState({name: ''});

    useEffect(() => {
        dispatch(get_fixed());
    }, [dispatch]);

    useEffect(() => {
        dispatch(get_physical(params));
    }, [params, dispatch]);

    const handleAddEquipments = () => {
        setIsEquipmentPageOpen(false);
        setSelectedEquipment(null);
    };

    const handleUpdateEquipments = (equipment) => {
        setIsEquipmentPageOpen(false);
        setSelectedEquipment(equipment);
    };

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

    const handleCloseForm = () => {
        setIsEquipmentPageOpen(true);
    };

    return (<Layout>
            {isEquipmentPageOpen ? (<>
                    <ButtonAdd>
                        <button onClick={handleAddEquipments}
                                className="text-xs space-x-4 border-b-2 flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]">
                            <FontAwesomeIcon className="text-[#4687f1] bg-white rounded-full" size="2x"
                                             icon={faPlusSquare}/>
                            <p className="text-[#4687f1] font-semibold">Añadir</p>
                        </button>
                    </ButtonAdd>
                    <div className="h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl">
                        <SearchBar setParams={setParams}/>
                        <Filter/>
                        <TableEquipments
                            columns={['', 'Fecha de compra', 'Nombre', 'Modelo', 'Ubicación', 'Imagen', 'Criticidad']}
                            data={physical} remove={handleDeleteEquipments} update={handleUpdateEquipments}/>
                    </div>
                </>) : (selectedEquipment ? <FormEquipments data={selectedEquipment} close={handleCloseForm}/> :
                    <FormEquipments close={handleCloseForm}/>)}
        </Layout>);
};

export default Equipments;
