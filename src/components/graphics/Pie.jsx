import React from 'react';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({labels, data, title, background}) => {

    return (<div >
            <h1 className='title text-center font-light text-gray-500'>{title}</h1>
            <Pie data={{
                labels: labels, datasets: [{
                    data: data, backgroundColor: background ? background : [], hoverOffset: 4,
                }]
            }}/>
        </div>

    )
}
export default PieChart