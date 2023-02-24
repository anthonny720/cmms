import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {add_tool, update_tool} from "../../redux/actions/assets";

const FormTools = ({data, close}) => {


    const dispatch = useDispatch();
    const columns = [

        {name: 'name', title: 'Nombre', type: 'text', maxLength: 50}, {
            name: 'model', title: 'Modelo', type: 'text', maxLength: 50
        }, {
            name: 'maker', title: 'Fabricante', type: 'text', maxLength: 50
        }

    ]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_tool(form, data?.id)) : dispatch(add_tool(form))
            close()
        }

    })

    return (

        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
            <div className={"bg-white w-full "}>
                <div className={"flex justify-between w-full items-center "}>
                    <button type={"button"} onClick={() => {
                        close()
                    }}
                    >
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
                <hr className={"bg-gray-500 mt-2 mb-2"}/>
            </div>
            <div className={`grid  grid-cols-1 gap-2`}>
                {

                    map(columns, (column, index) => (<div key={index}>
                        {formik.values[column.name].length > 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{column.title}</p>}

                        <input type={column.type} maxLength={column.maxLength} placeholder={column.title}
                               className={`${formik.errors[column.name] && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        <p className={`${formik.errors[column.name] ? "text-red-400" :"text-gray-800" } text-[10px] mt-1  font-extralight leading-none `}>{formik.errors[column.name]}</p>

                    </div>))

                }
                <div>
                    {formik.values.description.length > 0 &&
                        <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Descripción</p>}

                    <textarea maxLength={200} placeholder={"Descripción"}
                              className={`${formik.errors.description && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                              value={`${formik.values.description}`}
                              onChange={text => formik.setFieldValue("description", text.target.value)}/>
                    <p className={`${formik.errors.description ? "text-red-400" : 'text-gray-800'} text-[10px] mt-1  font-extralight leading-none `}>{formik.errors.description}</p>


                </div>
            </div>


        </form>);
};

const initialValues = (data) => {
    return {
        name: data?.name || '',
        description: data?.description || '',
        model: data?.model || '',
        maker: data?.maker || '',


    }
}
const newSchema = () => {
    return {
        name: Yup.string().required("Nombre no puede estar en blanco"),
        description: Yup.string().required("Descripción no puede estar en blanco"),
        model: Yup.string().required("Modelo no puede estar en blanco"),
        maker: Yup.string().required("Fabricante no puede estar en blanco"),
    }
}
export default FormTools;
