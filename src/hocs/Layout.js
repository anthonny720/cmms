import React, {memo, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from "react-redux";
import {check_authenticated, load_user, refresh} from "../redux/actions/auth";
import Sidebar from "../components/navigation/Sidebar";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Footer} from "../components/navigation/Footer";

export const Layout = memo((props) => {
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refresh())
        dispatch(check_authenticated())
        dispatch(load_user())
    }, []);


    if (!isAuthenticated) return <Navigate to='/signin/'/>;

    return (<div className={"bg-[#4687f1]"}>
            <Helmet>
                <title>Greenbox - MM</title>
                <meta name="description" content="Site created by Anthonny Gómez"/>
            </Helmet>
            <section className="flex h-screen w-full ">
                <Sidebar/>

                {props.children}
            </section>
            <Footer/>

        </div>


    );
}
);
export default Layout;
