import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Filter from "../../components/Assets/Filter";
import {faTools} from "@fortawesome/free-solid-svg-icons";
import {Disclosure, Transition} from "@headlessui/react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {MapPinIcon, WrenchScrewdriverIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {get_tree} from "../../redux/actions/assets";
import Modal from "../../components/util/Modal";
import FormFacilities from "../../components/Assets/FormFacilities";
import FormTools from "../../components/Assets/FormTools";
import FormEquipments from "../../components/Assets/FormEquipments";
import ModalHook from "../../components/util/hooks";
import ButtonAdd from "../../components/util/ButtonAdd";
import Header from "../../components/navigation/Header";

const Assets = () => {

    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const dispatch = useDispatch();
    const tree = useSelector(state => state.Assets.tree);
    const [isOpenPage, setIsOpenPage] = useState(true);

    useEffect(() => {
        dispatch(get_tree());
    }, [dispatch]);

    const handleAdd = (FormComponent) => {
        setIsOpen(true);
        setContent(<FormComponent close={openModal}/>);
    };

    const togglePage = () => setIsOpenPage(prev => !prev);


    return (<Layout>
        {isOpenPage && (<ButtonAdd>
            <AddButton icon={MapPinIcon} onClick={() => handleAdd(FormFacilities)}/>
            <AddButton icon={WrenchScrewdriverIcon} onClick={() => {
                togglePage();
                handleAdd(FormEquipments);
            }}/>
            <AddButton icon={faTools} onClick={() => handleAdd(FormTools)}/>
        </ButtonAdd>)}

        <Modal isOpen={isOpen} close={openModal}>{content}</Modal>
        {isOpenPage ? (<div className="h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl">
            <Header/>
            <Filter/>
            {tree && tree.map((i, index) => (<Disclosure key={index} as="div">
                {({open}) => (<>
                    <DisclosureButton open={open} item={i}/>
                    <DisclosurePanel open={open} children={i?.children} parentName={i?.name}/>
                </>)}
            </Disclosure>))}
        </div>) : content}

    </Layout>);
};

const AddButton = ({icon: Icon, onClick}) => (<button onClick={onClick} type="button"
                                                      className="text-xs space-x-4 bg-white rounded-full mt-2 flex items-center p-2 justify-around font-light hover:bg-opacity-10 hover:rounded-full hover:bg-[#5f9cf4]">
    <Icon className="h-5 w-5 text-gray-400"/>
</button>);

const DisclosureButton = ({open, item}) => (<Disclosure.Button
    className="flex w-full mt-4 justify-start gap-2 border-b-2 items-center bg-white px-4 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
    {item?.children?.length > 0 && (open ?
        <MinusIcon className="h-6 w-6 bg-gray-400 text-blue-400 bg-opacity-20 rounded-full hover:bg-white"/> :
        <PlusIcon className="h-6 w-6 bg-gray-400 text-blue-400 bg-opacity-20 rounded-full hover:bg-white"/>)}
    <MapPinIcon className="h-5 w-5 text-blue-500"/>
    <p>
        <span className="font-normal font-sans text-xs">{item?.name}</span>
        <br/>
        <span className="font-normal text-gray-400 font-sans text-[10px]">{"// GREENBOX/"}</span>
    </p>
</Disclosure.Button>);

const DisclosurePanel = ({open, children, parentName}) => (<Transition
    show={open}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
>
    {children.map((j, index) => (<Disclosure.Panel key={index}
                                                   className="flex w-full justify-start gap-2 border-b-2 items-center bg-white pl-16 py-2 text-left text-sm font-medium text-black hover:bg-blue-600 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <WrenchScrewdriverIcon className="h-5 w-5 text-blue-500"/>
        <p>
            <span className="font-normal font-sans text-xs">{j.name}</span>
            <br/>
            <span className="font-normal text-gray-400 font-sans text-[10px]">// GREENBOX/ {parentName}/</span>
        </p>
    </Disclosure.Panel>))}
</Transition>);

export default Assets;
