import { original } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const Dashboard = () => {

    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState([])

    const totalurls = url.length

    useEffect(() => {

        (async () => {

            setLoading(true)
            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/urls/get-all-url`, {

                    method: "GET",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },

                })

                if (response.ok) {

                    setLoading(false)
                    const res = await response.json()
                    console.log(res);
                    setUrl(res.data)
                }

            } catch (error) {
                setLoading(false)
                console.log("error while shortning the url", error)
            }
        })()

    }, [])

    // Assign colors dynamically
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28'];

    // Prepare chart data with colors
    const chartData = url.map((item, index) => ({
        name: item.shortUrl,
        clickCount: item.viewHistory?.length,
        fill: colors[index % colors.length],
    }));

    const deviceData = [
        { device: "Mobile", count: 140 },
        { device: "Desktop", count: 90 },
        { device: "Tablet", count: 50 },
        { device: "Other", count: 10 },
    ];

    const DevicechartUrl = url.map((item, index) => ({
        name: item.viewHistory?.[0]?.device || "Unknown",
        clickCount: item.viewHistory?.length || 0,
        fill: colors[index % colors.length],
    }));


    return (
        <div className='min-h-[87vh] pb-10'>

            {
                url.length == 0 ? <div className='flex items-center justify-center'>
                    <div className='font-bold text-4xl py-10'>No Urls Found</div>
                </div> :
                    <div>
                        <div className='flex mt-6 items-center rounded-b-none justify-between w-[92vw] rounded-xl mx-auto py-10 bg-gray-800 text-white px-8'>

                            <p className='font-semibold text-2xl'>Dashboard</p>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-xl font-semibold'>Total Urls :</h1>
                                <div className='text-xl font-semibold'>{totalurls}</div>
                            </div>

                        </div>

                        <div className='flex max-lg:flex-col max-lg:gap-10 max-lg:text-center items-center justify-center gap-24 border-2 border-t-0 rounded-t-none border-gray-500 w-[92vw] rounded-xl mx-auto py-10 px-8'>

                            <div className='flex gap-6 flex-col justify-center'>
                                <h2 className='text-lg font-bold'>Original Url</h2>
                                {

                                    url.map((currenturl, index) => (

                                        <div key={index}>

                                            <div className='text-lg '>{currenturl.redirectURL}</div>
                                        </div>

                                    ))
                                }
                            </div>
                            <div className='flex gap-6 max-lg:text-center flex-col justify-center'>
                                <h2 className='text-lg font-bold'>Shornet Url</h2>
                                {

                                    url.map((currenturl, index) => (

                                        <div key={index}>

                                            <div className='text-lg '>{currenturl.shortUrl}</div>
                                        </div>

                                    ))
                                }
                            </div>

                            <div className='flex gap-6 flex-col justify-center items-center'>
                                <h2 className='text-lg font-bold'>Number of Visits</h2>
                                {
                                    url.map((currenturl, index) => (

                                        <div key={index}>

                                            <div className='text-lg '>{currenturl.viewHistory?.length}</div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='flex gap-6 flex-col justify-center items-center'>
                                <h2 className='text-lg font-bold'>Created Date</h2>
                                {
                                    url.map((currenturl, index) => (

                                        <div key={index}>

                                            <div className='text-lg '>{currenturl.createdAt?.slice(0, 10)}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="w-full h-[400px] bg-white rounded-2xl shadow-md p-4 mt-3 pb-6">
                            <h2 className="text-center text-2xl font-semibold mb-4">📊 URL Click Statistics</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} height={70} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="clickCount" barSize={40}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>


                        <div className="w-full max-w-3xl mt-12 mx-auto h-[400px] bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
                            <h2 className="text-center text-2xl font-semibold mb-6">📱 Device Click Statistics</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DevicechartUrl} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="clickCount" barSize={60}>
                                        {DevicechartUrl.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Dashboard