import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

function Header() {

    const [displayMenu, setDisplayMenu] = useState(false)
    const handleDisplayMenu = () => {

        setDisplayMenu(prev => prev = !prev)
    }

    const { userData } = useSelector(state => state.auth)

    const navigate = useNavigate()
    const handleLogout = async () => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {

            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.ok) {

            localStorage.removeItem("token")
            toast.success("logout successfully")
            navigate("/")
        }
    }
    // const login = true

    const login = localStorage.getItem("token")

    const [displayDropdown, setDisplayDropdown] = useState(false)

    return (
        <header className='flex justify-around items-center p-4 py-6 sticky top-0 z-20 bg-white border-b-4 max-lg:justify-between max-md:px-8'>

            <div className='flex gap-1 items-center'>
                <img src={assets.logo} alt="" width={35} />
                <span className='text-3xl font-bold'>TruncURL</span>
            </div>
            <ul className='flex max-lg:hidden justify-center items-center gap-10 text-xl font-semibold'>

                <a href="/home"><li className='font-semibold text-xl'>Home</li></a>
                <a href="/about"><li className='font-semibold text-xl'>About Us</li></a>
                <a href="/contact-us"><li className='font-semibold text-xl'>Contact Us</li></a>

            </ul>

            {
                login ? <div>
                    <div className='flex max-lg:hidden items-center justify-center gap-6'>

                        <div>
                            <button onClick={handleLogout} className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-black hover:text-white hover:border-white'>logout</button>
                        </div>

                        <div className='flex items-center gap-2'>

                            <img src={assets.user} alt="" width={40} />

                            <img onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='hover:scale-105' src={assets.downarrow} alt="" width={25} height={40} />
                        </div>
                        {
                            displayDropdown &&
                            <div onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='absolute top-12 bg-gray-300 right-2 border-2 border-gray-300 rounded-xl p-4'>
                                
                                <a href="/dashboard"><div className='font-semibold hover:bg-black py-2 px-4 rounded-lg hover:text-white'>DashBoard</div></a>
                            </div>
                        }
                    </div>

                    {
                        displayMenu ? (

                            <div className='flex flex-col gap-8 items-center absolute top-0 right-0 w-[80vw] bg-gray-300 h-[100vh]'>

                                <div className='flex justify-end px-6 py-2 '>
                                    <img className='' onClick={handleDisplayMenu} src={assets.close} alt="" width={45} />
                                </div>

                                <ul className='flex flex-col items-center gap-10 text-xl font-semibold'>

                                    <a href="/home"><li className='font-semibold text-xl'>Home</li></a>
                                    <a href="/about"><li className='font-semibold text-xl'>About Us</li></a>
                                    <a href="/contact-us"><li className='font-semibold text-xl'>Contact Us</li></a>

                                </ul>

                                <div>
                                    <button onClick={handleLogout} className='font-semibold hover:scale-105 border-2 border-black text-lg rounded-xl px-3 py-1 hover:bg-black hover:text-white hover:border-white'>logout</button>
                                </div>

                                <div className='flex gap-1 items-center relative'>
                                    <div className='flex items-center gap-2'>

                                        <img src={assets.user} alt="" width={40} />

                                        <img onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='hover:scale-105' src={assets.downarrow} alt="" width={25} height={40} />
                                    </div>
                                    {
                                        displayDropdown &&
                                        <div onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='absolute top-14 bg-gray-500 border-2 border-gray-300 rounded-xl p-4'>
                                            
                                            <a href="/dashboard"><div className='font-semibold hover:bg-black py-2 px-4 rounded-lg hover:text-white'>DashBoard</div></a>
                                        </div>
                                    }
                                </div>

                            </div>
                        ) : (
                            <div className='lg:hidden my-auto flex'>
                                <img onClick={handleDisplayMenu} src={assets.menu} alt="" width={30} />
                            </div>
                        )
                    }

                </div> :

                    <>
                        <div className='flex items-center justify-center gap-4 max-lg:hidden '>

                            <a href="/sign-in">
                                <button className='border-2 font-semibold border-black  rounded-md px-3 hover:bg-black hover:text-white py-1'>Sign In</button>
                            </a>

                        </div>

                        {
                            displayMenu ? (

                                <div className=' absolute top-0 right-0 w-[80vw] bg-gray-300  h-[100vh]'>

                                    <div className='flex justify-end px-6 py-2'>
                                        <img className='' onClick={handleDisplayMenu} src={assets.close} alt="" width={45} />
                                    </div>

                                    <ul className='flex flex-col items-center gap-10 text-xl font-semibold'>

                                        <a href="/home"><li className='font-semibold text-xl'>Home</li></a>
                                        <a href="/about"><li className='font-semibold text-xl'>About Us</li></a>
                                        <a href="/contact-us"><li className='font-semibold text-xl'>Contact Us</li></a>


                                    </ul>
                                    <div className='flex flex-col items-center gap-8  my-6'>

                                        <a href="/sign-in">
                                            <button className='border-2 font-semibold border-black  rounded-md px-3 hover:bg-black hover:text-white py-1'>Sign In</button>
                                        </a>

                                    </div>
                                </div>
                            ) : (
                                <div className='lg:hidden my-auto'>
                                    <img onClick={handleDisplayMenu} src={assets.menu} alt="" width={30} />
                                </div>
                            )
                        }
                    </>
            }

        </header >
    )
}

export default Header