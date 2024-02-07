import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import {useDispatch, useSelector} from "react-redux";
import {get_articles, sync_store} from "../../redux/actions/store";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import SearchBar from "../../helpers/SearchBar";
import Table from "../../components/store/Table";
import Header from "../../components/navigation/Header";

const Store = () => {
    const loading = useSelector(state => state.Store.loading)
    const articles = useSelector(state => state.Store.articles)
    const dispatch = useDispatch()
    const [params, setParams] = useState({name: ''});

    useEffect(() => {
        dispatch(get_articles(params))
    }, [params]);

    const sync = () => {
        dispatch(sync_store())
    }


    return (<Layout>
        <ArrowPathIcon onClick={() => sync()}
                       className={`${loading && 'animate-spin'} text-white bg-green-400 bg-opacity-60 rounded-lg cursor-pointer absolute z-[200] top-16 right-4 h-8 w-8 flex items-center justify-center`}/>
        <div className={"h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl"}>
            <Header/>
            <SearchBar setParams={setParams}/>
            <div className={"w-full overflow-auto scrollbar-hide"}>
                <Table data={articles}/>
            </div>
        </div>
    </Layout>);
};

export default Store;
