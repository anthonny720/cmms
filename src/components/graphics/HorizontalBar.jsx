import React from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const HorizontalBar = ({labels, data, title, background}) => {

    return <div className=''>
        <h1 className='title text-center font-light text-gray-500'>{title}</h1>
        <Bar options={{
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                }
            }
        }}

             data={{
                 labels: labels, datasets: [{
                     data: data, backgroundColor: background ? background : [], hoverOffset: 4,
                 }]
             }}/>
    </div>

}
