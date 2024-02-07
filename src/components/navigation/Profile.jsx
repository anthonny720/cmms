import {Popover, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faRightFromBracket, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/auth";


export default function PopoverMe() {
    const user = useSelector(state => state.Auth.user);
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false);


    const list = [
        {
            name: 'Configuración',
            description: '',
            href: '/config',
            icon: faGear,
        }, {
            name: 'Cerrar sesión',
            href: '/signin',
            icon: faRightFromBracket,
        }
    ]
    const logoutHandler = () => {
        dispatch(logout())
        setRedirect(true);
    }
    if (redirect) {
        window.location.reload(false)
        return <Navigate to='/signin'/>;
    }
    return (
        <div className="relative w-full max-w-sm px-4">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center space-x-2 p-2 rounded-md bg-[#5f9cf4] bg-opacity-40 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <FontAwesomeIcon className={"text-blue-800 bg-white rounded-full"} icon={faUserCircle}/>
                            <p className={"font-light text-xs"}>{user?.first_name}</p>
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
                                className="absolute left-1/2 z-10 mt-3 w-max  -translate-x-2/3 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid  bg-white   ">
                                        <NavLink to={"/personnel/user"}
                                                 className={"text-xs space-x-4 border-b-2  flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"}>
                                            <FontAwesomeIcon className={"text-gray-400 bg-white rounded-full"}
                                                             size={"2x"} icon={faUserCircle}/>
                                            <div className={"flex flex-col justify-start"}>
                                                <p className={"text-black font-normal"}>{user?.first_name}</p>
                                                <p className={"text-gray-400 "}>Cambiar contraseña</p>
                                            </div>
                                        </NavLink>
                                        {list.map((item) => (

                                            <NavLink onClick={() => {
                                                item.name === "Cerrar sesión" && logoutHandler()
                                            }
                                            }
                                                     key={item.name}
                                                     to={item.href}
                                                     className="space-x-4  text-xs flex items-center py-2  justify-center font-light hover:bg-opacity-10 hover:rounded-lg hover:bg-[#5f9cf4]"
                                            >

                                                <FontAwesomeIcon className={"text-gray-400 bg-white rounded-full"}
                                                                 icon={item.icon} size={"1x"}/>

                                                <div className={"flex flex-col justify-start"}>
                                                    <p className={"text-black font-normal"}> {item.name}</p>
                                                    <p className={"text-gray-400"}>{item.description}</p>
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

