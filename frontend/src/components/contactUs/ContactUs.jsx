import React from "react";
import { assets } from "../../assets/assets";

function ContactUs() {

    return (

        <div className="w-6/7 m-auto flex justify-around my-8 min-h-[92vh] max-lg:flex-col-reverse max-lg:w-[90vw] max-lg:gap-4 ">

            <div className="border-2 border-gray-400 p-6 rounded-lg h-fit">

                <form action="#" className="flex flex-col gap-4 ">

                    <div className="flex items-center gap-2">
                        <label className="text-xl" htmlFor="fname">first Name</label>
                        <input className="px-2 border-3 outline-none bg-gray-200 py-2 rounded-lg" type="text" placeholder="Enter your first name" id="fname" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xl" htmlFor="lname">last Name</label>
                        <input className="px-2 border-3 outline-none bg-gray-200 py-2 rounded-lg" type="text" placeholder="Enter your last name" id="lname" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xl" htmlFor="email">email</label>
                        <input className="px-2 border-3 outline-none bg-gray-200 py-2 rounded-lg" type="email" placeholder="Enter your email" id="email" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xl" htmlFor="phonenumber">phone number</label>
                        <input className="px-2 border-3 outline-none bg-gray-200 py-2 rounded-lg" type="text" placeholder="phone number" id="phonenumber" />
                    </div>

                    <label className="text-xl" htmlFor="textarea">what can we help with you?</label>
                    <textarea className="px-1 outline-none bg-gray-200 py-2 rounded-lg" id="textarea" cols="4" rows="3"></textarea>

                    <button className="bg-blue-500 text-white rounded-lg py-2 hover:scale-[105%]">submit</button>
                </form>

            </div>

            <div className="text-center">

                <div className="text-4xl font-sans mb-10">Get in touch with us</div>

                <div>
                    <img  src={assets.contactUs} alt="contact us" width="550" />
                </div>

            </div>
        </div>
    )

}

export default ContactUs