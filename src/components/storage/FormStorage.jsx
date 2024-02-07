import React from 'react';
import {useFormik} from "formik";
import {DocumentIcon} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {add_file} from "../../redux/actions/assets";
import HeaderForm from "../util/HeaderForm";


const FormStorage = ({close}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {file: null}, validateOnChange: true, onSubmit: (values) => {
            if (values.file) {
                const formData = new FormData();
                formData.append('file', values.file);
                dispatch(add_file(formData));
            }
            close();
        },
    });

    return (<form onSubmit={formik.handleSubmit} className="bg-white px-2 pb-8 mb-4">
        <HeaderForm close={close} submit={formik.handleSubmit}/>
        <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-center mt-8">
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="file-upload"
                        className={`flex flex-col w-full h-32 border-4 border-dashed ${formik.values.file ? 'border-blue-200 hover:border-blue-300' : 'border-gray-200 hover:border-gray-300'} hover:bg-gray-100 cursor-pointer`}
                    >
                        <div className="flex flex-col items-center justify-center pt-7">
                            <DocumentIcon
                                className={`w-8 h-8 ${formik.values.file ? 'text-blue-200' : 'text-gray-400'}`}/>
                            <p className="pt-1 text-xs tracking-wider text-center text-gray-600">
                                {formik.values.file ? formik.values.file.name : 'Click para examinar'}
                            </p>
                        </div>

                        <input
                            id="file-upload"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
                            className="opacity-0  inset-0"
                        />
                    </label>


                </div>
            </div>


        </div>


    </form>);
};


export default FormStorage;
