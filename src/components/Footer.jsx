import React from 'react'

/*
 * Footer
 * Simple site footer displayed at the bottom of pages. Contains branding and copyright.
 * Kept intentionally minimal to avoid distraction from the app's primary UI.
 */
function Footer() {
    return (
        <div>
            <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-10">
                <div className="logo font-extrabold text-2xl tracking-wide text-cyan-400">KeyVault</div>
                <p className="text-sm">&copy; 2026 KeyVault. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Footer
