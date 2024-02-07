// InputField.js
import React from 'react';

const InputField = ({formik, name, title, type = 'text', maxLength}) => (<div>
        {formik.values[name]?.length > 0 && (
            <p className="text-[10px] font-extralight leading-none text-blue-400">{title}</p>)}
        <input
            type={type}
            name={name}
            maxLength={maxLength}
            placeholder={title}
            className={`text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs ${formik.errors[name] && "border-red-300"}`}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        />
        {formik.touched[name] && formik.errors[name] && (
            <p className="text-[10px] mt-1 font-extralight leading-none text-red-400">{formik.errors[name]}</p>)}
    </div>);

export default InputField;
