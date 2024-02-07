import {Switch} from "@headlessui/react";

const SwitchField = ({ label, id, name, formik }) => (
    <>
        <label htmlFor={id} className="text-[10px] font-extralight leading-none text-blue-400 flex">
            {label}
        </label>
        <Switch
            id={id}
            checked={formik.values[name]}
            onChange={(checked) => formik.setFieldValue(name, checked)}
            className={`${formik.values[name] ? 'bg-blue-600' : 'bg-gray-200'} mt-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
            <span className="sr-only">Finalizado</span>
            <span
                className={`${formik.values[name] ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
        </Switch>
        {formik.touched[name] && formik.errors[name] && (
            <p className="text-[10px] mt-1 font-extralight leading-none text-red-400">
                {formik.errors[name]}
            </p>
        )}
    </>
);

export default SwitchField;