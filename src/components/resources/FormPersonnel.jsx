import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {map, size} from "lodash";
import {get_category} from "../../redux/actions/config";
import {add_user, update_user} from "../../redux/actions/auth";

const FormPersonnel = ({data, close}) => {

    const category = useSelector(state => state.Configuration.categories)

    useEffect(() => {
        return () => {
            dispatch(get_category())
        };
    }, []);


    const dispatch = useDispatch();
    const columns = [

        {name: 'first_name', title: 'Nombre', type: 'text', maxLength: 20}, {
            name: 'last_name', title: 'Apellidos', type: 'text', maxLength: 20
        }, {name: 'email', title: 'Email', type: 'email'}, {
            name: 'address', title: 'Dirección', type: 'text', maxLength: 30
        }, {name: 'phone', title: 'Teléfono', type: 'telf'}, {name: 'dni', title: 'DNI', type: 'text', maxLength: 8},


    ]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema(data)),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            data ? dispatch(update_user(form, data?.id)) : dispatch(add_user(form))
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
                {

                    map(columns, (column, index) => (<div key={index}>
                        {formik.values[column.name].length > 0 &&
                            <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{column.title}</p>}

                        <input type={column.type} maxLength={column.maxLength} placeholder={column.title}
                               className={`${formik.errors[column.name] && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors[column.name] ? "text-red-400" : " text-gray-800"}`}>{formik.errors[column.name]}</p>

                    </div>))

                }
                <div>

                    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Contraseña</p>

                    <input type={"password"} placeholder={"Contraseña"}
                           className={`${formik.errors.password && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                           value={`${formik.values.password}`}
                           onChange={text => formik.setFieldValue('password', text.target.value)}/>
                    <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.password ? "text-red-400" : " text-gray-800"}`}>{formik.errors.password}</p>

                </div>
                <div>
                    {size(formik.values.role) >= 0 &&
                        <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Rol</p>}
                    <select onChange={(value) => formik.setFieldValue('role', value.target.value)}
                            value={formik.values.role}
                            className={`${formik.errors.role && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                            aria-label="Default select example">
                        <option value={"Visualizador"}>{"Visualizador"}</option>
                        <option value={"Editor"}>{"Editor"}</option>
                        <option value={"Técnico"}>{"Técnico"}</option>
                        <option value={"Supervisor"}>{"Supervisor"}</option>
                        <option value={"Compras"}>{"Compras"}</option>
                    </select>
                    <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.role ? "text-red-400" : "text-gray-800"}`}>{formik.errors.role}</p>

                </div>
                <div>

                    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Categoria</p>
                    <select onChange={(value) => formik.setFieldValue('category', value.target.value)}
                            value={formik.values.category}
                            className={`${formik.errors.category && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                            aria-label="Default select example">
                        <option value={""}>{"Seleccione una categoria"}</option>
                        {category !== null && map(category, (item, index) => (<option key={index}
                                                                                      value={item?.id}>{item?.name}</option>))}

                    </select>
                    <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.category ? "text-red-400" : "text-gray-800"}`}>{formik.errors.category}</p>

                </div>
            </div>


        </form>);
};

const initialValues = (data) => {
    return {
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: data?.email || '',
        address: data?.address || '',
        phone: data?.phone || '',
        dni: data?.dni || '',
        role: data?.role || 'Visualizador',
        category: data?.category || '',
        password: '',


    }
}
const newSchema = (data) => {
    return {
        first_name: Yup.string().required("Nombres no puede estar en blanco"),
        last_name: Yup.string().required("Apellidos no puede estar en blanco"),
        email: Yup.string("Email inválido").email("Email inválido").required("Email no puede estar en blanco"),
        address: Yup.string().required("Dirección no puede estar en blanco"),
        phone: Yup.string().min(9, "El teléfono debe tener un mínimo de 9 números").required("Teléfono no puede estar en blanco"),
        dni: Yup.string().min(8, "El DNI debe tener un mínimo y máximo de 8 números").required("DNI no puede estar en blanco"),
        role: Yup.string().required("Rol no puede estar en blanco"),
        category: Yup.number().required("Categoría no puede estar en blanco"),
        password: data ? Yup.string().min(8) : Yup.string().min(8).required(true),

    }
}
export default FormPersonnel;
