import React, { FunctionComponent, useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

type UserPieChartProps = {
    adminUsers: number,
    basicUsers: number
}

const UsersPieChart: FunctionComponent<UserPieChartProps> = ({ adminUsers, basicUsers }) => {
    const canvasElement = useRef(null);
    Chart.register(...registerables);

    let chart = null;
    const data = {
        labels: [
            'Admins',
            'Basic'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [adminUsers, basicUsers],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
        }]
    };

    const chartConfig = {
        type: 'pie',
        data: data
    };

    useEffect(() => {
        if (canvasElement) {
            //@ts-ignore
            chart = new Chart(canvasElement.current, chartConfig)
        }
    }, [])

    return (
        <div>
            Utilizatori inregistrati {adminUsers + basicUsers}
            <canvas ref={canvasElement} id="userPieChart" >
            </canvas>
        </div>
    )
}

export default UsersPieChart;
