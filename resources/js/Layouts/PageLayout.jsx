import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, usePage } from '@inertiajs/react'
import { AuthContext, UploadPostContext } from '@/Context/Context'


function PageLayout({ children }) {
    const { component } = usePage()
    const { auth } = usePage().props
    const [isUploadingPost, setIsUploadingPost] = useState(false)

    return (
        <AuthContext.Provider value={auth}>
            <Head title={component.split('/')[0]} />
            <Navbar setIsUploading={setIsUploadingPost} />
            <main className='ml-16 xl:ml-60 px-4 bg-gray-50 bg-opacity-5 dark:bg-black dark:text-white min-h-screen'>
                <UploadPostContext.Provider value={isUploadingPost}>
                    {children}
                </UploadPostContext.Provider>
            </main>
        </AuthContext.Provider>
    )
}

export default PageLayout
