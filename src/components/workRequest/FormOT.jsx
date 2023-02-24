import React, {Fragment, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {Combobox, Listbox, Transition} from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {filter, map, size} from "lodash";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {setAlert} from "../../redux/actions/alert";
import {generate_ot} from "../../redux/actions/management";

const FormOT = ({data, close}) => {
    const dispatch = useDispatch();
    const physical = useSelector(state => state.Assets.physical)
    const users = useSelector(state => state.Auth.users)

    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            if (size(selectedPersonnel) > 0 && selectedEquipment !== '') {
                form.asset = selectedEquipment.id
                form.technical = map(selectedPersonnel, (item) => item.id)
                form.work_request = data?.id
                dispatch(generate_ot(form))
                close()
            } else {
                dispatch(setAlert('Debe seleccionar al menos un elemento de cada lista', 'error'))
            }
        }
    })

    const [selectedEquipment, setSelectedEquipment] = useState(data ? filter(physical, (item) => item.id === data?.asset)[0] : physical[0])
    const [queryEquipment, setQueryEquipment] = useState('')

    const filteredEquipment = queryEquipment === '' ? physical : physical.filter((person) => person.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(queryEquipment.toLowerCase().replace(/\s+/g, '')))


    const [selectedPersonnel, setSelected] = useState(data ? map(data?.technical, i => filter(users, ['id', i])[0]) : [])

    return (<form className="bg-white   px-2  pb-8 mb-4 h-max ">
        <div className={"flex   w-full justify-between "}>
            <button type={"button"}
                    onClick={() => {
                        close()
                    }}
                    className={"flex items-center w-max rounded-full hover:bg-[#4687f1] hover:bg-opacity-10   text-xs  bg-white  p-2 rounded-lg text-[#4687f1]"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-4 h-4 text-[#4687f1]">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                </svg>
            </button>
            <button onClick={formik.handleSubmit} type={"button"}
                    className={"flex  items-center text-xs space-x-2 bg-white border-2 border-[#4687f1] hover:bg-[#4687f1] hover:bg-opacity-10  p-2 rounded-lg text-[#4687f1]"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                <span className={"text-xs"}>Aceptar</span>
            </button>
        </div>
        <hr className={"bg-gray-500 my-2"}/>
        <div className={`grid grid-cols-1 gap-2`}>

            {/*ReportDate*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Fecha/Hora de reporte</p>
                <input type={"datetime-local"}
                       className={`${formik.errors.date_report && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                       value={`${formik.values.date_report}`}
                       onChange={text => formik.setFieldValue('date_report', text.target.value)}/>
                <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.date_report ? "text-red-400" : " text-gray-800"}`}>{formik.errors.date_report}</p>

            </div>
            {/*StartDate*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Fecha/Hora de inicio</p>
                <input type={"datetime-local"}
                       className={`${formik.errors.date_start && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                       value={`${formik.values.date_start}`}
                       onChange={text => formik.setFieldValue('date_start', text.target.value)}/>
                <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.date_start ? "text-red-400" : " text-gray-800"}`}>{formik.errors.date_start}</p>

            </div>
            {/*Asset*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Equipo</p>
                <Combobox value={selectedEquipment} onChange={setSelectedEquipment}>
                    <div className="relative mt-1">
                        <div
                            className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={(equipment) => equipment.name}
                                onChange={(event) => setQueryEquipment(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQueryEquipment('')}
                        >
                            <Combobox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredEquipment.length === 0 && queryEquipment !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>) : (filteredEquipment.map((equipment) => (<Combobox.Option
                                    key={equipment.id}
                                    className={({active}) => `z-50 relative bg-white cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-300 text-white' : 'text-gray-900'}`}
                                    value={equipment}
                                >
                                    {({selected, active}) => (<>
                        <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {equipment.name}
                        </span>
                                        {selected ? (<span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-300'}`}
                                        >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>) : null}
                                    </>)}
                                </Combobox.Option>)))}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>


            {/*Description*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Descripción</p>
                <textarea
                    className={`${formik.errors.description && "border-red-300"} text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs`}
                    value={`${formik.values.description}`}
                    onChange={text => formik.setFieldValue('description', text.target.value)}/>
                <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.description ? "text-red-400" : " text-gray-800"}`}>{formik.errors.description}</p>

            </div>
            {/*Users*/}
            <div>
                <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Personal de mantenimiento</p>
                <Listbox value={selectedPersonnel} multiple onChange={setSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span
                                className="block truncate text-black whitespace-pre-wrap">{map(selectedPersonnel, person => person.first_name).join(', ')}</span>
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
                                {users && users.map((person, personIdx) => (<Listbox.Option
                                    key={personIdx}
                                    className={({active}) => `relative z-50 bg-white cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-200 text-blue-900' : 'text-gray-900'}`}
                                    value={person}
                                >
                                    {({selected}) => (<>
                      <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {person.first_name}
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

            <div className={"grid grid-cols-3"}>
                {/*Criticity*/}
                <div>
                    <p className={`text-[10px]  font-extralight leading-none text-blue-400 `}>Criticidad</p>
                    <ReactStars
                        value={formik.values.criticity}
                        count={5}
                        onChange={text => formik.setFieldValue('criticity', text)}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <p className={` text-[10px] mt-1  font-extralight leading-none ${formik.errors.criticity ? "text-red-400" : " text-gray-800"}`}>{formik.errors.criticity}</p>

                </div>

            </div>


        </div>


    </form>);
};
const initialValues = (data) => {
    return {
        date_start: data?.date_start || '',
        date_report: data?.date_report || '',
        criticity: data?.criticity || 1,
        description: data?.description || '',


    }
}
const newSchema = () => {
    return {
        date_report: Yup.string().min(10).required("Fecha de reporte no puede estar en blanco"),
        date_start: Yup.string().min(10).required("Fecha de reporte no puede estar en blanco"),
        criticity: Yup.number().min(1, 'La criticidad debe ser inferior o igual a 5').max(5, "La criticidad debe ser inferior o igual a 5\n").required("Criticidad no puede estar en blanco"),
        description: Yup.string().required("Descripción no puede estar en blanco"),


    }
}

export default FormOT;
