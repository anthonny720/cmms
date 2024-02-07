import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get_articles} from "../../redux/actions/store";
import SearchBar from "../../helpers/SearchBar";
import {map} from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {add_resource_ot, delete_resource_ot} from "../../redux/actions/management";
import {TrashIcon} from "@heroicons/react/20/solid";
import HeaderForm from "../util/HeaderForm";


const FormResourcesOrder = ({id, close, params}) => {
    const articles = useSelector(state => state.Store.articles);
    const work = useSelector(state => state.Management.works.find(item => item.id === id));

    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(get_articles(filter));
    }, [filter, dispatch]);

    const handleSubmit = (articleId) => {
        dispatch(add_resource_ot({article: articleId}, id, params));
    };
    const handleDelete = (resourceId) => {
        dispatch(delete_resource_ot(resourceId, params));
    };

    const columns = ['', 'Artículo', 'Cantidad', 'Precio'];
    return (<div className="bg-white px-2 pb-8 mb-4">
        <HeaderForm close={close}/>
        <SearchBar setParams={setFilter}/>

        <div className={"h-40 overflow-y-auto scrollbar-hide"}>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-white">
                <tr>
                    {columns.map((column, index) => (<th key={index} className="px-6 py-3">{column}</th>))}
                </tr>
                </thead>
                <tbody>
                {work?.resources_used ? map(work.resources_used, (row, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-blue-100">
                        <td className="px-6 py-4 text-center">
                            <TrashIcon onClick={() => handleDelete(row.id)}
                                       className="text-red-500 cursor-pointer w-5 h-5"/>
                        </td>
                        <td className="px-6 py-4">{row.name}</td>
                        <td className="px-6 py-4">{row.quantity}</td>
                        <td className="px-6 py-4">{row.price}</td>
                    </tr>)) : (<tr>
                    {map(columns, (_, index) => (<td key={index} className="py-4 px-6 text-center mt-4">
                        <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                        <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                        <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                        <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                        <div className="h-2 bg-gray-300 rounded animate-pulse mt-4"></div>
                    </td>))}
                </tr>)}
                </tbody>
            </table>
            <div className="mt-4 overflow-y-auto">
                {map(articles, (article, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-blue-50">
                        <span className="text-xs">{article.description}</span>
                        <FontAwesomeIcon icon={faPlusCircle} onClick={() => handleSubmit(article.id)}
                                         className="text-green-500 cursor-pointer"/>
                    </div>))}
            </div>
        </div>
    </div>);
};


export default FormResourcesOrder;
