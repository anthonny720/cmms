import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {add_physical, get_physical_by_id, update_physical} from "../../redux/actions/assets";
import HeaderForm from "../util/HeaderForm";

const FormEquipments = ({data, close}) => {
    const dispatch = useDispatch();
    const fixed = useSelector(state => state.Assets.fixed);
    const equipment = useSelector(state => state.Assets.equipment);


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
            code: data?.code || '',
            parent: data?.parent || '',
            buy_date: data?.buy_date || '',
        }, validationSchema: Yup.object({
            name: Yup.string().required("Nombre no puede estar en blanco"),
            model: Yup.string().required("Modelo no puede estar en blanco"),
            code: Yup.string().required("Código no puede estar en blanco"),
            criticality: Yup.string().required("Criticidad no puede estar en blanco"),
            parent: Yup.number().required("Ubicación no puede estar en blanco").min(1, "La ubicación debe ser válida"),
            buy_date: Yup.date().required("Fecha de compra no puede estar en blanco"),
        }), onSubmit: (values) => {
            data ? dispatch(update_physical(values, equipment.id)) : dispatch(add_physical(values));
            close();
        }
    });


    return (


        <form onSubmit={formik.handleSubmit}
              className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full h-max overflow-y-auto">
            <HeaderForm submit={formik.handleSubmit} close={close}/>
            <div className="w-full  grid grid-cols-1 gap-2">
                <FormField label="Nombre" fieldProps={formik.getFieldProps('name')}/>
                <FormField label="Codigo" fieldProps={formik.getFieldProps('code')}/>
                <FormField label="Fecha de Compra" type="date" fieldProps={formik.getFieldProps('buy_date')}/>
                <FormField label="Modelo" fieldProps={formik.getFieldProps('model')}/>
                <FormField label="Criticidad" fieldProps={formik.getFieldProps('criticality')} type="select">
                    <option value="L">Baja</option>
                    <option value="M">Media</option>
                    <option value="H">Alta</option>
                </FormField>
                <FormField label="Ubicación" fieldProps={formik.getFieldProps('parent')} type="select">
                    <option value={0}>Seleccione un activo</option>
                    {renderSelectOptions(fixed)}
                </FormField>
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


const renderSelectOptions = (items) => {
    return items.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>));
};

export default FormEquipments;
