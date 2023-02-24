import React, {useEffect, useState} from 'react';
import Layout from "../../hocs/Layout";
import Table from "../../components/store/Table";
import SearchBar from "../../helpers/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {get_articles} from "../../redux/actions/store";
import SetPagination from "../../components/util/Pagination";

const Store = () => {
    const articles = useSelector(state => state.Store.articles)
    const count = useSelector(state => state.Store.count)
    const dispatch = useDispatch()
    const [params, setParams] = useState({name: ''});

    useEffect(() => {
        dispatch(get_articles(params))
    }, []);


    return (<Layout>
        <div className={"py-2 relative h-screen overflow-y-auto scrollbar-hide w-full"}>
            <SearchBar setParams={setParams} action={get_articles}/>
            <Table data={articles}/>
            <SetPagination data={articles} params={params} count={count} get_data_page={get_articles} />
        </div>
    </Layout>);
};

export default Store;
