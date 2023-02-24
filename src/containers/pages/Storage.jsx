import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Table from "../../components/storage/Table";
import {useDispatch, useSelector} from "react-redux";
import {delete_file, get_files} from "../../redux/actions/assets";
import {MySwal} from "../../helpers/util";
import Modal from "../../components/util/Modal";
import FormStorage from "../../components/storage/FormStorage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../helpers/SearchBar";

const Storage = () => {
    const dispatch = useDispatch()
    const files = useSelector(state => state.Assets.files)
    const me = useSelector(state => state.Auth.user)
    const [params, setParams] = useState({name: ''});
    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalViewer = (doc) => {
        setIsOpen(true)
        setContent(<iframe className={"h-full w-full"} title={"Guias"}
                           src={`https://docs.google.com/viewerng/viewer?url=${process.env.REACT_APP_API_URL + doc}&embedded=true`}></iframe>)
    }

    const handleAddFile = () => {
        setIsOpen(true)
        setContent(<FormStorage close={openModal}/>)
    }
    const handleDeleteFile = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este documento?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_file(data.id))

            }
        })
    }
    useEffect(() => {
        dispatch(get_files(params))
    }, []);

    return (<Layout>
        {me && me !== undefined && me !== null && me?.role === "Editor" && <button title={"Añadir"}
                                                                                  onClick={() => handleAddFile()}
                                                                                  className={"absolute z-30 peer right-0 bottom-0  h-14 w-14 rounded-full text-lg"}>
            <FontAwesomeIcon className={"text-blue-600 rounded-full bg-white "}
                             size={"2x"} icon={faPlusCircle}/>


        </button>}
        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={"bg-white w-full rounded-xl p-2 h-screen scrollbar-hide overflow-y-auto "}>
            <SearchBar action={get_files} setParams={setParams}/>
            <Table data={files} remove={handleDeleteFile} viewer={handleOpenModalViewer}/>
        </div>
    </Layout>);
};

export default Storage;
