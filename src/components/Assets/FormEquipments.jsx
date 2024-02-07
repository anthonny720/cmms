import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {HomeIcon, LinkIcon} from "@heroicons/react/24/outline";
import {DocumentTextIcon, TrashIcon} from "@heroicons/react/24/solid";
import {MySwal} from "../../helpers/util";
import Modal from "../util/Modal";
import {add_physical, delete_file, get_physical_by_id, update_physical} from "../../redux/actions/assets";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormFiles from "./FormFiles";
import HeaderForm from "../util/HeaderForm";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

const FormEquipments = ({data, close}) => {
    const dispatch = useDispatch();
    const fixed = useSelector(state => state.Assets.fixed);
    const equipment = useSelector(state => state.Assets.equipment);
    const me = useSelector(state => state.Auth.me);
    const [isOpenPage, setIsOpenPage] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);


    useEffect(() => {
        if (data?.id) {
            dispatch(get_physical_by_id(data.id));
        }
    }, [data, dispatch]);

    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
            model: data?.model || '',
            criticality: data?.criticality || 'L',
            parent: data?.parent || '',
            buy_date: data?.buy_date || '',
        }, validationSchema: Yup.object({
            name: Yup.string().required("Nombre no puede estar en blanco"),
            model: Yup.string().required("Modelo no puede estar en blanco"),
            criticality: Yup.string().required("Criticidad no puede estar en blanco"),
            parent: Yup.number().required("Ubicación no puede estar en blanco").min(1, "La ubicación debe ser válida"),
            buy_date: Yup.date().required("Fecha de compra no puede estar en blanco"),
        }), onSubmit: (values) => {
            data ? dispatch(update_physical(values, equipment.id)) : dispatch(add_physical(values));
            close();
        }
    });

    const handleDeleteFile = (fileId) => {
        MySwal.fire({
            title: '¿Desea eliminar este archivo?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_file(fileId, equipment.id));
            }
        });
    };


    const handleOpenModalViewer = (doc) => {
        setContent((<iframe
            className="h-full w-full"
            title="Document Viewer"
            src={`https://docs.google.com/viewerng/viewer?url=${process.env.REACT_APP_API_URL + doc}&embedded=true`}
        />));
        setIsOpen(true);
    };

    const handleAddFile = () => {
        setContent(<FormFiles close={() => setIsOpen(false)} equipmentId={equipment.id}/>);
        setIsOpen(true);
    };


    return (


        <form onSubmit={formik.handleSubmit}
              className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full h-screen overflow-y-auto">
            <Modal isOpen={isOpen} close={() => setIsOpen(false)}>{content}</Modal>
            <HeaderForm submit={formik.handleSubmit} close={close}/>
            <div className="md:flex space-x-4">
                <div
                    className="md:w-3/12 w-full h-full text-red-500 md:border-r-2 flex flex-col justify-center items-center">
                    <div className="flex justify-center w-full h-full p-2 border-b-2">
                        <img className="w-32 h-32 rounded-full border-2 border-blue-400 p-2"
                             src={`${process.env.REACT_APP_API_URL}${data?.thumbnail_url}`} alt=""/>
                    </div>

                    <button type="button" onClick={() => setIsOpenPage(true)}
                            className={`flex w-full justify-start gap-2 items-center bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${isOpenPage && 'bg-blue-600 bg-opacity-10'}`}>
                        <HomeIcon className="w-4 text-blue-400"/><span className="text-blue-400">General</span>
                    </button>
                    {data && <button type="button" onClick={() => setIsOpenPage(false)}
                                     className={`flex w-full justify-start gap-2 items-center bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${!isOpenPage && 'bg-blue-600 bg-opacity-10'}`}>
                        <LinkIcon className="w-4 text-blue-400"/><span className="text-blue-400">Adjuntos</span>
                    </button>}
                </div>
                {isOpenPage ? (<div className="w-9/12 flex flex-row grid grid-cols-1 gap-2">
                    <FormField label="Nombre" fieldProps={formik.getFieldProps('name')}/>
                    <FormField label="Fecha de Compra" type="date" fieldProps={formik.getFieldProps('buy_date')}/>
                    <FormField label="Modelo" fieldProps={formik.getFieldProps('model')}/>
                    <FormField label="Criticidad" fieldProps={formik.getFieldProps('criticality')}>
                        <option value="L">Baja</option>
                        <option value="M">Media</option>
                        <option value="H">Alta</option>
                    </FormField>
                    <FormField label="Ubicación" fieldProps={formik.getFieldProps('parent')} type="select">
                        <option value={0}>Seleccione un activo</option>
                        {renderSelectOptions(fixed)}
                    </FormField>
                </div>) : (<AttachmentsSection
                    equipment={equipment}
                    onOpenViewer={handleOpenModalViewer}
                    onDeleteFile={handleDeleteFile}
                    onAddFile={handleAddFile}
                    canEdit={me?.role === 'P' || me?.role === 'B'}
                />)}


            </div>


        </form>);
};

const FormField = ({label, fieldProps, type = 'text', children}) => {
    return (<div>
        {fieldProps.value.length > 0 &&
            <p className="text-[10px] font-extralight leading-none text-blue-400">{label}</p>}
        {type === 'select' ? (<select {...fieldProps}
                                      className="text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs">
            {children}
        </select>) : (<input type={type} {...fieldProps}
                             className="text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs"/>)}
        {fieldProps.touched && fieldProps.error &&
            <p className="text-red-400 text-[10px] mt-1 font-extralight leading-none">{fieldProps.error}</p>}
    </div>);
};

const AttachmentsSection = ({equipment, onOpenViewer, onDeleteFile, onAddFile, canEdit}) => {
    return (<div className="flex justify-start flex-wrap gap-4 h-96 overflow-scroll scrollbar-hide">
        {equipment.files && equipment.files.length > 0 ? (equipment.files.map((item, index) => (
            <div key={index} className="relative w-full sm:w-2/12 flex flex-col items-center py-4">
                <DocumentTextIcon onClick={() => onOpenViewer(item.url)} title={item.url.split('/')[3]}
                                  className="w-12 text-gray-400 cursor-pointer"/>
                {canEdit && (<TrashIcon onClick={() => onDeleteFile(item)}
                                        className="absolute w-4 text-red-400 bg-red-700 left-0 bg-opacity-10 cursor-pointer rounded-full p-0.5"/>)}
                <span
                    className="mt-2 w-full text-black text-[8px] leading-none break-words">{item.url.split('/')[3]}</span>
            </div>))) : (<p className="text-gray-400 w-full text-center mt-[10%] text-xs">No hay archivos</p>)}
        {canEdit && (
            <button onClick={onAddFile} className="absolute z-30 bottom-0 right-2 h-14 w-14 rounded-xl text-lg">
                <FontAwesomeIcon icon={faPlusSquare} className="text-blue-600 opacity-80 rounded-xl" size="2x"/>
            </button>)}
    </div>);
};
const renderSelectOptions = (items) => {
    return items.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>));
};

export default FormEquipments;
