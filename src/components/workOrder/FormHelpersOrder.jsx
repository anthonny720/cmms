import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filter, map} from "lodash";
import {TrashIcon} from "@heroicons/react/20/solid";
import HeaderForm from "../util/HeaderForm";
import {add_helper_ot, delete_helper_ot} from "../../redux/actions/management";
import {setAlert} from "../../redux/actions/alert";

const FormHelpersOrder = ({id, close, params}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.Auth.users);
    const work = useSelector(state => state.Management.works);
    const info = work.find(item => item.id === id) || {};

    const [helper, setHelper] = useState('');
    const [dateStart, setDateStart] = useState(info.date_start || '');
    const [dateFinish, setDateFinish] = useState(info.date_finish || '');

    const handleSubmit = () => {
        const data = {helper, date_start: dateStart, date_finish: dateFinish};
        if (!data.helper || !data.date_start || !data.date_finish) {
            dispatch(setAlert('Todos los campos son requeridos', 'error'));
        } else {
            dispatch(add_helper_ot(data,id, params));
            setHelper('');
            close();
        }
    };

    const handleDelete = (helperId) => {
        dispatch(delete_helper_ot(helperId, params));
    };

    return (<div className="bg-white px-2 pb-8 mb-4">
            <HeaderForm close={close}/>
            <div className="grid grid-cols-1 gap-2">
                <HelperSelection users={users} selectedHelper={helper} onChange={setHelper}/>
                <DateField label="Fecha/Hora de inicio" value={dateStart} onChange={setDateStart}/>
                <DateField label="Fecha/Hora fin" value={dateFinish} onChange={setDateFinish}/>
                <SubmitButton onSubmit={handleSubmit}/>
            </div>
            <HelpersTable helpers={info.helpers || []} onDelete={handleDelete}/>
        </div>);
};

const HelperSelection = ({users, selectedHelper, onChange}) => {
    return (<div>
            <label htmlFor="helper" className="text-[10px] font-extralight leading-none text-blue-400">Personal</label>
            <select
                id="helper"
                value={selectedHelper}
                onChange={e => onChange(e.target.value)}
                className="text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs"
            >
                <option value="">Seleccione un personal</option>
                {map(filter(users, user => ['T', 'O'].includes(user.role)), (item, index) => (
                    <option key={index} value={item.id}>{item.first_name} {item.last_name}</option>))}
            </select>
        </div>);
};

const DateField = ({label, value, onChange}) => {
    return (<div>
            <label className="text-[10px] font-extralight leading-none text-blue-400">{label}</label>
            <input
                type="datetime-local"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 font-light text-xs"
            />
        </div>);
};

const SubmitButton = ({onSubmit}) => {
    return (<button type="button" onClick={onSubmit}
                    className="flex items-center space-x-2 bg-[#4687f1] bg-opacity-70 p-2 w-max rounded-lg text-white">
            <span className="text-xs">Guardar</span>
        </button>);
};

const HelpersTable = ({helpers, onDelete}) => {
    return (<div className="h-40 overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-white">
                <tr>
                    <th className="px-6 py-3">Eliminar</th>
                    <th className="px-6 py-3">Personal</th>
                    <th className="px-6 py-3">Inicio</th>
                    <th className="px-6 py-3">Fin</th>
                </tr>
                </thead>
                <tbody>
                {helpers.map((row, index) => (<tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-center">
                            <TrashIcon onClick={() => onDelete(row.id)}
                                       className="w-4 h-4 text-red-500 cursor-pointer"/>
                        </td>
                        <td className="px-6 py-4">{row.helper.first_name}</td>
                        <td className="px-6 py-4">{new Date(row.date_start).toLocaleString('es-PE')}</td>
                        <td className="px-6 py-4">{new Date(row.date_finish).toLocaleString('es-PE')}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
};

export default FormHelpersOrder;
