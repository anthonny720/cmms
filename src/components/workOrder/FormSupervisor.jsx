import React, {Fragment} from 'react';
import {useFormik} from "formik";
import {Switch} from "@headlessui/react";
import {useDispatch} from "react-redux";
import {update_work_supervisor} from "../../redux/actions/management";

const FormSupervisor = ({data, close,params}) => {

    const dispatch = useDispatch();

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data), validateOnChange: true, onSubmit: (form, onSubmitProps) => {
            dispatch(update_work_supervisor(form, data?.id,params))
            close()
        }
    })


    return (<form className="bg-white   px-2  pb-8 mb-4 h-max ">
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
            <button onClick={formik.handleSubmit} type={"button"}
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
            {/*Observations*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Observaciones</p>
                <textarea
                    className={`${formik.errors.observations && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                    value={`${formik.values.observations}`}
                    onChange={text => formik.setFieldValue('observations', text.target.value)}/>
                <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.observations ? "text-red-400" : " text-gray-800"}`}>{formik.errors.observations}</p>
            </div>

            {/*Status*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Verificado</p>
                <Switch checked={formik.values.validated} onChange={text => formik.setFieldValue('validated', text)}
                        as={Fragment}>
                    {({checked}) => (/* Use the `checked` state to conditionally style the button. */
                        <button
                            className={`${checked ? 'bg-blue-600' : 'bg-gray-200'}  mt-2 relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Finalizado</span>
                            <span
                                className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </button>)}
                </Switch>

                <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.validated ? "text-red-400" : " text-gray-800"}`}>{formik.errors.validated}</p>

            </div>
        </div>
    </form>)

};
const initialValues = (data) => {
    return {

        validated: data?.validated || false, observations: data?.observations || '',


    }
}


export default FormSupervisor;
