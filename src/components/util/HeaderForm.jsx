import React from 'react';

const HeaderForm = ({submit, close}) => {
    return (<div className={"bg-white w-full "}>
        <div className={"flex justify-between w-full items-center"}>
            <button type={"button"} onClick={() => {
                close()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6 text-[#4687f1]">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                </svg>
            </button>

            {submit && <button type={"button"} onClick={() => {
                submit()
            }} className={"flex items-center space-x-2 bg-[#4687f1] bg-opacity-70 p-2 rounded-lg text-white"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>

                </svg>
                <span className={"text-xs"}>Guardar</span>
            </button>}


        </div>
        <hr className={"bg-gray-500 mt-2"}/>
    </div>);
};

export default HeaderForm;
