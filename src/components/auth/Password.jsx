import React from 'react';

import background from "../../assets/student-time-management.svg";
import Layout from "../../hocs/Layout";
import ChangePasswordForm from "../../containers/auth/FormPassword";

const ChangePassword = () => {
    return (<Layout>
        <div className={"h-full overflow-y-auto scrollbar-hide w-full bg-white p-4 rounded-l-2xl"}>
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Cambia tu contraseña</h3>
                        </div>
                        <ChangePasswordForm/>
                    </div>
                    <div
                        className="w-full h-auto bg-transparent hidden lg:block lg:w-1/2 skew-y-12 bg-cover bg-center rounded-l-lg"
                        style={{backgroundImage: `url(${background})`}}>
                    </div>
                </div>
            </div>
        </div>
    </Layout>);
};
export default ChangePassword;
