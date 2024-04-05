import React from 'react'
import Navbar from '@/Components/Navbar'
import { Head, usePage } from '@inertiajs/react'
import { Auth } from '@/Context/Auth'


function PageLayout({ children }) {
    const { component } = usePage()
    const { auth } = usePage().props

    return (
        <Auth.Provider value={auth}>
            <Head title={component.split('/')[0]} />
            <Navbar />
            <main className='ml-16 xl:ml-60 px-4 bg-gray-50 bg-opacity-5 dark:bg-black dark:text-white min-h-screen'>
                {children}
            </main>
        </Auth.Provider>
    )
}

export default PageLayout
