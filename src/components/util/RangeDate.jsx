import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';


const RangeDate = ({onChange, value, w}) => {
    return (<DateRangePicker
            className={`z-[100] rounded-2xl bg-white ${w ? 'w-full' : 'w-max'} text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-blue-400`}
            calendarClassName={"border-1"} onChange={onChange} value={value}/>

    )
};
export default RangeDate;
