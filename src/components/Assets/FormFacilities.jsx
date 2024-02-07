import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {add_fixed, update_fixed} from "../../redux/actions/assets";
import HeaderForm from "../util/HeaderForm";

const FormFacilities = ({data, close}) => {

    const dispatch = useDispatch();

    /*Formik*/
    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
        }, validationSchema: Yup.object({
            name: Yup.string().required("Nombre no puede estar en blanco"),
        }), onSubmit: (values) => {
            data ? dispatch(update_fixed(values, data.id)) : dispatch(add_fixed(values));
            close();
        }
    });


    return (

        <form onSubmit={formik.handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <HeaderForm submit={formik.handleSubmit} close={close}/>
            <div className={"mt-4"}>
                {formik.values.name.length > 0 &&
                    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Nombre</p>}

                <input type={"text"} maxLength={50} placeholder={"Nombre"}
                       className={`${formik.errors.name && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                       value={`${formik.values.name}`}
                       onChange={text => formik.setFieldValue("name", text.target.value)}/>
                <p className={`${formik.errors.name ? "text-red-400" : "text-gray-800"} text-[10px] mt-1  font-extralight leading-none `}>{formik.errors.name}</p>

            </div>
        </form>);
};


export default FormFacilities;
