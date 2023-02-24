import React from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
const StackedBar = ({labels, data, title}) => {


    return (
        <div className=''>
            <h1 className='title text-center font-light text-gray-500'>{title}</h1>
            <Bar data={{labels: labels, datasets: data}} />
        </div>

    )
}
export default StackedBar