import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import FormFacilities from "./FormFacilities";
import Modal from "../util/Modal";
import TableFixes from "./TableFixes";
import {useDispatch, useSelector} from "react-redux";
import {delete_fixed, get_fixed} from "../../redux/actions/assets";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";
import ButtonAdd from "../util/ButtonAdd";
import ModalHook from "../util/hooks";

const Facilities = () => {
    const dispatch = useDispatch();
    const fixed = useSelector(state => state.Assets.fixed)

    const [params, setParams] = useState({name: ''});

    useEffect(() => {
        dispatch(get_fixed(params))
    }, [params]);

    /*Modal*/
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const handleAddFacilities = () => {
        setIsOpen(true)
        setContent(<FormFacilities close={openModal}/>)
    }
    const handleUpdateFacilities = (data) => {
        setIsOpen(true)
        setContent(<FormFacilities data={data} close={openModal}/>)
    }

    const handleDeleteFacilities = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este activo?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_fixed(data.id))
            }
        })
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <ButtonAdd>
            <button onClick={() => handleAddFacilities()}
                    className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                 size={"2x"} icon={faPlusSquare}/>
                <p className={"text-[#4687f1] font-semibold"}>Añadir</p>
            </button>
        </ButtonAdd>


        <div className={"h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl"}>
            <Filter/>
            <SearchBar setParams={setParams}/>

            <TableFixes data={fixed} update={handleUpdateFacilities} remove={handleDeleteFacilities}/>

        </div>


    </Layout>);
};

export default Facilities;
