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


    const DevicechartUrl = [];

    url.forEach((item) => {
        const shortUrl = item.shortUrl;

        item.viewHistory.forEach((view) => {
            const device = view.device || "Unknown";


            const key = `${device}-${shortUrl}`;
            const existing = DevicechartUrl.find((entry) => entry.key === key);

            if (existing) {
                existing.clickCount += 1;
            } else {
                DevicechartUrl.push({
                    name: device,
                    device,
                    url: shortUrl,
                    key,
                    clickCount: 1,
                    fill: colors[DevicechartUrl.length % colors.length],
                });
            }
        });
    });


    return (
        <div className='min-h-[87vh] pb-10 '>


            {
                loading ? <div role="status" className='flex justify-center py-10 text-center w-[100vw]'>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                    :
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
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-white p-3 shadow-md rounded-md text-sm text-gray-800">
                                                            <p><strong>Device:</strong> {data.device}</p>
                                                            <p><strong>Clicks:</strong> {data.clickCount}</p>
                                                            <p><strong>URL:</strong> {data.url}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
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