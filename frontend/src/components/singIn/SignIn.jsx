import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authentication.js'
import toast from 'react-hot-toast'

function Login() {

    const [userData, setUserData] = useState({ email: "", password: "" })

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, {

                method: "POST",
                credentials: "include",
                headers: {

                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userData),

            })

            if (response.ok) {

                const res = await response.json()
                localStorage.setItem("token", res.data.accessToken)
                setUserData({ email: "", password: "" })
                dispatch(login({ userData: res.data.accessToken }))
                setLoading(false)
                toast.success("login successfully")
                navigate("/")
            }
            else {

                setError(true)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error while uploading data on the  database", error)
            setLoading(false)
        }
    }

    const handleChange = (e) => {

        const id = e.target.id
        const value = e.target.value
        setUserData(prev => ({ ...prev, [id]: value }))
        setError(false)
    }

    return (
        <div className='p-4 bg-zinc-200 min-h-[85vh] flex items-center'>
            {

                !loading ?

                    <form onSubmit={handleSubmit} className='flex bg-white flex-col w-fit min-h-[60vh] mx-auto justify-center items-center gap-3 border-2 border-black rounded-lg px-5 py-5 max-md:min-h-[40vh]'>

                        <div>
                            <h1 className='text-2xl font-bold text-center'>Sign In</h1>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-2xl font-mono' htmlFor="email">Email</label>
                            <input className='border-2 border-gray-600 p-3 rounded-lg w-[30vw] outline-none max-lg:w-[38vw] max-md:w-[60vw] max-sm:w-[80vw]' id='email' type="email" value={userData.email} autoComplete='off' onChange={handleChange} placeholder='Enter your email' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-2xl font-mono' htmlFor='password'>Password</label>
                            <input className='border-2 border-gray-600 p-3 rounded-lg outline-none w-[30vw] max-lg:w-[38vw] max-md:w-[60vw] max-sm:w-[80vw]' id='password' type="password" value={userData.password} autoComplete='off' onChange={handleChange} placeholder='Enter your password' required />
                        </div>

                        {
                            error && <div className='text-red-500'>invalid email or password</div>
                        }

                        <div>
                            <button className='bg-blue-500 hover:scale-105 w-[30vw] text-white rounded-lg px-4 py-3 font-semibold max-lg:w-[38vw] max-md:w-[60vw] max-sm:w-[80vw]' type='submit'>Sign In</button>
                        </div>

                        <div className='flex text-[0.9em] max-lg:text-[0.75em]'>

                            <p className='mx-1'>I agree to the </p>
                            <a href="/" className='text-green-600 hover:text-orange-600 cursor-pointer'>terms and conditions

                            </a>
                            <p className='mx-1'>and</p>
                            <a href="/" className='text-green-600 hover:text-orange-600 cursor-pointer'> Privacy Policy.</a>

                        </div>

                        <div className='flex gap-1 items-center'>

                            <p>Don't have an account?</p>
                            <a href='/sign-up' className='text-blue-600 hover:underline font-sans cursor-pointer'>Sign Up</a>
                        </div>

                    </form>
                    :
                    <div role="status" className='flex justify-center text-center w-[100vw]'>
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>

            }
        </div>
    )
}

export default Login