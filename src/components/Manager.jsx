import React from 'react'
import { useRef } from 'react'

function Manager() {
    const ToggleEye = useRef();
    const TogglePass = useRef();
    const ShowPassword = () => {
        if (TogglePass.current.type == "password") {
            ToggleEye.current.src = "src/assets/hide_pass.svg";
            TogglePass.current.type = "text";
            ToggleEye.current.alt = "Show Password";
        } else {
            ToggleEye.current.src = "src/assets/show_pass.svg";
            TogglePass.current.type = "password";
            ToggleEye.current.alt = "Hide Password";
        }
    }

    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

            <div className='my-8 container mx-auto w-5xl bg-cyan-200 rounded p-0.5'>

                <div className="text-white flex flex-col gap-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 rounded">

                    <div className="logo flex justify-center text-cyan-400 text-4xl font-bold -mb-5">
                        <span className='mx-2 text-cyan-200'>&lt;/</span>
                        <span className='text-cyan-600'>Key</span>
                        <span className='text-cyan-400'>Vault</span>
                        <span className='mx-2 text-cyan-200'>/&gt;</span>
                    </div>
                    <div className="subheading text-center text-gray-300 text-lg font-medium">
                        <span>Your own password manager</span>
                    </div>
                    <input className='px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 ' type="text" name='' id='' placeholder='Enter website URL' />

                    <div className="flex gap-4">
                        <input className='w-full px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300' type="text" name="" id="" placeholder='Enter Username' />
                        <div className='w-2/3 relative'>


                            <input ref={TogglePass} className='w-full px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300' type="password" name="" id="" placeholder='Enter Password' />

                            <span className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200' title="Show or Hide Password" onClick={ShowPassword} >
                                <img ref={ToggleEye} src="src/assets/show_pass.svg" alt="Show Password" />
                            </span>

                        </div>
                    </div>
                    <div className="button flex justify-center">
                        <button className='flex justify-center gap-3 w-2/5 hover:cursor-pointer  bg-gradient-to-r from-cyan-500 to-cyan-600 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded rounded-4xl' type="submit">

                            Add Password
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-copy-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-4.333 4a1 1 0 0 0 -1 1v2h-2a1 1 0 0 0 -.993 .883l-.007 .117a1 1 0 0 0 1 1h2v2a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-2h2a1 1 0 0 0 .993 -.883l.007 -.117a1 1 0 0 0 -1 -1h-2v-2a1 1 0 0 0 -.883 -.993zm1 -8c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
