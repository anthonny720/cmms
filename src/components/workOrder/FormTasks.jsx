import React, {Fragment, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {Listbox, Switch, Transition} from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {map, size} from "lodash";
import {setAlert} from "../../redux/actions/alert";
import {add_work, update_work} from "../../redux/actions/management";
import HeaderForm from "../util/HeaderForm";
import CBox from "./CBox";

const FormTasks = ({data, close, id, params}) => {

    const dispatch = useDispatch();

    const {physical, tools} = useSelector(state => state.Assets)
    const {users, user: me} = useSelector(state => state.Auth)
    const {types, failures} = useSelector(state => state.Configuration)

    const [selectedEquipment, setSelectedEquipment] = useState(data ? physical.find(item => item.id === data.asset) : physical[0]);
    const [selectedType, setSelectedType] = useState(data ? types.find(item => item.id === data.type_maintenance) : types[0]);
    const [selectedFailure, setSelectedFailure] = useState(data ? failures.find(item => item.id === data.failure) : failures[0]);
    const [selectedTools, setSelectedTools] = useState(data ? data.tools.map(toolId => tools.find(tool => tool.id === toolId)) : []);


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            if (size(selectedTools) > 0 && selectedEquipment !== '' && selectedType !== '' && selectedFailure !== '') {
                form.asset = selectedEquipment.id
                form.tools = map(selectedTools, (item) => item?.id)
                form.type_maintenance = selectedType?.id
                form.failure = selectedFailure.id
                data ? dispatch(update_work(form, data?.id, params)) : dispatch(add_work(form, params))
                close()
            } else {
                dispatch(setAlert('Debe seleccionar al menos un elemento de cada lista', 'error'))
            }
        }
    })

    const useFilteredData = (data, query) => {
        if (query === '') {
            return data;
        } else {
            return data.filter((item) => item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));
        }
    };

    const [queryEquipment, setQueryEquipment] = useState('')
    const [queryType, setQueryType] = useState('')
    const [queryFailure, setQueryFailure] = useState('')

    const filteredEquipment = useFilteredData(physical, queryEquipment);
    const filteredType = useFilteredData(types, queryType);
    const filteredFailure = useFilteredData(failures, queryFailure);

    return (<form className="bg-white   px-2  pb-8 mb-4 h-max ">

        <HeaderForm close={close} submit={formik.handleSubmit}/>

        <div className={`grid grid-cols-1 gap-2`}>
            {me && (me.role === 'P' || me.role === 'B') && <div className={"w-full "}>
                <p className={`${formik.errors.technical && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 `}>Responsable:</p>
                <select value={formik.values.technical}
                        onChange={(value) => formik.setFieldValue('technical', value.target.value)}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                    <option value="">-----</option>
                    {users && users.filter((user) => (user.role === 'T')).map((item, index) => <option key={index}
                                                                                                       value={item.id}>{item.get_full_name}</option>)}
                </select>
            </div>

            }

            <InputField label={"Fecha/Hora de reporte"} config={"datetime-local"} name={"date_report"} formik={formik}
                        formik_value={formik.values.date_report} formik_error={formik.errors.date_report}/>
            <InputField label={"Fecha/Hora de inicio"} config={"datetime-local"} name={"date_start"} formik={formik}
                        formik_value={formik.values.date_start} formik_error={formik.errors.date_start}/>
            <InputField label={"Fecha/Hora de finalización"} config={"datetime-local"} name={"date_finish"}
                        formik={formik}
                        formik_value={formik.values.date_finish} formik_error={formik.errors.date_finish}/>

            <ComboBoxField label={"Equipo"} selected={selectedEquipment} setSelected={setSelectedEquipment}
                           setQuery={setQueryEquipment} filtered={filteredEquipment} query={queryEquipment}/>
            <ComboBoxField label={"Tipo de mantenimiento"} selected={selectedType} setSelected={setSelectedType}
                           setQuery={setQueryType} filtered={filteredType} query={queryType}/>
            <ComboBoxField label={"Origen de falla"} selected={selectedFailure} setSelected={setSelectedFailure}
                           setQuery={setQueryFailure} filtered={filteredFailure} query={queryFailure}/>

            <TextAreaField label={"Descripción"} id={"description"} name={"description"} rows={4} formik={formik}/>


            {/*Tools*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Herramientas y materiales
                    usados</p>
                <Listbox value={selectedTools} multiple onChange={setSelectedTools}>
                    <div className="relative mt-1">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span
                                className="break-words block truncate whitespace-pre-wrap text-black ">{map(selectedTools, tools => tools?.name).join(', ')}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {tools && tools.map((tool, id) => (<Listbox.Option
                                    key={id}
                                    className={({active}) => `bg-white z-50 relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'}`}
                                    value={tool}
                                >
                                    {({selected}) => (<>
                      <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {tool?.name}
                      </span>
                                        {selected ? (<span
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>) : null}
                                    </>)}
                                </Listbox.Option>))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>

            {/*Activities*/}

            <TextAreaField label={"Trabajos realizados"} id={"activities"} name={"activities"} rows={4}
                           formik={formik}/>

            <div className={"grid grid-cols-3"}>
                {me && (me?.role === 'B' || me?.role === 'P' || me?.role === 'T') && <>
                    <SwitchField label={"Planificado"} formik={formik} name={"planned"}/>
                    <SwitchField label={"Afectó la producción"} formik={formik} name={"stop"}/>
                    <SwitchField label={"Finalizado"} formik={formik} name={"status"}/>
                </>}


            </div>


        </div>


    </form>)

};

const InputField = ({label, config, name, formik, formik_value, formik_error}) => (<div>
    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{label}</p>
    <input type={config}
           className={`${formik_error} && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
           value={`${formik_value}`}
           onChange={text => formik.setFieldValue(name, text.target.value)}/>
    <p className={` text-[10px] mt-1  font-extralight leading-none ${formik_error ? "text-red-400" : " text-gray-800"}`}>{formik_error}</p>
</div>);


const ComboBoxField = ({label, selected, setSelected, setQuery, filtered, query}) => {
    return (<div>
        <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{label}</p>
        <CBox selected={selected} setSelected={setSelected} setQuery={setQuery} filtered={filtered} query={query}/>
    </div>);
}

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


const SwitchField = ({label, formik, name}) => {
    return (<div>
        <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>{label}</p>
        <Switch checked={formik.values[name]} onChange={text => formik.setFieldValue(name, text)}
                as={Fragment}>
            {({checked}) => (/* Use the `checked` state to conditionally style the button. */
                <button
                    className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} mt-2 relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span className="sr-only">{label}</span>
                    <span
                        className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </button>)}
        </Switch>
        <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors[name] ? "text-red-400" : " text-gray-800"}`}>{formik.errors[name]}</p>
    </div>);
}

const initialValues = (data) => {
    return {
        date_start: data?.date_start || '',
        date_finish: data?.date_finish || '',
        date_report: data?.date_report || '',
        description: data?.description || '',
        activities: data?.activities || '',
        status: data?.status || false,
        planned: data?.planned || false,
        stop: data?.stop || false,
        technical: data?.technical || null,
    }
}
const newSchema = () => {
    return {
        date_start: Yup.string().min(10).required("Fecha de inicio no puede estar en blanco"),
        date_report: Yup.string().min(10).required("Fecha de reporte no puede estar en blanco"),
        date_finish: Yup.string().min(10).required("Fecha de fin no puede estar en blanco"),
        description: Yup.string().required("Descripción no puede estar en blanco"),
    }
}

export default FormTasks;
