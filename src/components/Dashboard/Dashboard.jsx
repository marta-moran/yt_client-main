import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import youtubeService from "../../services/youtube.service"
import Chart from 'chart.js/auto'
import './Dashboard.css'



function Dashboard() {
    const { id } = useParams()
    const [stats, setStats] = useState(null)
    const chartRef = useRef(null)
    const [channel, setChannel] = useState({ id: '', snippet: '' })

    useEffect(() => {
        youtubeService.getChannelStats(id)
            .then(stats => {
                console.log(stats)
                setStats(stats.items[0].statistics)
                setChannel(stats.items[0].snippet)
                // setChannel({ id: stats.items[0].id, snippet: stats.items[0].snippet })
            })
    }, [])

    console.log("wee", channel)

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
        <div className="statistics">
            {
                channel && stats && (
                    <>
                        <div>
                            <div className="dashboard-info">
                                <div>
                                    <img src={channel.thumbnails.default.url} alt={channel.title} />
                                </div>
                                <div>
                                    <h2>{channel.title}</h2>
                                    <h3>{channel.customUrl}</h3>
                                </div>
                            </div>

                            <p>{stats.subscriberCount} suscriptores</p>
                            <p>{stats.videoCount} vídeos</p>
                            <p>{stats.viewCount} visitas</p>
                        </div>
                        <canvas ref={chartRef} className="chart-canvas"></canvas>
                    </>
                )
            }
        </div>
    )
}

export default Dashboard