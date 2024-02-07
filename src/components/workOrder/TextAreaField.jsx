const TextAreaField = ({label, id, name, rows, formik}) => (<>
        <label htmlFor={id} className="text-[10px] font-extralight leading-none text-blue-400">
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            className={`${formik.errors[name] ? 'border-red-300' : ''} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={rows}
        />
        {formik.touched[name] && formik.errors[name] && (
            <p className="text-[10px] mt-1 font-extralight leading-none text-red-400">
                {formik.errors[name]}
            </p>)}
    </>);
export default TextAreaField;