import React from 'react'

/*
 * Navbar
 * Top navigation bar used across the app. Keeps branding and primary links.
 * - responsive layout: stacks on small screens and aligns horizontally on larger viewports
 * - uses utility classes for spacing, hover states and accessibility hints
 */
function Navbar() {
    return (
        <nav className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className='flex justify-between gap-4 w-full'>
                    {/* Brand / Logo */}
                    <div className="logo font-extrabold text-2xl tracking-wide text-cyan-400">KeyVault</div>

                    {/* Primary navigation links (visible inline on larger screens) */}
                    <ul className='flex flex-wrap items-center justify-center gap-2 text-sm font-medium sm:justify-end sm:gap-6 md:text-base '>
                        <li className='cursor-pointer px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-cyan-300'>Home</li>
                        <li className='cursor-pointer px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-cyan-300'>About</li>
                    </ul>
                </div>

                {/* GitHub CTA - visually prominent button linking to source */}
                <div className="github flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-all duration-200 bg-cyan-900 hover:bg-cyan-600 hover:text-white focus:outline-none justify-center">
                    <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" />
                    <span className="text-sm font-medium">Github</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
