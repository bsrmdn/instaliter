import React, { useEffect, useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, usePage } from '@inertiajs/react'
import { AuthContext, UploadPostContext } from '@/Context/Context'
import Notification from '@/Components/Notification'


function PageLayout({ children }) {
    const { component } = usePage()
    const { auth, flash } = usePage().props
    const [openNotif, setOpenNotif] = useState(false)
    const [isUploadingPost, setIsUploadingPost] = useState(false)

    useEffect(() => {
        if (flash.message != null) setOpenNotif(true)
        return () => setOpenNotif(false)
    }, [flash.message])


    return (
        <AuthContext.Provider value={auth}>
            <Head title={component.split('/')[0]} />
            <Notification show={openNotif} setShow={setOpenNotif} message={flash.message} />
            <Navbar setIsUploading={setIsUploadingPost} />
            <main className='md:ml-16 xl:ml-60 px-4 pb-20 bg-gray-50 bg-opacity-5 dark:bg-black dark:text-white min-h-screen'>
                <UploadPostContext.Provider value={isUploadingPost}>
                    {children}
                </UploadPostContext.Provider>
            </main>
        </AuthContext.Provider>
    )
}

export default PageLayout
