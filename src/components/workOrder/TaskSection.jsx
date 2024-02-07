import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Card from '../../components/workOrder/Card';

const TaskSection = ({title, icon, color, work, handleModalAction, handleDeleteWork}) => {
    return (<div className="mt-0">
        <div className="flex items-center bg-white w-full p-2 rounded-xl  border-gray-200 border-2">
            <FontAwesomeIcon icon={icon} className={`bg-${color}-400 text-white  p-2 rounded-full`}/>
            <span className={`text-${color}-400 font-bold text-sm p-2`}>{title}</span>
        </div>

        <div className={"h-56 md:h-screen overflow-scroll scrollbar-hide"}>
            {work.map((item, index) => (<Card
                key={index}
                workItem={item}
                action_view={() => handleModalAction('view', item)}
                action_update={() => handleModalAction('update', item)}
                action_update_resource={() => handleModalAction('updateResource', item)}
                action_update_helpers={() => handleModalAction('updateHelpers', item)}
                action_delete={() => handleDeleteWork(item)}
                action_supervisor={() => handleModalAction('supervisor', item)}
            />))}
        </div>

    </div>);
};
export default TaskSection;