import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import FormTasks from "../../components/workOrder/FormTasks";
import Modal from "../../components/util/Modal";
import {useDispatch, useSelector} from "react-redux";
import {get_works} from "../../redux/actions/management";
import DocumentViewer from "../../components/workOrder/Document";
import ModalHook from "../../components/util/hooks";
import RangeDate from "../../components/util/RangeDate";
import TableRegister from "../../components/Assets/TableRegister";
import Header from "../../components/navigation/Header";
import DownloadOT from "../../components/workOrder/DownloadOT";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";


const RegisterOrder = () => {
    const dispatch = useDispatch();

    const {works, physical, users, types} = useSelector(({Management, Assets, Auth, Configuration}) => ({
        works: Management?.works || [],
        physical: Assets?.physical || [],
        users: Auth?.users?.filter(user => user.role === 'T') || [],
        types: Configuration?.types || [],
    }));

    const [params, setParams] = useState(null);
    const [filter, setFilter] = useState({planned: false, user: null, type: null, physical: null});
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const formatDate = (date) => date ? new Date(date).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '';


    const updateFilterParams = useCallback(() => {
        const {date_start, date_end, physical, type, user, planned} = filter;
        const filterParams = {
            date_start: formatDate(date_start), date_end: formatDate(date_end), physical, type, user, planned,
        };
        dispatch(get_works(filterParams));
    }, [filter, dispatch]);

    useEffect(() => {
        updateFilterParams();
    }, [params, filter, updateFilterParams]);

    const handleAction = useCallback((Component, data) => {
        setIsOpen(true);
        setContent(<Component data={data} close={openModal}/>);
    }, [setIsOpen, setContent, openModal]);


    return (<Layout>
        <Modal isOpen={isOpen} close={openModal}>{content}</Modal>

        <div className="h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl">
            <Header/>
            <ArrowDownTrayIcon
                className="h-6 w-6 text-blue-400 cursor-pointer absolute right-4 bottom-4"
                onClick={() => handleAction(DownloadOT, works.filter(item => item.status))}
            />

            <div className={"w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"}>
                <RangeDate onChange={setParams} value={params}/>
                <SelectField
                    options={physical}
                    value={filter.physical}
                    onChange={(e) => setFilter({...filter, 'physical': e.target.value})}
                    label="Equipo"
                />

                <SelectField
                    options={types}
                    value={filter.type}
                    onChange={(e) => setFilter({...filter, 'type': e.target.value})}
                    label="Tipo de mantenimiento"
                />

                <SelectField
                    options={users.filter(user => user.role === 'T')}
                    value={filter.user}
                    onChange={(e) => setFilter({...filter, 'user': e.target.value})}
                    label="Técnico/Operario"
                    valueKey="id"
                    labelKey="first_name"
                />


                <div className="flex items-center mb-4 justify-center gap-2 mt-2 w-max">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filter.planned}
                            onChange={(e) => setFilter({...filter, 'planned': e.target.checked})}
                            className="sr-only peer"
                        />
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-gray-400 text-xs">Planificado</span>
                    </label>
                </div>


            </div>
            <div className={"w-full overflow-scroll scrollbar-hide"}>
                <TableRegister
                    params={params}
                    data={works.filter(item => item.status)}
                    view={(data) => handleAction(DocumentViewer, data)}
                    update={(data) => handleAction(FormTasks, data)}
                />
            </div>

        </div>

    </Layout>);
};

const SelectField = ({options, value, onChange, label, valueKey = 'id', labelKey = 'name'}) => (<div>
    <select
        onChange={onChange}
        value={value}
        className="z-[100] rounded-2xl bg-white w-full text-gray-400 text-xs p-1 mb-2 flex flex-col border-2 border-blue-400"
    >
        <option value="">{label}</option>
        {options.map((option, index) => (<option key={index} value={option[valueKey]}>{option[labelKey]}</option>))}
    </select>
</div>);


export default RegisterOrder;
