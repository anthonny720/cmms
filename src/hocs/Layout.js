import React, {useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import {Footer} from "../components/navigation/Footer";
import {useDispatch, useSelector} from "react-redux";
import {check_authenticated, load_user, refresh} from "../redux/actions/auth";
import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export const Layout = (props) => {
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refresh())
        dispatch(check_authenticated())
        dispatch(load_user())
    }, []);


    if (!isAuthenticated) return <Navigate to='/signin/'/>;

    return (<>
            <Helmet>
                <title>Greenbox - MM</title>
                <meta name="description" content="Site created by Anthonny Gómez"/>
            </Helmet>
            <section className="flex flex-row items-start  ">
                <Sidebar/>
                <div
                    className="relative m-3 text-xl text-gray-900 text-white font-semibold bg-gray-400 bg-opacity-10 rounded-xl h-screen  max-w-screen shadow-xl flex flex-col items-center w-full">
                    <Header/>
                    {props.children}

                </div>

            </section>
            <Footer/>

        </>


    );
};
export default Layout;
