import React from 'react';
import {useFormik} from "formik";

const SearchBar = ({setParams}) => {

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(), validateOnChange: true, onSubmit: (form) => {
            setParams && setParams(form)
        }
    })

    return (<form onChange={formik.handleSubmit} className="relative mx-auto w-max py-4">
        <input type="search" value={formik.values.name}
               onChange={(value) => formik.setFieldValue('name', value.target.value)}
               className=" peer cursor-pointer relative z-10 h-12 w-12 text-gray-400 rounded-full border bg-transparent pl-12 outline-none  focus:w-52 sm:focus:w-full focus:cursor-text focus:border-blue-300 focus:pl-16 focus:pr-4"/>
        <svg xmlns="http://www.w3.org/2000/svg"
             className="cursor-pointer absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-blue-300 peer-focus:stroke-blue-500"
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
    </form>);
};
const initialValues = () => {
    return {
        name: '',
    }
}
export default SearchBar;
