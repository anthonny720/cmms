import React from 'react';
import {useSelector} from "react-redux";
import {map, size} from "lodash";
import {ClockIcon, WrenchIcon} from "@heroicons/react/24/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faEye, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {UserIcon, UserPlusIcon} from "@heroicons/react/20/solid";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import Humanize from "humanize-plus";


const formatDate = (date) => new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,
});
const Card = ({
                  workItem,
                  action_supervisor,
                  action_view,
                  action_delete,
                  action_update_helpers,
                  action_update,
                  action_update_resource
              }) => {
    const user = useSelector(state => state.Auth?.user);
    const role = user?.role;

    return (<div className="flex flex-col items-start bg-white w-full p-2 rounded-xl border border-gray-200
                                    mt-2 px-4">
        <CardHeader
            item={workItem}
            role={role}
            action_supervisor={action_supervisor}
            action_view={action_view}
            action_delete={action_delete}
        />

        <CardBody item={workItem} role={role} action_update_resource={action_update_resource}
                  action_update_helpers={action_update_helpers}/>
        <CardFooter item={workItem} role={role} action_update={action_update}/>

    </div>)
};

const CardHeader = ({item, role, action_view, action_delete}) => (<div className="flex items-center relative w-full">
    {item?.status && (<FontAwesomeIcon
        onClick={action_view}
        className={`cursor-pointer text-gray-400 bg-gray-700 bg-opacity-10 p-2 rounded-full absolute ${role === 'S' ? 'right-8' : 'right-0'} top-0`}
        size="2xs" icon={faEye}
    />)}
    {(role === 'B' || role === 'P') && (<FontAwesomeIcon
        onClick={() => action_delete}
        className={`cursor-pointer text-red-400 bg-red-700 bg-opacity-10 p-2 rounded-full absolute ${role === 'S' ? 'right-16' : 'right-8'}  top-0`}
        size="2xs" icon={faTrash}
    />)}
    <FontAwesomeIcon
        className="text-gray-500 bg-gray-700 bg-opacity-10 p-2 rounded-full"
        size="lg" icon={faUser}
    />
    <div className="ml-2">
        <p className="text-gray-400 font-semibold text-xs">{item?.technical_name}</p>
        <div className="flex items-center">
            <span className="text-gray-400 font-light text-[8px]">{formatDate(item?.date_start)}</span>
            {item?.status && (<span
                className="text-gray-400 font-light text-[8px] ml-2">S/ {Humanize.formatNumber(item?.cost, 2)}</span>)}
        </div>
    </div>
</div>);

const CardBody = ({item, role, action_update_resource, action_update_helpers}) => (<>
    <div
        className={`${item?.validated ? 'bg-blue-400 text-blue-400 w-full' : 'bg-yellow-400 text-yellow-400 w-10/12'} h-2 mt-2 rounded-xl text-end`}>
        <p className="p-2 text-xs -mt-0.5">{item?.validated ? "100%" : "80%"}</p>
    </div>
    <div className="text-black text-xs flex gap-2 mt-2 hover:text-gray-600 items-center font-bold">
        {(role === "P" || role === "B" || role === "T") && (<div className="flex gap-2">
            <WrenchIcon className={`w-4 h-4 cursor-pointer hover:text-blue-400`} onClick={action_update_resource}/>
        </div>)}

        {size(item?.helpers) > 0 ? (map(item?.helpers, (helper, index) => (<UserIcon
            key={index}
            title={helper?.helper?.first_name}
            onClick={action_update_helpers}
            className="w-4 h-4 cursor-pointer hover:text-blue-400"
        />))) : (<UserPlusIcon
            onClick={action_update_helpers}
            className="w-4 h-4 cursor-pointer hover:text-blue-400"
        />)}

        <ReactStars
            value={item?.criticality === 'Baja' ? 1 : item?.criticality === 'Media' ? 2 : 3}
            count={3}
            size={20}
            edit={false}
            activeColor="#5F9CF4"
        />
        <span>{item?.physical_name}</span>
    </div>
</>);


const CardFooter = ({item, role, action_update}) => (<div className="flex flex-row justify-between w-full mt-2">
    <p className="text-xs text-center text-normal text-black cursor-pointer flex items-center gap-1"
       onClick={action_update}>
        {item?.code_ot}
        {item?.status && (<>
            <ClockIcon className="w-4 h-4 text-gray-400"/>
            <span className="text-xs font-extralight">{item?.time}</span>
        </>)}
    </p>
    <div className="flex items-center justify-center">
        <FontAwesomeIcon className="text-blue-500 p-2 rounded-full" size="2xs" icon={faCircle}/>
        <span className="text-xs font-light text-blue-400 text-end">{item?.type_name}</span>
    </div>
</div>);

export default Card;
