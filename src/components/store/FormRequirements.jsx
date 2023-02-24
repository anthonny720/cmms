import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {add_requirements, update_requirements} from "../../redux/actions/store";

const FormRequirements = ({data, close, update}) => {

    const me = useSelector(state => state.Auth.user)

    const dispatch = useDispatch();
    const columns = [

        {name: 'product', title: 'Producto', type: 'text', maxLength: 20}, {
            name: 'description', title: 'Descripción', type: 'text', maxLength: 100
        }, {name: 'quantity', title: 'Nombre', type: 'number'}, {
            name: 'unit_measurement', title: 'U.M.', type: 'text', maxLength: 20
        },

    ]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_requirements(form, data?.id)) : dispatch(add_requirements(form))
            close()
        }
    })

    return (

        <form className="bg-white  rounded px-8  ">
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

                    <button type={"button"} onClick={() => {
                        formik.handleSubmit()
                    }} className={"flex items-center space-x-2 bg-[#4687f1] bg-opacity-70 p-2 rounded-lg text-white"}>
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

            <div className={`grid md:grid-cols-2 grid-cols-1 gap-2 mt-2`}>
                {me && me !== undefined && me !== null && me?.role === "Editor" && map(columns, (column, index) => (
                    <div key={index}>
                        {formik.values[column.name].length > 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{column.title}</p>}

                        <input type={column.type} maxLength={column.maxLength} placeholder={column.title}
                               className={`${formik.errors[column.name] && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors[column.name] ? "text-red-400" : " text-gray-800"}`}>{formik.errors[column.name]}</p>

                    </div>))
                }

                {me && me !== undefined && me !== null && (me?.role === "Editor" || me?.role ==="Compras")  && <div>
                    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Estado</p>
                    <select onChange={(value) => formik.setFieldValue('status', value.target.value)}
                            value={formik.values.status}
                            className={`${formik.errors.status && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                            aria-label="Default select example">
                        <option value={'Pendiente'}>{'Pendiente'}</option>
                        <option value={'Aprobado'}>{'Aprobado'}</option>
                        <option value={'Rechazado'}>{'Rechazado'}</option>
                        <option value={'Parcial'}>{'Parcial'}</option>
                        <option value={'Finalizado'}>{'Finalizado'}</option>
                    </select>
                    <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.status ? "text-red-400" : "text-gray-800"}`}>{formik.errors.status}</p>

                </div>}
            </div>


        </form>);
};

const initialValues = (data) => {
    return {
        product: data?.product || '',
        description: data?.description || '',
        quantity: data?.quantity || 1,
        unit_measurement: data?.unit_measurement || '',
        status: data?.status || 'Pendiente',


    }
}
const newSchema = () => {
    return {
        product: Yup.string().required("Producto no puede estar en blanco"),
        description: Yup.string().required("Descripción no puede estar en blanco"),
        quantity: Yup.number().required("Cantidad no puede estar en blanco"),
        unit_measurement: Yup.string().required("Unidad de medida no puede estar en blanco"),
        status: Yup.string().min(5, "El estado debe ser una opción válida").required("Estado no puede estar en blanco"),


    }
}
export default FormRequirements;
