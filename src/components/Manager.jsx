import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

/**
 * Manager Component
 * Password manager component that handles adding, viewing, and managing saved passwords
 * Uses localStorage for persistence and state management for UI interactions
 */
function Manager() {
    // Refs for DOM manipulation - password input and eye icon
    const ToggleEye = useRef();
    const TogglePass = useRef();

    // Form state for new password entry
    const [form, setform] = useState({ site: "", username: "", password: "" })

    // Array to store all saved passwords
    const [PasswordArray, setPasswordArray] = useState([])

    // State to track which dropdown (password item) is currently open
    const [Opendropdown, setOpendropdown] = useState(null)

    // State to track which password visibility toggle is active
    const [ShowDropdownPassword, setShowDropdownPassword] = useState(null)

    /**
     * Load passwords from localStorage on component mount
     */
    useEffect(() => {
        localStorage.getItem("Passwords")

        if (localStorage.getItem("Passwords")) {
            setPasswordArray(JSON.parse(localStorage.getItem("Passwords")))
        }
    }, [])

    /**
     * Toggle password visibility by changing input type between password and text
     * Updates the eye icon accordingly
     */
    const ShowPassword = () => {
        if (TogglePass.current.type == "password") {
            ToggleEye.current.src = "/icons/hide_pass.svg";
            TogglePass.current.type = "text";
            ToggleEye.current.alt = "Hide Password";
        } else {
            ToggleEye.current.src = "/icons/show_pass.svg";
            TogglePass.current.type = "password";
            ToggleEye.current.alt = "Show Password";
        }
    }

    /**
     * Handle form input changes for site, username, and password fields
     * @param {Event} e - The input change event
     */
    const HandleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    /**
     * Save new password to the password array and localStorage
     */
    const SavePassword = (e) => {
        e.preventDefault();
        if (form.site === "" || form.username === "" || form.password === "") {
            toast.error('Please fill in all fields!', {
                position: "top-right",
            });
            return;
        }
        if (form.site.startsWith("http://") === false && form.site.startsWith("https://") === false) {
            toast.error('Please enter a valid URL starting with http:// or https://', {
                position: "top-right",
            });
            return;
        }
        if (form.site.split(".").length < 2) {
            toast.error('Please enter a valid URL with a domain name', {
                position: "top-right",
            });
            return;
        }
        setPasswordArray([...PasswordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("Passwords", JSON.stringify([...PasswordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
        toast.success('Password saved successfully!', {
            position: "top-right",
        });

    }

    const HandleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    /**
     * Delete password entry (to be implemented)
     * @param {number} params - Index of the password to delete
     */
    const HandleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this password? This action cannot be undone.")) {
            setPasswordArray(PasswordArray.filter((item) => item.id !== id))
            localStorage.setItem("Passwords", JSON.stringify(PasswordArray.filter((item) => item.id !== id)))
            toast.success('Password deleted successfully!', {
                position: "top-right",
            });
        }
        else {
            toast.info('Password deletion cancelled.', {
                position: "top-right",
            });
        }
    }

    /**
     * Edit password entry (to be implemented)
     * @param {number} params - Index of the password to edit
     */
    const HandleEdit = (id) => {
        setform(PasswordArray.find((item) => item.id === id))
        setPasswordArray(PasswordArray.filter((item) => item.id !== id))
        toast.info('Password loaded into form for editing. Make changes and click "Add Password" to save.', {
            position: "top-right",
        });
    }

    /**
     * Toggle dropdown visibility for password details
     * @param {number} index - Index of the password item to toggle
     */
    const ToggleDropdown = (index) => {
        setOpendropdown(index === Opendropdown ? null : index);
    }

    /**
     * Toggle password visibility in the dropdown view
     * @param {number} index - Index of the password item
     */
    const HandleShowDropdownPassword = (index) => {
        setShowDropdownPassword(index === ShowDropdownPassword ? null : index);
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Animated gradient background pattern */}
            <div className="fixed inset-0 z-[-2] bg-black bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

            {/* Input container - Add new password section */}
            <div className='my-8 container mx-auto max-w-5xl min-w-fit bg-cyan-200 rounded p-0.5'>
                <div className="text-white flex flex-col gap-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 rounded">
                    {/* Logo section */}
                    <div className="logo flex justify-center text-cyan-400 text-4xl font-bold -mb-5">
                        <span className='mx-2 text-cyan-200'>&lt;/</span>
                        <span className='text-cyan-600'>Key</span>
                        <span className='text-cyan-400'>Vault</span>
                        <span className='mx-2 text-cyan-200'>/&gt;</span>
                    </div>

                    {/* Subheading */}
                    <div className="subheading text-center text-gray-300 text-lg font-medium">
                        <span>Your own password manager</span>
                    </div>

                    <form className='text-white flex flex-col gap-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 rounded' onSubmit={SavePassword}>
                        {/* Website URL input field */}
                        <input value={form.site} onChange={HandleChange} className='px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 ' type="text" name="site" id='' placeholder='Enter website URL' />
                        {/* Username and password input fields */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <input value={form.username} onChange={HandleChange} className='w-full px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300' type="text" name="username" id="" placeholder='Enter Username' />
                            <div className='w-full md:w-2/3 relative'>
                                {/* Password input with show/hide toggle */}
                                <input value={form.password} onChange={HandleChange} ref={TogglePass} className='w-full px-3 py-2.5 rounded-4xl bg-cyan-50 focus:bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300' type="password" name="password" id="" placeholder='Enter Password' />

                                {/* Eye icon to toggle password visibility */}
                                <span className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200' title="Show or Hide Password" onClick={ShowPassword} >
                                    <img ref={ToggleEye} src="/icons/show_pass.svg" alt="Show Password" />
                                </span>
                            </div>
                        </div>

                        {/* Save password button */}
                        <div className="button flex justify-center">
                            <button className='flex justify-center gap-3 min-w-2/5 max-w-10/12 hover:cursor-pointer  bg-gradient-to-r from-cyan-500 to-cyan-600 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded rounded-4xl' type="submit" >
                                Add Password
                                <img className='invert' src="/icons/add_pass.svg" alt="" />

                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table header - Column titles for password list */}
            <div className='mt-15 my-3 container mx-auto max-w-5xl min-w-fit border-3 border-cyan-200 rounded-tl-xl rounded-tr-xl '>
                <div className="text-white flex flex-col gap-4 py-6 md:px-6 rounded bg-gray-800/40">
                    {/* Heading for the password list section */}
                    <div className="heading text-center text-2xl md:hidden">Password List</div>
                    {/* Header row with column titles - hidden on mobile, visible on medium screens and up */}
                    <div className="bg-blend-darken hidden md:flex justify-between items-center">
                        <div className="s-no text-center w-1/3">S.no</div>
                        <div className='border-1 border-cyan-500 h-10'></div>
                        <div className="site text-center w-1/3">Site name</div>
                        <div className='border-l border-cyan-500 h-10'></div>
                        <div className="username text-center w-1/3">Username</div>
                        <div className='border-l border-cyan-500 h-10'></div>
                        <div className='border-1 m-2 rounded p-1'><img className='invert' src="/icons/plus.svg" alt="" /></div>
                    </div>
                </div>
            </div>

            {/* Items container - List of saved passwords (responsive design) */}
            <div className='my-3 container mx-auto max-w-5xl min-w-fit border-3 border-cyan-200 rounded-bl-xl rounded-br-xl px-3 md:px-0'>
                <div className="text-white flex flex-col gap-4 p-3 md:p-6 rounded bg-gray-800/70">
                    <div className="items">
                        {/* Show empty state message when no passwords are saved */}
                        {PasswordArray.length === 0 && <div className='text-center text-gray-400 text-lg font-medium'>No passwords saved yet.</div>}

                        {/* Display list of saved passwords */}
                        {PasswordArray.length > 0 && <div>
                            {PasswordArray.map((item, index) => {
                                return (
                                    <>
                                        {/* Password item row - responsive layout (stacks on mobile, flex on desktop) */}
                                        <div className="item my-2 bg-blend-darken flex flex-col md:flex-row md:justify-between md:items-center bg-gray-700/20 hover:bg-gray-700/50 rounded transition-all duration-200 rounded-2xl p-2 md:py-4 md:px-0 gap-3 md:gap-0">

                                            {/* S.no column - Index of the password entry */}
                                            <div className="pl-5 s-no text-sm md:text-base text-center md:text-left w-full md:w-1/3">
                                                <span className='md:hidden font-semibold text-cyan-400'>No. </span>
                                                {index + 1}
                                            </div>
                                            <div className="seperator-mobile h-0.5 bg-cyan-400 w-1/5 ml-4 -mt-2 self-center md:hidden"></div>

                                            {/* Divider - hidden on mobile */}
                                            <div className='hidden md:block border-l border-cyan-500/30 h-10'></div>

                                            {/* Site name column with copy button - responsive */}
                                            <div className="site flex gap-2 justify-start md:justify-center items-center text-sm md:text-base w-full md:w-1/3">
                                                <span className='md:hidden font-semibold text-cyan-400'>Site: </span>
                                                <a href={item.site} target="_blank" rel="noopener noreferrer" className="truncate">{item.site}</a>
                                                <button onClick={() => HandleCopy(item.site)} className="group cursor-pointer inline-flex items-center justify-center p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-300/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 flex-shrink-0" title="Copy site">
                                                    <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-80 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/icons/copy.svg" alt="Copy" />
                                                </button>
                                            </div>

                                            {/* Divider - hidden on mobile */}
                                            <div className='hidden md:block border-l border-cyan-500/30 h-10'></div>

                                            {/* Username column with copy button - responsive */}
                                            <div className="username flex gap-2 justify-start md:justify-center items-center text-sm md:text-base w-full md:w-1/3">
                                                <span className='md:hidden font-semibold text-cyan-400'>User: </span>
                                                {item.username}
                                                <button onClick={() => HandleCopy(item.username)} className="group cursor-pointer inline-flex items-center justify-center p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-300/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 flex-shrink-0" title="Copy username">
                                                    <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-80 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/icons/copy.svg" alt="Copy" />
                                                </button>
                                            </div>

                                            {/* Divider - hidden on mobile */}
                                            <div className='hidden md:block border-l border-cyan-500/30 h-10'></div>

                                            {/* Expand/Collapse button - toggles password details view */}
                                            <div className='flex justify-end md:justify-center items-center w-full md:w-auto'>
                                                {Opendropdown === index ? (
                                                    <>
                                                        <div className='md:hidden' >collapse</div>
                                                    </>

                                                ) : (
                                                    <>
                                                        <div className='md:hidden'>expand</div>
                                                    </>
                                                )}
                                                <div onClick={() => ToggleDropdown(index)} className='border-1 m-2 rounded p-1 cursor-pointer hover:bg-cyan-500/20 border-cyan-400/30 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 flex-shrink-0 w-7 h-7 flex justify-center items-center' title="View Password">
                                                    {Opendropdown === index ? (
                                                        <img className='invert' src="/icons/minus.svg" alt="" />
                                                    ) : (
                                                        <img className='invert' src="/icons/plus.svg" alt="" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dropdown section - Shows password and action buttons */}
                                        {Opendropdown === index && (
                                            <>
                                                <div className="item my-2 bg-blend-darken bg-gray-900 p-4 md:p-6 rounded flex flex-col md:flex-row justify-center items-start md:items-center gap-4 md:gap-0">
                                                    {/* Password display section - responsive layout */}
                                                    <div className="password flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center text-sm md:text-base w-full md:w-1/3">
                                                        <span className='font-semibold text-cyan-400 flex-shrink-0'>Password:</span>
                                                        {ShowDropdownPassword === index ? (
                                                            <div className='flex gap-2.5 justify-center items-center'>
                                                                <div className='break-all'>{(item.password)}</div>
                                                                <button onClick={() => HandleCopy(item.password)} className="group cursor-pointer inline-flex items-center justify-center p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-300/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 flex-shrink-0" title="Copy site">
                                                                    <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-80 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/icons/copy.svg" alt="Copy" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className='break-all'>{"*".repeat(item.password.length)}</div>
                                                        )}
                                                    </div>

                                                    {/* Action buttons - Responsive flex layout */}
                                                    <div className="btns flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-2/3 md:justify-end">
                                                        {/* Show/Hide password button */}
                                                        <button onClick={() => (HandleShowDropdownPassword(index))} className="group cursor-pointer inline-flex items-center justify-center p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-400/30 hover:border-green-300/50 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20 text-xs md:text-sm px-2 md:px-4 py-2" title={ShowDropdownPassword === index ? "Hide password" : "Show password"}>
                                                            {ShowDropdownPassword === index ? "Hide" : "Show"}
                                                        </button>

                                                        {/* Edit button */}
                                                        <button onClick={() => HandleEdit(item.id)} className="edit group cursor-pointer inline-flex items-center justify-center gap-1 md:gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 md:px-4 py-2 text-xs md:text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-950/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/20 hover:border-cyan-300/50 hover:text-white hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/60">
                                                            <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-90 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/icons/edit.svg" alt="Edit" />
                                                            <span className='hidden sm:inline'>Edit</span>
                                                        </button>

                                                        {/* Delete button */}
                                                        <button onClick={() => HandleDelete(item.id)} className='remove group cursor-pointer inline-flex items-center justify-center gap-1 md:gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-2 md:px-4 py-2 text-xs md:text-sm font-semibold text-red-100 shadow-lg shadow-red-950/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-400/20 hover:border-red-300/50 hover:text-white hover:shadow-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-300/60'>
                                                            <img className='h-4 w-4 shrink-0 brightness-0 invert opacity-90 transition-transform duration-200 group-hover:scale-110 group-hover:opacity-100' src="/icons/delete.svg" alt="Delete" />
                                                            <span className='hidden sm:inline'>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Separator between password items */}
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
