import { Transition } from '@headlessui/react'
import { router } from '@inertiajs/react'
import React, { useEffect } from 'react'


function Notification({ show = false, setShow = () => { }, message }) {

    useEffect(() => {
        if (show) {
            const timeout = setTimeout(() => {
                setShow(false)
            }, 5000)
            return () => clearTimeout(timeout)
        }
    }, [show]);


    return (
        <Transition show={show} className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-30">
            <Transition.Child className="flex w-full flex-col items-center space-y-4 sm:items-end"
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => router.post('/clear-flash', null, {
                    preserveScroll: true,
                    preserveState: true,
                })}>
                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-neutral-900 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5">
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium dark:text-white">{message}</p>
                                {/* <p className="mt-1 text-sm text-gray-500">File save click here to view folder.</p> */}
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button type="button" onClick={(e) => setShow(false)} className="inline-flex rounded-md dark:text-white hover:text-gray-500">
                                    <span className="sr-only">Close</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    )
}

export default Notification