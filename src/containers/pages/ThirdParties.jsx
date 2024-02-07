import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Modal from "../../components/util/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TableThird from "../../components/thirdParties/Table";
import {useDispatch, useSelector} from "react-redux";
import {MySwal} from "../../helpers/util";
import {delete_third_party, get_third_parties} from "../../redux/actions/auth";
import FormThird from "../../components/thirdParties/FormThird";
import ButtonAdd from "../../components/util/ButtonAdd";
import Header from "../../components/navigation/Header";

const ThirdParties = () => {

    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)

    const thirdParties = useSelector(state => state.Auth.thirdParties)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_third_parties())
    }, [])

    const handleAddThird = () => {
        setIsOpen(true)
        setContent(<FormThird close={openModal}/>)
    }
    const handleUpdateThird = (data) => {
        setIsOpen(true)
        setContent(<FormThird data={data} close={openModal}/>)
    }
    const handleDeleteThird = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(delete_third_party(data?.id))

            }
        })
    }

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }

    return (<Layout>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <ButtonAdd>
            <button onClick={() => handleAddThird()}
                    className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                 size={"2x"} icon={faPlusSquare}/>
                <p className={"text-[#4687f1] font-semibold"}>Añadir</p>
            </button>
        </ButtonAdd>

        <div className={"h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl"}>
            <Header/>
            <TableThird data={thirdParties} remove={handleDeleteThird} update={handleUpdateThird}/>
        </div>
    </Layout>);
};

export default ThirdParties;
