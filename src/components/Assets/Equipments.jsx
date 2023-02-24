import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "./Filter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import FormEquipments from "./FormEquipments";
import {useDispatch, useSelector} from "react-redux";
import {delete_physical, get_fixed, get_physical} from "../../redux/actions/assets";
import TableEquipments from "./TableEquipments";
import {MySwal} from "../../helpers/util";
import SearchBar from "../../helpers/SearchBar";

const Equipments = () => {
    const me = useSelector(state => state.Auth.user)
    const physical = useSelector(state => state.Assets.physical)
    const dispatch = useDispatch()
    const columns = ['', 'Fecha de compra', 'Nombre', 'Modelo', 'Ubicación', 'Imagen', 'Criticidad']
    let [isOpenPage, setIsOpenPage] = useState(true)
    const [params, setParams] = useState({name: ''});


    useEffect(() => {
        dispatch(get_physical(params))
        dispatch(get_fixed())
    }, [])

    /*Modal*/
    const [content, setContent] = useState();
    // let [isOpen, setIsOpen] = useState(false)

    const handleAddEquipments = () => {
        setIsOpenPage(false)
        setContent(<FormEquipments close={ChangePage}/>)
    }
    const handleUpdateEquipments = (data) => {
        setIsOpenPage(false)
        setContent(<FormEquipments data={data} close={ChangePage}/>)
    }

    const handleDeleteEquipments = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este activo?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_physical(data.id))
            }
        })
    }

    const ChangePage = () => {
        setIsOpenPage((prev) => !prev)

    }
    return (<Layout>
        {me && me !== undefined && me !== null && me?.role === "Editor" &&
         <button title={"Añadir"} onClick={() => {
                ChangePage()
                handleAddEquipments()
            }} type={"button"}
                    className={"absolute z-30 peer md:right-0 xs:left-20 bottom-1  h-14 w-14 rounded-full text-lg"}>
                <FontAwesomeIcon className={"text-blue-600 rounded-full bg-white "}
                                 size={"2x"} icon={faPlusCircle}/></button>
        }
        {isOpenPage ? <>
            <div className={"bg-white w-full rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide"}>
                <SearchBar setParams={setParams} action={get_physical}/>
                <Filter/>
                <TableEquipments columns={columns} data={physical} remove={handleDeleteEquipments}
                                 update={handleUpdateEquipments}/>
            </div>




        </> : content}

    </Layout>);
};

export default Equipments;
