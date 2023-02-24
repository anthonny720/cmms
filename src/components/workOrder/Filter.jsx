import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {enGB} from "date-fns/locale";
import {DatePicker} from "react-nice-dates"; // theme css file

export default function Filter({action_one, action_two, setParams}) {
    const [date, setDate] = useState();
    const dispatch = useDispatch()


    const handleSubmit = () => {
        const data = new FormData()
        data['date'] = date
        setParams(data)
        dispatch(action_one(data))
        dispatch(action_two(data))
    }
    return (<form className={"w-full flex"}>
        <div className={"px-8 py-2 w-full overflow-x-auto scrollbar-hide "}>
            <p className={`text-[10px]  font-extralight leading-none text-blue-400 relative`}>Fecha</p>

            <DatePicker
                date={date} onDateChange={setDate} locale={enGB}
                minimumLength={1}
                format='yyyy-MM-dd'

            >
                {({inputProps, focused}) => (
                    <div className='date-range text-gray-400 w-max  rounded-lg flex space-x-1 items-center'>
                        <input
                            className={'text-black w-full focus:border-blue-300 p-3 mt-4 border border-gray-300 rounded-lg outline-none focus:bg-gray-50 font-light text-xs'}
                            {...inputProps}
                        />
                        <span className='date-range_arrow'/>
                        <PaperAirplaneIcon onClick={handleSubmit}
                                           className={'h-12 w-12 text-gray-400 mt-4 hover:text-blue-400 cursor-pointer'}/>
                    </div>
                )}
            </DatePicker>

        </div>

    </form>)


}

