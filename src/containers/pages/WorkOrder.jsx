import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faHourglass, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/util/Modal";
import {useDispatch, useSelector} from "react-redux";
import {get_physical, get_tools} from "../../redux/actions/assets";
import {get_failures, get_types} from "../../redux/actions/config";
import {get_users} from "../../redux/actions/auth";
import {delete_work, get_works} from "../../redux/actions/management";
import {MySwal} from "../../helpers/util";
import {get_articles} from "../../redux/actions/store";
import ButtonAdd from "../../components/util/ButtonAdd";
import ModalHook from "../../components/util/hooks";
import RangeDate from "../../components/util/RangeDate";
import Header from "../../components/navigation/Header";
import TaskSection from "../../components/workOrder/TaskSection";
import TaskModalContent from "../../components/workOrder/TaskModalContent";


const WorkOrder = () => {
    const dispatch = useDispatch();
    const work = useSelector(state => state.Management.works);
    const [params, setParams] = useState();
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();


    useEffect(() => {
        dispatch(get_physical());
        dispatch(get_tools());
        dispatch(get_types());
        dispatch(get_failures());
        dispatch(get_users());
        dispatch(get_articles());
        if (params) {
            const filter = createFilter(params);
            dispatch(get_works(filter));
        }
    }, [params, dispatch]);

    const createFilter = (params) => ({
        'date_start': params ? new Date(params[0]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
        'date_end': params ? new Date(params[1]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : ''
    });

    const handleModalAction = (actionType, data) => {
        setIsOpen(true);
        setContent(<TaskModalContent actionType={actionType} data={data} params={params} close={openModal}/>);
    };

    const handleDeleteWork = (data) => {
        MySwal.fire({
            title: '¿Desea eliminar esta OT?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#7DABF5',
            confirmButtonColor: '#F87171',
            confirmButtonText: 'Eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_work(data.id, createFilter(params)));
            }
        });
    };

    return (<Layout>
            <Modal isOpen={isOpen} close={openModal} children={content}/>

            <ButtonAdd>
                <button type={"button"} onClick={() => handleModalAction('add')}
                        className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                    <FontAwesomeIcon className={"text-[#4687f1] bg-white rounded-full"}
                                     size={"2x"} icon={faPlusSquare}/>
                    <p className={"text-[#4687f1] font-semibold"}>Añadir</p>
                </button>
            </ButtonAdd>
            <div className=" w-full bg-white p-4 rounded-l-2xl overflow-y-auto scrollbar-hide">
                <Header/>
                <div className="flex w-full justify-start gap-4 items-center mt-2">
                    <RangeDate onChange={setParams} value={params}/>
                </div>
                {work && work.length > 0 ?
                 <TaskSections work={work} handleModalAction={handleModalAction} handleDeleteWork={handleDeleteWork}/>
                    : <div className="flex w-full justify-center items-center">
                        <p className="text-gray-400 font-semibold text-lg">No hay ordenes de trabajo</p>
                    </div>
                }

            </div>

        </Layout>);
};
const TaskSections = ({work, handleModalAction, handleDeleteWork}) => (<div
        className="grid grid-cols-1 md:grid-cols-2 lg:space-x-12 lg:p-6 w-full gap-2 ">
        <TaskSection title="Tareas pendientes" icon={faHourglass} color="red"
                     work={work.filter(item => !item.status)} handleModalAction={handleModalAction}
                     handleDeleteWork={handleDeleteWork}/>
        <TaskSection title="Tareas finalizadas" icon={faCheck} color="green"
                     work={work.filter(item => item.status)} handleModalAction={handleModalAction}
                     handleDeleteWork={handleDeleteWork}/>
    </div>);

export default WorkOrder;
