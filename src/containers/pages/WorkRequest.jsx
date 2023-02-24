import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import SearchBar from "../../helpers/SearchBar";
import {get_physical} from "../../redux/actions/assets";
import Table from "../../components/workRequest/Table";
import FormRequest from "../../components/workRequest/FormRequest";
import {PencilIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {get_work_request} from "../../redux/actions/management";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/util/Modal";
import FormOT from "../../components/workRequest/FormOT";

const WorkRequest = () => {
    let [isOpen, setIsOpen] = useState(false)
    let [isOpen2, setIsOpen2] = useState(false)
    const [content, setContent] = useState();

    const dispatch = useDispatch();
    const [params, setParams] = useState({name: ''});
    const request = useSelector(state => state.Management.work_request)
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const openModal2 = () => {
        setIsOpen2((prev) => !prev)
    }
    useEffect(() => {
        dispatch(get_physical())
        dispatch(get_work_request(params))
    }, []);

    const handleAddOT = (data) => {
        setIsOpen2(true)
        setContent(<FormOT data={data} close={openModal2}/>)
    }

    return (<Layout>
        <Modal isOpen={isOpen2} close={openModal2} children={content}/>
        <button title={"Añadir"}
                className={"absolute z-30 peer md:right-0 right-0 bottom-0  h-14 w-14 rounded-full bg-[#4687f1] text-lg"}>
            {isOpen ? <XMarkIcon className={"text-white rounded-full bg-blue-400 "} onClick={() => openModal()}/> :
                <PencilIcon className={"text-white rounded-full bg-blue-400 p-2"} onClick={() => openModal()}/>}
        </button>
        <div className={"w-full h-screen scrollbar-hide overflow-y-auto"}>

            <SearchBar action={get_work_request} setParams={setParams}/>


            {isOpen ? <FormRequest close={openModal}/> : null}
            <Table data={request} add={handleAddOT}/>

        </div>

    </Layout>);
};

export default WorkRequest;
