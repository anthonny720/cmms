import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import FormFacilities from "./FormFacilities";
import Modal from "../util/Modal";
import TableFixes from "./TableFixes";
import {useDispatch, useSelector} from "react-redux";
import {delete_fixed, get_fixed} from "../../redux/actions/assets";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";

const Facilities = () => {
    const me = useSelector(state => state.Auth.user)
    const dispatch = useDispatch();
    const fixed = useSelector(state => state.Assets.fixed)
    const [params, setParams] = useState({name: ''});

    useEffect(() => {
        dispatch(get_fixed(params))
    }, []);

    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

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


    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const columns = ['', 'Habilitado', 'Nombre', 'Descripción',]
    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        {me && me !== undefined && me !== null && me?.role === "Editor" && <button title={"Añadir"} type={"button"}
                                                                                  onClick={() => handleAddFacilities()}
                                                                                  className={"absolute z-30 peer bottom-0 right-0   h-14 w-14 rounded-full text-lg"}>
            <FontAwesomeIcon className={"text-blue-600 rounded-full bg-white "}
                             size={"2x"} icon={faPlusCircle}/>
        </button>}

        <div className={"bg-white w-full rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide"}>
            <SearchBar action={get_fixed} setParams={setParams}/>
            <Filter/>
            <TableFixes columns={columns} data={fixed} update={handleUpdateFacilities} remove={handleDeleteFacilities}/>

        </div>


    </Layout>);
};

export default Facilities;
