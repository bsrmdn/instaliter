import { Switch } from '@headlessui/react'
import React, { useContext, useRef, useState } from 'react'
import NavIcon from './NavButton'
import { Auth } from '@/Data/Auth'
import Avatar from './Avatar'
import ModalCreate from './Modal/ModalCreate'

function Navbar() {
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'))
    darkMode ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const auth = useContext(Auth)

    return (
        <div className="fixed flex flex-col justify-items-start border-e dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15 bg-clip-border bg-white dark:bg-black text-gray-700 dark:text-white h-screen w-full max-w-64 p-4 ">
            <div className="mb-6 py-4 px-2">
                <p className="block antialiased tracking-normal font-serif text-2xl font-semibold leading-snug text-gray-900 dark:text-white">Instaliter</p>
            </div>

            <nav className="flex flex-col gap-3 h-full min-w-40 font-sans text-base font-medium text-gray-700 dark:text-white">
                <NavIcon name="Home" to='home'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </NavIcon>
                <NavIcon name="Search" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </NavIcon>
                <NavIcon name="Explore" to='explore'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                </NavIcon>
                <NavIcon name="Reels" to='reels'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                    </svg>
                </NavIcon>
                <NavIcon name="Notifications" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </NavIcon>
                <NavIcon name="Create" onClick={() => setOpen(true)} button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <ModalCreate formtype={"Create"} open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} user={auth.user}></ModalCreate>
                </NavIcon>
                <NavIcon name="Profile" to='profile'>
                    <Avatar className={'w-7'} avatarOnly avatar={auth.user.avatar} />
                </NavIcon>

                <div className='mt-auto flex gap-4 self-center'>
                    <div className='self-center'>
                        Dark Mode
                    </div>
                    <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        className={`${darkMode ? 'bg-white' : 'bg-black'} relative shrink-0 inline-flex h-[38px] w-[76px] mt-auto cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                        <span className="sr-only">Change Appearence</span>
                        <span
                            aria-hidden="true"
                            className={`${darkMode ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white dark:bg-black shadow-lg ring-0 transition duration-200 ease-in-out`} />
                    </Switch>
                </div>
            </nav>
        </div>
    )
}

export default Navbar