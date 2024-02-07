import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {add_requirements, update_requirements} from '../../redux/actions/store';
import HeaderForm from '../util/HeaderForm';
import InputField from "../requirements/InputField";
import SelectField from "../requirements/SelectField";


const validationSchema = Yup.object({
    product: Yup.string().required('Producto no puede estar en blanco'),
    description: Yup.string().required('Descripción no puede estar en blanco'),
    quantity: Yup.number().required('Cantidad no puede estar en blanco'),
    unit_measurement: Yup.string().required('Unidad de medida no puede estar en blanco'),
    status: Yup.string().min(5, 'El estado debe ser una opción válida').required('Estado no puede estar en blanco'),
    work: Yup.string().required('Tipo de trabajo no puede estar en blanco'),
});

const FormRequirements = ({data, close}) => {
    const {user} = useSelector(state => state.Auth);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            product: data?.product || '',
            description: data?.description || '',
            quantity: data?.quantity || '',
            unit_measurement: data?.unit_measurement || '',
            status: data?.status || 'Pendiente',
            work: data?.work || '',
        }, validationSchema, onSubmit: form => {
            data ? dispatch(update_requirements(form, data.id)) : dispatch(add_requirements(form));
            close();
        },
    });

    const roles = user?.role ? ['B', 'P'] : []; // Adjust based on your logic

    return (<form className="bg-white rounded px-8">
        <HeaderForm submit={formik.handleSubmit} close={close}/>
        <div className="grid md:grid-cols-2 gap-2 mt-2">
            {roles.includes(user?.role) && (<>
                <InputField formik={formik} name="product" title="Producto" maxLength={50}/>
                <InputField formik={formik} name="description" title="Descripción" maxLength={100}/>
                <InputField formik={formik} name="quantity" title="Cantidad" type="number"/>
                <InputField formik={formik} name="unit_measurement" title="U.M." maxLength={20}/>
                <InputField formik={formik} name="work" title="Tipo de trabajo" maxLength={20}/>
                {['P', 'B'].includes(user?.role) && (<SelectField formik={formik} name="status" title="Estado"
                                                                  options={['Pendiente', 'Aprobado', 'Rechazado', 'Parcial', 'Finalizado']}/>)}
            </>)}
        </div>
    </form>);
};

export default FormRequirements;
