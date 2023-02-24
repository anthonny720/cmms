import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {
    get_graphics_cost_day,
    get_graphics_equipment,
    get_graphics_facilities,
    get_graphics_failure,
    get_graphics_indicators,
    get_graphics_personnel,
    get_graphics_total_cost,
    get_graphics_total_ot,
    get_graphics_type,
    get_total_ot
} from "../../redux/actions/graphics";
import {useDispatch} from "react-redux";
import Filter from "../../components/graphics/Filter";
import KPI from "../../components/graphics/KPI";
import Cost from "../../components/graphics/Cost";
import {enGB} from 'date-fns/locale'
import 'react-nice-dates/build/style.css'
import {DateRangePicker} from "react-nice-dates";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
//...
const BusinessIntelligence = () => {
    const dispatch = useDispatch();
    const [openPage, setOpenPage] = useState(true);

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleSubmit = () => {
        startDate !== '' && endDate !== '' &&
        dispatch(get_graphics_failure({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_failure({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_type({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_personnel({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_equipment({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_total_ot({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_facilities({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_indicators({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_cost_day({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_graphics_total_cost({'date_start': startDate, 'date_end': endDate})) &&
        dispatch(get_total_ot({'date_start': startDate, 'date_end': endDate}))
    }

    useEffect(() => {
        dispatch(get_graphics_failure())
        dispatch(get_graphics_type())
        dispatch(get_graphics_personnel())
        dispatch(get_graphics_equipment())
        dispatch(get_graphics_total_ot())
        dispatch(get_graphics_facilities())
        dispatch(get_graphics_indicators())
        dispatch(get_graphics_cost_day())
        dispatch(get_graphics_total_cost())
        dispatch(get_total_ot())
    }, []);


    return (<Layout>
        <div className={"bg-white w-full  rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide  "}>
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                minimumLength={1}
                format='yyyy-MM-dd'
                locale={enGB}

            >
                {({startDateInputProps, endDateInputProps, focus}) => (
                    <div className='date-range text-gray-400 w-max  rounded-lg flex space-x-1 items-center'>
                        <input
                            className={'text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs' + (focus === "START_DATE" ? ' -focused' : '')}
                            {...startDateInputProps}
                            placeholder='Start date'
                        />
                        <span className='date-range_arrow'/>
                        <input
                            className={'text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs' + (focus === "END_DATE" ? ' -focused' : '')}
                            {...endDateInputProps}
                            placeholder='End date'
                        />
                        <PaperAirplaneIcon onClick={handleSubmit}
                                           className={'h-12 w-12 text-gray-400 mt-4 hover:text-blue-400 cursor-pointer'}/>
                    </div>
                )}
            </DateRangePicker>
            <Filter setOpenPage={setOpenPage}/>
            {openPage ? <KPI/> : <Cost/>}
        </div>


    </Layout>);
};

export default BusinessIntelligence;
