import React from 'react'

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="logo font-extrabold text-2xl tracking-wide text-cyan-400">KeyVault</div>
                <ul className='flex items-center gap-6 text-sm md:text-base font-medium'>
                    <li className='cursor-pointer px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-cyan-300'>Home</li>
                    <li className='cursor-pointer px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-cyan-300'>About</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
