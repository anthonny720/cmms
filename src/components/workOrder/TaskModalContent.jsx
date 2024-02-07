import React from 'react';
import FormTasks from "../../components/workOrder/FormTasks";
import DocumentViewer from "../../components/workOrder/Document";
import FormResourcesOrder from "../../components/workOrder/FormResourcesOrder";
import FormHelpersOrder from "../../components/workOrder/FormHelpersOrder";

const TaskModalContent = ({actionType, data, params, close}) => {
    const filter = {
        'date_start': params ? new Date(params[0]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
        'date_end': params ? new Date(params[1]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
    };

    switch (actionType) {
        case 'add':
            return <FormTasks close={close} params={filter}/>;
        case 'view':
            return <DocumentViewer data={data} close={close}/>;
        case 'update':
            return <FormTasks params={filter} id={data?.id} close={close} data={data}/>;
        case 'updateResource':
            return <FormResourcesOrder close={close} id={data.id} params={filter}/>;
        case 'updateHelpers':
            return <FormHelpersOrder close={close} id={data.id} params={filter}/>;
        default:
            return <div>No action selected</div>;
    }
};

export default TaskModalContent;
