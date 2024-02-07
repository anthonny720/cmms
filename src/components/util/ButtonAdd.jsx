import React, {Fragment} from 'react';
import {Popover, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

const ButtonAdd = (props) => {
    return (<button
        className={"absolute z-30 right-2 bottom-4 h-14 w-14 rounded-full bg-[#4687f1] text-lg"}>
        <Popover className="relative">
            {({open}) => (<>
                <Popover.Button
                    className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center space-x-2 p-2 rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <FontAwesomeIcon className={"text-white rounded-full"} icon={faPlusCircle}/>
                </Popover.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel
                        className="absolute bottom-1/2 z-10 mt-3 w-max  -translate-x-2/3 transform px-4 sm:px-0 lg:max-w-3xl">
                        <div
                            className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid  bg-white   ">
                                {props.children}
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </>)}
        </Popover>

    </button>);
};

export default ButtonAdd;
