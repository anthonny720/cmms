import {toast, ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";


export const Footer = () => {
    const alert = useSelector(state => state.Alert);

    useEffect(() => {
        alert?.text && alert?.type && toast(alert.text, {

            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            type: alert.type
        });
    }, [alert]);
    return (<footer className="bg-white" aria-labelledby="footer-heading">
            <ToastContainer autoClose={5000}/>
        </footer>


    )
}