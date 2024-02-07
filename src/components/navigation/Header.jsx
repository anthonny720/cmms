import React from 'react';
import PopoverMe from "./Profile";

const Header = () => {
    return (<div
            className="bg-[#4687f1] bg-opacity-90 w-full mb-2  text-white  z-[100] rounded-xl flex items-center justify-around px-4">

            {/* Currency selector */}
            <form className="hidden lg:block lg:flex-1 ">
                <div className="flex items-center">
                    <span
                        className=' text-xs font-light'>+51 982 704 759</span>
                    <span className="h-6 w-px bg-white dark:bg-dark-third mx-2" aria-hidden="true"/>
                    <span
                        className=' text-xs font-normal'>data.analyst@greenbox.pe</span>
                </div>
            </form>

            <div className="text-center text-sm font-gilroy-medium text-white z-[100]">
                <PopoverMe/>
            </div>

        </div>

    );
};

export default Header;
