import React from 'react';
import {useFormik} from "formik";
import {DocumentIcon} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {add_file} from "../../redux/actions/assets";


const FormStorage = ({data, close}) => {
    const dispatch = useDispatch()

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data), validateOnChange: true, onSubmit: (form, onSubmitProps) => {

            let d = new FormData();
            if (form.file !== '') {
                d.append('file', form.file);
                dispatch(add_file(d))
            }
            close()
        }
    })

    console.log(formik.values.file.name)
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


            <div className="flex justify-center mt-8">
                <div className="flex items-center justify-center w-full">
                    <label
                        className={`flex flex-col w-full h-32 border-4 ${formik.values.file !== undefined && formik.values.file !== "" ? "border-blue-200" : "border-red-200"} border-dashed hover:bg-gray-100 hover:border-gray-300`}>
                        <div className="flex flex-col items-center justify-center pt-7">
                            {formik.values.file !== undefined && formik.values.file !== "" ? <DocumentIcon
                                    className={`w-8 h-8 ${formik.values.file !== undefined && formik.values.file !== "" ? "text-blue-200" : "text-gray-400"} group-hover:text-gray-600`}/> :
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="w-8 h-8 text-red-400 hover:text-gray-600"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>

                            }
                            <p className={`pt-1 text-xs tracking-wider ${formik.values.file !== undefined && formik.values.file !== "" ? "text-blue-400" : "text-red-400"} group-hover:text-gray-600 text-center`}>
                                {formik.values.file !== undefined && formik.values.file !== "" ? formik.values.file.name : "Click para examinar"}</p>
                        </div>
                        <input onChange={text => formik.setFieldValue('file', text.target.files[0])}
                               accept={"application/pdf"} type="file" className="opacity-0"/>
                    </label>


                </div>
            </div>


        </div>


    </form>);
};
const initialValues = () => {
    return {
        file: '',


    }
}


export default FormStorage;
