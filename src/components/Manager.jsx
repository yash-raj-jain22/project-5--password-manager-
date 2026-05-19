import React from 'react'
import { useRef, useState, useEffect } from 'react'

function Manager() {
    const ToggleEye = useRef();
    const TogglePass = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [PasswordArray, setPasswordArray] = useState([])


    useEffect(() => {
        localStorage.getItem("Passwords")

        if (localStorage.getItem("Passwords")) {
            setPasswordArray(JSON.parse(localStorage.getItem("Passwords")))
        }
    }, [])




    const ShowPassword = () => {
        if (TogglePass.current.type == "password") {
            ToggleEye.current.src = "public/icons/hide_pass.svg";
            TogglePass.current.type = "text";
            ToggleEye.current.alt = "Hide Password";
        } else {
            ToggleEye.current.src = "public/icons/show_pass.svg";
            TogglePass.current.type = "password";
            ToggleEye.current.alt = "Show Password";
        }
    }

    const HandleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const SavePassword = () => {
        setPasswordArray([...PasswordArray, form])
        localStorage.setItem("Passwords", JSON.stringify([...PasswordArray, form]))
        console.log([...PasswordArray, form])
        console.log(form);
    }

    const HandleDelete = (params) => {
        // localStorage.removeItem("Passwords", PasswordArray.)
    }
    const HandleEdit = (params) => {
    }




    return (
        <>
            {/* backgound */}
            <div className="fixed inset-0 z-[-2] bg-black bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />


            {/* input container */}
            <div className='my-8 container mx-auto max-w-5xl min-w-fit bg-cyan-200 rounded p-0.5'>

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
                    <input value={form.site} onChange={HandleChange} className='px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 ' type="text" name="site" id='' placeholder='Enter website URL' />

                    <div className="flex gap-4">
                        <input value={form.username} onChange={HandleChange} className='w-full px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300' type="text" name="username" id="" placeholder='Enter Username' />
                        <div className='w-2/3 relative'>


                            <input value={form.password} onChange={HandleChange} ref={TogglePass} className='w-full px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300' type="password" name="password" id="" placeholder='Enter Password' />

                            <span className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200' title="Show or Hide Password" onClick={ShowPassword} >
                                <img ref={ToggleEye} src="public/icons/show_pass.svg" alt="Show Password" />
                            </span>

                        </div>
                    </div>
                    <div className="button flex justify-center">
                        <button className='flex justify-center gap-3 min-w-2/5 max-w-4/5 hover:cursor-pointer  bg-gradient-to-r from-cyan-500 to-cyan-600 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded rounded-4xl' type="submit" onClick={SavePassword}>

                            Add Password
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-copy-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-4.333 4a1 1 0 0 0 -1 1v2h-2a1 1 0 0 0 -.993 .883l-.007 .117a1 1 0 0 0 1 1h2v2a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-2h2a1 1 0 0 0 .993 -.883l.007 -.117a1 1 0 0 0 -1 -1h-2v-2a1 1 0 0 0 -.883 -.993zm1 -8c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3z" /></svg>
                        </button>
                    </div>
                </div>
            </div>



            {/* Heading container */}
            <div className='mt-15 my-3 container mx-auto max-w-15/16 md:max-w-5xl min-w-fit border-3 border-cyan-200 rounded-tl-xl rounded-tr-xl '>
                <div className="text-white flex flex-col gap-4  p-6 rounded bg-gray-800/40  ">
                    <div className="bg-blend-darken  flex justify-between">
                        <div className="s-no text-center w-1/4">S.no</div>
                        <div className="site text-center w-1/4">Site name</div>
                        <div className="username text-center w-1/4">Username</div>
                        <div className="password text-center w-1/4">Password</div>
                        {/* <div className="btns flex gap-4">
                            <div className="edit">Edit</div>
                            <div className='remove'>Delete</div>
                        </div> */}
                    </div>
                </div>
            </div>





            {/* Items container */}
            <div className='my-3 container mx-auto max-w-15/16 md:max-w-5xl min-w-fit border-3 border-cyan-200 rounded-bl-xl rounded-br-xl '>

                <div className="text-white flex flex-col gap-4  p-6 rounded bg-gray-800/70 ">

                    <div className="items">
                        {PasswordArray.length === 0 && <div className='text-center text-gray-400 text-lg font-medium'>No passwords saved yet.</div>}
                        {PasswordArray.length > 0 && <div>

                            {PasswordArray.map((item, index) => {
                                return (
                                    <>
                                        <div className="my-2 item bg-blend-darken  flex justify-between">

                                            <div className="s-no text-center w-1/4">{index + 1}</div>
                                            <div className="site text-center w-1/4"><a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a></div>
                                            <div className="username text-center w-1/4">{item.username}</div>
                                            <div className="password text-center w-1/4">{item.password}</div>
                                            {/* <div className="btns flex gap-4">
                                                <button onClick={() => HandleEdit(index)} className="edit group cursor-pointer inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-950/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/20 hover:border-cyan-300/50 hover:text-white hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/60">
                                                    <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-90 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/public/icons/edit.svg" alt="Edit" />
                                                    Edit
                                                </button>
                                                <button onClick={() => HandleDelete(index)} className='remove group cursor-pointer inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 shadow-lg shadow-red-950/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-400/20 hover:border-red-300/50 hover:text-white hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-300/60'>
                                                    <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-90 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/public/icons/delete.svg" alt="Delete" />
                                                    Delete
                                                </button>
                                            </div> */}
                                        </div>
                                        <div className="my-4 seperator border-b border-gray-600"></div>
                                    </>
                                )
                            })}
                        </div>
                        }
                    </div>



                </div>
            </div>
        </>
    )
}

export default Manager
