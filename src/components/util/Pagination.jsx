import {useState} from 'react';
import {useDispatch} from "react-redux";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

function SetPagination({get_data_page, data, count, scroll, params}) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(1);
    const [listingsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);


    const previous_number = () => {
        scroll && window.scrollTo(0, 0);
        // window.scrollTo(0, 0);
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1);

            params ? dispatch(get_data_page(params, currentPage - 1)) : dispatch(get_data_page(currentPage - 1))

        }
    };

    const next_number = () => {
        scroll && window.scrollTo(0, 0);
        // window.scrollTo(0, 0);
        if (currentPage !== Math.ceil(data.length / 3)) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1);

            params ? dispatch(get_data_page(params, currentPage + 1)) : dispatch(get_data_page(currentPage + 1))

        }
    };

    let numbers = [];

    const getNumbers = () => {
        let itemsPerPage = listingsPerPage;
        let pageNumber = 1;

        for (let i = 0; i < count; i += itemsPerPage) {
            const page = pageNumber;
            let content = null;

            if (active === page) {
                content = (<div key={i} className={`hidden md:-mt-px md:flex`}>
                    <div
                        className=" text-white bg-black rounded-full justify-center border-t-2 py-2 px-4 inline-flex items-center text-sm font-medium">
                        {pageNumber}
                    </div>
                </div>);
            }

            numbers.push(content);
            pageNumber++;
        }

        return numbers;
    }

    return (<nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">

        <div className="-mt-px w-0 flex-1 flex">

            <button
                onClick={() => {
                    previous_number()
                }}
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-black hover:text-blue-500 hover:border-blue-300"
            >
                <ArrowLeftIcon className="mr-3 h-5 w-5 " aria-hidden="true"/>
                Anterior
            </button>
        </div>

        {getNumbers()}

        <div className="-mt-px w-0 flex-1 flex justify-end">
            <button
                onClick={() => {
                    next_number()
                }}
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-black hover:text-blue-500 hover:border-blue-300"
            >
                Siguiente
                <ArrowRightIcon className="ml-3 h-5 w-5 " aria-hidden="true"/>
            </button>
        </div>

    </nav>)
}

export default SetPagination