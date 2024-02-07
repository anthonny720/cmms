import React, {useState} from 'react';
import Layout from "../../hocs/Layout";
import Table from "../../components/util/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import FormPersonnel from "../../components/resources/FormPersonnel";
import Modal from "../../components/util/Modal";
import {MySwal} from "../../helpers/util";
import {delete_user} from "../../redux/actions/auth";
import ButtonAdd from "../../components/util/ButtonAdd";
import Header from "../../components/navigation/Header";

const Resources = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.Auth.users)
    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleAddPersonnel = () => {
        setIsOpen(true)
        setContent(<FormPersonnel close={openModal}/>)
    }
    const handleUpdatePersonnel = (data) => {
        setIsOpen(true)
        setContent(<FormPersonnel data={data} close={openModal}/>)
    }
    const handleDeletePersonnel = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este usuario?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_user(data.id))
            }
        })
    }


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <ButtonAdd>
            <button onClick={() => handleAddPersonnel()}
                    className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                 size={"2x"} icon={faPlusSquare}/>
                <p className={"text-[#4687f1] font-semibold"}>Añadir</p>
            </button>
        </ButtonAdd>
        <div className={"h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl"}>
            <Header/>
            <Table data={users} update={handleUpdatePersonnel} remove={handleDeletePersonnel}/>
        </div>


    </Layout>);
};

export default Resources;
