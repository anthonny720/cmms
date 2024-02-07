import {Popover, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLayerGroup, faLocationDot, faTools, faTruck} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import Assets from "../../containers/pages/Assets";
import Facilities from "./Facilities";
import Equipments from "./Equipments";
import Tools from "./Tools";


export default function Filter() {
    const page = window.location.pathname.split('/')[2]
    const [title, setTitle] = useState({name: 'Todos los activos', icon: faLayerGroup, page: <Assets/>})

    const switchPage = (page) => {
        switch (page) {
            case 'tree':
                setTitle({name: 'Todos los activos', icon: faLayerGroup, page: <Assets/>})
                break;
            case 'facilities':
                setTitle({name: 'Ubicaciones', icon: faLocationDot, page: <Facilities/>})
                break;
            case 'equipments':
                setTitle({name: 'Equipos', icon: faTruck, page: <Equipments/>})
                break;
            case 'tools':
                setTitle({name: 'Herramientas', icon: faTools, page: <Tools/>})
                break;
            default:
                setTitle({name: 'Todos los activos', icon: faLayerGroup, page: <Assets/>})

        }
    }
    useEffect(() => {
        switchPage(page)
    }, []);


    const list = [
        {
            name: 'Todos los activos',
            description: '',
            href: '/inventories/tree',
            icon: faLayerGroup,
            page: <Assets/>
        }, {
            name: 'Ubicaciones',
            href: '/inventories/facilities',
            icon: faLocationDot,
            page: <Facilities/>
        },
        {
            name: 'Equipos',
            href: '/inventories/equipments',
            icon: faTruck,
            page: <Equipments/>
        },
        {
            name: 'Herramientas',
            href: '/inventories/tools',
            icon: faTools,
            page: <Tools/>
        }
    ]

    return (
        <div className="relative w-full max-w-sm px-4">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center space-x-2  rounded-xl bg-blue-500  px-3  text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <FontAwesomeIcon className={"text-white rounded-full"} size={"xs"} icon={title.icon}/>
                            <p className={"font-normal text-[10px] uppercase"}>{title.name} ▼</p>
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
                                className="absolute z-10 w-max  transform  sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid  bg-white   ">
                                        {list.map((item) => (

                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className="space-x-4 p-2  text-xs flex items-center py-2  justify-start font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"
                                            >

                                                <FontAwesomeIcon className={"text-blue-400 bg-white rounded-full"}
                                                                 icon={item.icon} size={"1x"}/>

                                                <div className={"flex flex-col justify-start"}>
                                                    <p className={"text-black font-normal"}> {item.name}</p>
                                                </div>

                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )


}

