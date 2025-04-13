import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [url, setUrl] = useState("");

    const [loading, setLoading] = useState(false)

    const [responseURL, setResponseURL] = useState("")

    const [isShortedURl, setIsShortedURL] = useState(false)

    const navigate = useNavigate()

    const handleUrl = (e) => {

        setUrl(e.target.value)
    }

    const token = localStorage.getItem("token")

    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;
    const isValidUrl = (url) => urlRegex.test(url);

    const handleCopy = () => {
        navigator.clipboard.writeText(responseURL)
            .then(() => toast.success('Copied to clipboard!'))
            .catch(err => toast.error('Copy failed'));
    };

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!token) {

            toast.error("user not login")
            navigate("/sign-in")
        }

        else if (url.length == 0) {

            toast.error("please enter a url")
        }

        else if (isValidUrl(url)) {

            setLoading(true)
            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/urls/create-url`, {

                    method: "POST",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ url })
                })

                if (response.ok) {

                    setLoading(false)
                    const res = await response.json()
                    setResponseURL(res.data.shortUrl)
                    setIsShortedURL(true)
                    console.log(res);

                }

            } catch (error) {
                setLoading(false)
                console.log("error while shortning the url", error)
            }
        }
        else {

            toast.error("please enter a valid url")
        }
    }

    return (
        <div className='min-h-[87vh]'>
            <div className='flex justify-around mt-2 px-5 py-3 max-lg:flex-col max-lg:items-center max-lg:gap-8 '>

                <div className='font-bold text-6xl  font-sans w-[35vw] mt-8 max-lg:w-[90vw] max-lg:mt-3 max-md:mt-1 max-lg:text-5xl max-md:text-4xl max-sm:text-[1.7em] items-center '>
                    <h1 className='my-2 max-md:text-5xl'>All In One Tool For Your Links</h1>

                    <h1 className='font-thin text-4x max-sm:text-3xl max-lg:mb-3'>A Simple Link But a Powerfull Tool</h1>
                    <a className='max-lg:my-4' href="/">
                        <button className='bg-blue-500 rounded-full max-md:py-1 text-lg py-2 px-3 text-white hover:bg-blue-600'>check now</button>
                    </a>
                </div>

                <div className='w-[52vw] max-lg:w-[95vw] mt-2'>
                    <img className='rounded-lg max-lg:w-[90vw] max-lg:mx-auto ' src={assets.homeImage} alt="" width={720} />
                </div>
            </div>

            <div className='flex flex-col items-center gap-5 max-lg:flex-col max-lg:items-center bg-sky-800 mx-auto w-[92vw] rounded-xl py-12 mb-8'>

                <div className='flex max-lg:flex-col gap-3 items-center'>
                    <input type="text" value={url} onChange={handleUrl} placeholder='Enter Long Link Here' className='rounded-xl py-3 px-3 border-2 border-gray-500 w-[40vw] max-lg:w-[70vw] outline-none' />
                    {!loading ?
                        <button className='bg-blue-500 rounded-xl py-3 px-5 text-white font-semibold hover:bg-blue-600' onClick={handleSubmit}>shortnet url

                        </button>

                        :
                        <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Loading...
                        </button>
                    }
                </div>
                {

                    isShortedURl && <div className='flex gap-3 max-lg:flex-col'>

                        <input type="text" value={responseURL} placeholder='Enter Long Link Here' className='rounded-xl py-3 px-3 border-2 border-gray-500 w-[40vw] max-lg:w-[70vw] outline-none' readOnly />
                        <button className='bg-blue-500 max-lg:w-[35vw] max-lg:mx-auto rounded-xl py-3 px-5 text-white font-semibold hover:bg-blue-600' onClick={handleCopy}>copy

                        </button>
                    </div>

                }
            </div>

            <section class="pt-2 bg-gray-50 sm:pt-2 pb-8">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="text-center">
                        <p
                            class="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                            Simplify Your Links with Our Smart URL Shortener
                        </p>
                        <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
                            Shorten, manage, and track your URLs effortlessly. Our powerful tool helps you share cleaner links and get real-time analytics for every click.
                        </h1>
                        <div class="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                            <a href="/"
                                class="mb-3 sm:mb-0 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button">
                                Get Started
                            </a>
                            <a href="/"
                                class="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-gray-900 hover:text-white transition-all duration-200 bg-gray-100 border-2 border-gray-900 sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button">See Analytics</a>
                        </div>


                    </div>

                </div>
            </section>

        </div>
    )
}

export default Home

