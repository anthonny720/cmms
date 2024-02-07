import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {get_category} from "../../redux/actions/config";
import {add_user, update_user} from "../../redux/actions/auth";
import HeaderForm from "../util/HeaderForm";

const FormPersonnel = ({data, close}) => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.Configuration.categories);

    const roles = [{value: 'T', label: 'Técnico'}, {value: 'S', label: 'Supervisor'}, {
        value: 'OT', label: 'Otro'
    }, {value: 'P', label: 'Planner'}, {value: 'B', label: 'Jefe'}];


    useEffect(() => {
        dispatch(get_category());
    }, [dispatch]);


    const columns = [{name: 'first_name', title: 'Nombre', type: 'text', maxLength: 20}, {
        name: 'last_name', title: 'Apellidos', type: 'text', maxLength: 20
    }, {name: 'email', title: 'Email', type: 'email'}, {name: 'phone', title: 'Teléfono', type: 'telf'}, {
        name: 'dni',
        title: 'DNI',
        type: 'text',
        maxLength: 8
    },]


    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(validationSchema(data)),
        onSubmit: (formValues) => {
            data ? dispatch(update_user(formValues, data.id)) : dispatch(add_user(formValues));
            close();
        },
    });


    return (

        <form onSubmit={formik.handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <HeaderForm close={close} submit={formik.handleSubmit}/>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-2">
                {/* Iterar sobre cada campo definido en columns */}
                {columns.map((column) => (<div key={column.name}>
                    {formik.values[column.name] && (
                        <p className="text-[10px] font-extralight leading-none text-blue-400">{column.title}</p>)}
                    <input
                        type={column.type}
                        name={column.name}
                        maxLength={column.maxLength}
                        placeholder={column.title}
                        className={`w-full p-3 mt-4 border rounded outline-none focus:bg-gray-50 text-xs font-light ${formik.errors[column.name] ? "border-red-300" : "border-gray-300"} focus:border-blue-300`}
                        value={formik.values[column.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched[column.name] && formik.errors[column.name] && (
                        <p className="text-red-400 text-[10px] mt-1 font-extralight leading-none">{formik.errors[column.name]}</p>)}
                </div>))}
                <div>
                    <p className="text-[10px] font-extralight leading-none text-blue-400">Categoría</p>
                    <select
                        name="category"
                        className="w-full p-3 mt-4 border rounded outline-none focus:bg-gray-50 text-xs font-light focus:border-blue-300"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Seleccione una categoría</option>
                        {category.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                        <p className="text-red-400 text-[10px] mt-1 font-extralight leading-none">{formik.errors.category}</p>)}
                </div>
                <div>
                    <p className="text-[10px] font-extralight leading-none text-blue-400">Rol</p>
                    <select
                        name="role"
                        className="w-full p-3 mt-4 border rounded outline-none focus:bg-gray-50 text-xs font-light focus:border-blue-300"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map((role) => (<option key={role.value} value={role.value}>{role.label}</option>))}
                    </select>
                    {formik.touched.role && formik.errors.role && (
                        <p className="text-red-400 text-[10px] mt-1 font-extralight leading-none">{formik.errors.role}</p>)}
                </div>
            </div>
        </form>);
};

const initialValues = (data) => {
    return {
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        dni: data?.dni || '',
        role: data?.role || 'O',
        category: data?.category || '',
        password: '',
    }
}
const validationSchema = (data) => {
    return {
        first_name: Yup.string().required("Nombres no puede estar en blanco"),
        last_name: Yup.string().required("Apellidos no puede estar en blanco"),
        email: Yup.string("Email inválido").email("Email inválido").required("Email no puede estar en blanco"),
        phone: Yup.string().min(9, "El teléfono debe tener un mínimo de 9 números").required("Teléfono no puede estar en blanco"),
        dni: Yup.string().min(8, "El DNI debe tener un mínimo y máximo de 8 números").required("DNI no puede estar en blanco"),
        role: Yup.string().required("Rol no puede estar en blanco"),
        category: Yup.number().required("Categoría no puede estar en blanco"),
        password: data ? Yup.string().min(8) : Yup.string().min(8).required(true),

    }
}
export default FormPersonnel;
