import React, { FunctionComponent, useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

const PropertiesBarChart = () => {
    const canvasElement = useRef(null);
    Chart.register(...registerables);

    let chart = null;
    const labels = ["January", "February"]
    const data = {
        labels: labels,
        datasets: [{
            label: 'Properties Added',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const chartConfig = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    useEffect(() => {
        if (canvasElement) {
            //@ts-ignore
            chart = new Chart(canvasElement.current, chartConfig)
        }
    }, [])

    return (
        <div>
            <canvas ref={canvasElement} id="propertiesBarChart" >
            </canvas>
        </div>
    )
}

export default PropertiesBarChart;
