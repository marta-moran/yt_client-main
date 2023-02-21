import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import youtubeService from "../../services/youtube.service"
import Chart from 'chart.js/auto'

function Dashboard() {
    const { id } = useParams()
    const [stats, setStats] = useState(null)
    const chartRef = useRef(null)

    useEffect(() => {
        youtubeService.getChannelStats(id)
            .then(stats => setStats(stats.items[0].statistics))
    }, [])

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d')
            let myChart = null
            if (ctx.chart) {
                myChart = ctx.chart
                myChart.destroy()
            }
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["subscribers count", "video count", "view count"],
                    datasets: [{
                        label: 'Channel Statistics',
                        data: [stats?.subscriberCount, stats?.videoCount, stats?.viewCount],
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            type: "logarithmic",
                            beginAtZero: true,
                        },
                    },
                },
            });
            ctx.chart = myChart;
        }
    }, [stats])

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    )
}

export default Dashboard