import React from 'react';
import PopoverMe from "./Profile";

const Header = () => {
    return (<div className="bg-[#4687f1] w-full  z-[100] rounded-xl">
            <div
                className="max-w-full mx-auto h-11 px-4 flex items-center justify-around sm:px-6 lg:px-8 z-[100]">
                {/* Currency selector */}
                <form className="hidden lg:block lg:flex-1 ">
                    <div className="flex items-center">
                        <i className='bx bx-phone mt-0.5 mr-1 text-gray-500 dark:text-dark-txt'></i> <span
                        className=' text-xs font-gilroy-bold'>+51 982 704 759</span>
                        <span className="h-6 w-px bg-white dark:bg-dark-third mx-2" aria-hidden="true"/>
                        <i className='bx bxl-gmail mt-0.5 mr-1 text-gray-500 dark:text-dark-txt'></i> <span
                        className=' text-xs font-gilroy-bold'>anthonny720g@gmail.com</span>
                    </div>
                </form>

                <div className="text-center text-sm font-gilroy-medium text-white z-[100]">
                    <PopoverMe/>
                </div>

            </div>
        </div>

    );
};

export default Header;
