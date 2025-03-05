"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

function Page() {
    const [user, setuser] = useState({ 'UserName': '', 'Password': '' });
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        const param = {
            "data":{
              "UserName":user.UserName,
              "Password":user.Password
            }
          }

        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(param)
        }).then((res)=>{return res.json()}).then(async(res) => {
            const data = await res.Output
            console.log(data,'RESS')
            if(res.Output.status.code == 200){
                toast.success(res.Output.status.message)
                localStorage.setItem('userId', 1)
               router.push('/dashboard')
            }else{
                toast.warning(res.Output.status.message)
            }
        // toast.error('Error message');
        // toast.warning('Warning message');
        // toast.info('Info message');
        }).catch((err)=>{
            toast.warning(err.message);
        })

    };

    const handleChange = (e) => {
        setuser((pre) => ({
            ...pre, [e.target.name]: e.target.value
        }))
    }


    return (
        <div className="w-full min-h-screen flex justify-center items-center px-4 sm:px-6 ParentBg">
            <div className="w-full h-auto bg-white sm:bg-gray-100 sm:shadow-lg sm:rounded-lg sm:p-6 max-w-sm sm:max-w-md">
                {/* Logo Section */}
                <div className="w-full flex justify-center mb-6 mt-6 sm:mt-0">
                    <Image
                        src="/images/BrandLogo.jpg"
                        alt="Brand Logo"
                        width={170}
                        height={0}
                        className="w-[120px] sm:w-[140px] md:w-[170px]"
                    />
                </div>

                {/* Login Heading */}
                <h1 className="text-xl font-bold text-center mb-6">Login to your Account</h1>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6 px-4 sm:px-0 mb-[20px]">
                    {/* Username Input */}
                    <div className="relative">
                        <input
                            id="username"
                            type="text"
                            required
                            placeholder="UserName"
                            name="UserName"
                            value={user.UserName}
                            onChange={(e) => { handleChange(e) }}
                            className="peer w-full border border-gray-300 rounded-md px-3 pt-2 pb-2 outline-none focus:border-[#38a3a5] focus:ring-1 focus:ring-[#38a3a5]"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="password"
                            value={user.Password}
                            name="Password"
                            onChange={(e) => { handleChange(e) }}
                            className="peer w-full border border-gray-300 rounded-md px-3 pt-2 pb-2 outline-none focus:border-[#38a3a5] focus:ring-1 focus:ring-[#38a3a5]"
                        />
                    </div>

                    {/* Forgot Password / Signup */}
                    <div className="text-right">
                        <p className="underline text-sky-500 cursor-pointer text-sm">Forgot passord?</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="w-full  h-10 rounded-lg text-white font-medium bg-[#38a3a5] hover:bg-[#2c7c7d] transition"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;
