import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {add_category, update_category} from "../../redux/actions/config";

const FormCategory = ({data, close}) => {
    const dispatch = useDispatch()
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_category(form, data?.id)) : dispatch(add_category(form))
            close()
        }
    })

    const columns = [

        {name: 'name', title: 'Nombre', type: 'text', maxLength: 50}, {
            name: 'description', title: 'Descripción', type: 'text', maxLength: 100
        }, {name: 'salary', title: 'Salario', type: 'text', maxLength: 7}]

    return (<form className="bg-white   px-2  pb-8 mb-4 ">
        <div className={"flex   w-full justify-between "}>
            <button type={"button"}
                    onClick={() => {
                        close()
                    }}
                    className={"flex items-center w-max rounded-full hover:bg-[#4687f1] hover:bg-opacity-10   text-xs  bg-white  p-2 rounded-lg text-[#4687f1]"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-4 h-4 text-[#4687f1]">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                </svg>
            </button>
            <button type={"button"} onClick={formik.handleSubmit}
                    className={"flex  items-center text-xs space-x-2 bg-white border-2 border-[#4687f1] hover:bg-[#4687f1] hover:bg-opacity-10  p-2 rounded-lg text-[#4687f1]"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                <span className={"text-xs"}>Aceptar</span>
            </button>
        </div>
        <hr className={"bg-gray-500 my-2"}/>
        <div className={`grid grid-cols-1 gap-2`}>


            {map(columns, (column, index) => (<div key={index}>
                {formik.values[column.name].length > 0 &&
                    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{column.title}</p>}

                <input type={column.type} maxLength={column.maxLength} placeholder={column.title}
                       className={`${formik.errors[column.name] && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                <p className={`${formik.errors[column.name] ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none `}>{formik.errors[column.name]}</p>

            </div>))

            }


        </div>


    </form>);
};
const initialValues = (data) => {
    return {
        name: data?.name || '', description: data?.description || '', salary: data?.salary || 0.00,


    }
}
const newSchema = () => {
    return {
        name: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required("Nombre no puede estar en blanco"),
        description: Yup.string().min(10, 'La descripción debe tener al menos 10 caracteres').required("Descripción no puede estar en blanco"),
        salary: Yup.number(true, 'El salario debe ser de tipo numérico').min(0, '').required("Salario no puede estar en blanco"),
    }
}

export default FormCategory;
