import React from 'react'
import Navbar from '@/Components/Navbar'
import { Head, usePage } from '@inertiajs/react'
import { Auth } from '@/Data/Auth'


function PageLayout({ children }) {
    const { component } = usePage()
    const { auth } = usePage().props

    return (
        <Auth.Provider value={auth}>
            <Head title={component.split('/')[0]} />
            <div className="flex">
                <Navbar />
                <main className='w-full p-5 pl-72 bg-gray-50 bg-opacity-5 dark:bg-black dark:text-white min-h-screen'>
                    <Auth.Provider value={auth}>
                        {children}
                    </Auth.Provider>
                </main>
            </div>
        </Auth.Provider>
    )
}

export default PageLayout
