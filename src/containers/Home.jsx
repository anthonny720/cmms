import React, {useEffect} from 'react';
import Layout from "../hocs/Layout";
import KPI from "../components/graphics/KPI";
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
} from "../redux/actions/graphics";
import {useDispatch} from "react-redux";
import {get_physical} from "../redux/actions/assets";
import {get_failures, get_types} from "../redux/actions/config";

const Home = () => {
    const dispatch = useDispatch();
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
        dispatch(get_physical())
        dispatch(get_types())
        dispatch(get_failures())
    }, []);


    return (<Layout>
        <KPI/>
    </Layout>);
};

export default Home;
