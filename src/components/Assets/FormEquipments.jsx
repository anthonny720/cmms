import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {HomeIcon, LinkIcon} from "@heroicons/react/24/outline";
import {map} from "lodash";
import {DocumentTextIcon, TrashIcon} from "@heroicons/react/24/solid";
import {MySwal} from "../../helpers/util";
import Modal from "../util/Modal";
import {add_physical, delete_file, get_physical_by_id, update_physical} from "../../redux/actions/assets";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import FormFiles from "./FormFiles";

const FormEquipments = ({data, close}) => {
    let [isOpenPage, setIsOpenPage] = useState(true)
    const fixed = useSelector(state => state.Assets.fixed)
    const equipment = useSelector(state => state.Assets.equipment)

    useEffect(() => {
        dispatch(get_physical_by_id(data?.id))
    }, [])


    /*Modal*/
    const [content, setContent] = useState();
    let [isOpen, setIsOpen] = useState(false)


    const dispatch = useDispatch();

    const handleDeleteFile = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar este archivo?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_file(data.id, equipment?.id))

            }
        })
    }
    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    const handleOpenModalViewer = (doc) => {
        setIsOpen(true)
        setContent(<iframe className={"h-full w-full"} title={"Guias"}
                           src={`https://docs.google.com/viewerng/viewer?url=${process.env.REACT_APP_API_URL + doc}&embedded=true`}></iframe>)
    }


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(equipment),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_physical(form, equipment.id)) : dispatch(add_physical(form))
            close()
        }
    })

    const handleAddFile = () => {
        setIsOpen(true)
        setContent(<FormFiles close={openModal} data={data}/>)
    }


    return (


        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full h-screen overflow-y-auto scrollbar-hide ">
            <Modal isOpen={isOpen} close={openModal} children={content}/>
            <div className={"bg-white w-full "}>
                <div className={"flex justify-between w-full items-center"}>
                    <button type={"button"} onClick={() => {
                        close()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6 text-[#4687f1]">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                        </svg>
                    </button>

                    <button type={"button"} onClick={formik.handleSubmit}
                            className={"flex items-center space-x-2 bg-[#4687f1] bg-opacity-70 p-2 rounded-lg text-white"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>

                        </svg>
                        <span className={"text-xs"}>Guardar</span>
                    </button>

                </div>
                <hr className={"bg-gray-500 mt-2"}/>
            </div>
            <div className={`md:flex space-x-4`}>
                <div
                    className={"md:w-3/12 w-full h-full   text-red-500 md:border-r-2 flex flex-col justify-center items-center "}>
                    <div className={" flex justify-center w-full h-full p-2 border-b-2"}>
                        <img className={"w-32 h-32 rounded-full border-2 border-blue-400 p-2"}
                             src={`${process.env.REACT_APP_API_URL}${data?.thumbnail_url}`}
                             alt={""}/>
                    </div>


                    <button type={"button"} onClick={() => {
                        setIsOpenPage(true)
                    }}
                            className={`flex w-full  justify-start gap-2   items-center  bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${isOpenPage && 'bg-blue-600 bg-opacity-10'}`}>
                        <HomeIcon className={"w-4 text-blue-400"}/><span className={"text-blue-400"}>General</span>
                    </button>
                    {data && <button type={"button"} onClick={() => {
                        setIsOpenPage(false)
                    }}
                                     className={`flex w-full  justify-start gap-2   items-center  bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${!isOpenPage && 'bg-blue-600 bg-opacity-10'}`}>
                        <LinkIcon className={"w-4 text-blue-400"}/><span className={"text-blue-400"}>Adjuntos</span>
                    </button>}

                </div>
                {isOpenPage ? <div className={`w-9/12  flex flex-row grid   grid-cols-1 gap-2`}>
                    <div>
                        {formik.values.name.length > 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Nombre</p>}

                        <input type={"text"} maxLength={50} placeholder={"Nombre"}
                               className={`${formik.errors.name && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                               value={`${formik.values.name}`}
                               onChange={text => formik.setFieldValue('name', text.target.value)}/>
                        <p className={`${formik.errors.name ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none`}>{formik.errors.name}</p>
                    </div>
                    <div>
                        {formik.values.buy_date !== '' &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Fecha de
                                compra</p>}
                        <input type={"date"} placeholder={"Fecha de compra"}
                               className={`${formik.errors.buy_date && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                               value={`${formik.values.buy_date}`}
                               onChange={text => formik.setFieldValue('buy_date', text.target.value)}/>
                        <p className={`${formik.errors.buy_date ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none`}>{formik.errors.buy_date}</p>
                    </div>
                    <div>
                        {formik.values.model.length > 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Modelo</p>}
                        <input type={"text"} maxLength={50} placeholder={"Modelo"}
                               className={`${formik.errors.model && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                               value={`${formik.values.model}`}
                               onChange={text => formik.setFieldValue('model', text.target.value)}/>
                        <p className={`${formik.errors.model ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none`}>{formik.errors.model}</p>
                    </div>

                    <div>
                        {formik.values?.criticality?.length > 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Criticidad</p>}
                        <select onChange={(value) => formik.setFieldValue('criticality', value.target.value)}
                                value={formik.values.criticality}
                                className={`${formik.errors.criticality && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                                aria-label="Default select example">
                            <option value={"Baja"}>{"Bajo"}</option>
                            <option value={"Media"}>{"Medio"}</option>
                            <option value={"Alta"}>{"Alto"}</option>
                        </select>
                        <p className={`${formik.errors.criticality ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none`}>{formik.errors.criticality}</p>
                    </div>

                    <div>
                        {formik.values?.parent !== 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Ubicación</p>}
                        <select onChange={(value) => formik.setFieldValue('parent', value.target.value)}
                                value={formik.values.parent}
                                className={`${formik.errors.parent && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                                aria-label="Default select example">
                            <option value={0}>{"Seleccione un activo"}</option>
                            {map(fixed, (item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>

                            })}
                        </select>
                        <p className={`${formik.errors.parent ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none `}>{formik.errors.parent}</p>
                    </div>
                </div> : <div className={"w-9/12   flex flex-row grid   grid-cols-1 gap-2 flex-wrap"}>
                    <div className={"flex  justify-start flex-wrap gap-4 h-72 scrollbar-hide "}>
                        {equipment?.files && equipment?.files.length > 0 ? map(equipment?.files, (item, index) => (
                            <div className={"relative w-full sm:w-2/12 flex flex-col items-center py-4 "}>
                                <DocumentTextIcon onClick={() => handleOpenModalViewer(item?.url)}
                                                  title={item?.url.split('/')[3]}
                                                  className={"w-12 text-gray-400  cursor-pointer"}/>
                                <TrashIcon onClick={() => handleDeleteFile(item)}
                                           className={"invisible sm:visible absolute w-4 text-red-400 bg-red-700 left-0 bg-opacity-10 cursor-pointer rounded-full p-0.5"}/>
                                <span
                                    className={"mt-2 w-full text-black text-[8px] leading-none break-words"}>{item?.url.split('/')[3]}</span>


                            </div>

                        )) : <p className={"text-gray-400 w-full text-center mt-[10%] text-xs"}>No hay archivos</p>}


                    </div>
                    {data && <button title={"Añadir"} onClick={() => handleAddFile()}
                                     type={"button"}
                                     className={"absolute z-30  bottom-0 right-0  h-14 w-14 rounded-full text-lg"}>
                        <FontAwesomeIcon className={"text-blue-600 rounded-full bg-white "}
                                         size={"2x"} icon={faPlusCircle}/>


                    </button>}

                </div>}


            </div>


        </form>);
};

const initialValues = (data) => {
    return {
        name: data?.name || '',
        model: data?.model || '',
        criticality: data?.criticality || 'Baja',
        parent: data?.parent || '',
        buy_date: data?.buy_date || '',


    }
}
const newSchema = () => {
    return {
        name: Yup.string().required("Nombre no puede estar en blanco"),
        buy_date: Yup.date().required("Fecha de compra no puede estar en blanco"),
        model: Yup.string().required("Modelo no puede estar en blanco"),
        criticality: Yup.string().required("Criticidad no puede estar en blanco"),
        parent: Yup.number().min(1, "La ubicación debe ser válida").required("Ubicación no puede estar en blanco"),


    }
}
export default FormEquipments;
