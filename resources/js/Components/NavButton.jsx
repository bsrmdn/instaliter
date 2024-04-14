import { Link/*, usePage*/ } from '@inertiajs/react'
import React from 'react'

function NavIcon({ to, button = false, method, className, name, children, onClick, notif }) {
    // const { url, component } = usePage()
    const isActive = route().current(`${to}`)

    return (
        {
            ...!button ?
                <Link as='button' disabled={isActive} method={method ? method : 'get'} href={typeof route(to) == 'string' && route(to)} role="button" tabIndex="0" className={` ${isActive && ' md:bg-gray-300 md:bg-opacity-30 md:dark:bg-gray-50 md:dark:bg-opacity-15'} flex items-center justify-center xl:justify-normal w-full p-2 rounded-xl text-start leading-tight transition-all hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15 text-black dark:text-white outline-none ` + className}>
                    <div className={"grid place-items-center xl:mr-4 " + (isActive && 'scale-125')}>
                        {children}
                    </div>
                    <p className='hidden xl:block'>{name}</p>
                    {notif && <div className="grid place-items-center ml-auto justify-self-end">
                        <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                            <span className="">{notif}</span>
                        </div>
                    </div>}
                </Link>
                :
                <button onClick={onClick} role="button" tabIndex="0" className={"flex items-center w-full justify-center xl:justify-normal p-2 rounded-xl text-start leading-tight transition-all hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15 text-black dark:text-white outline-none " + className}>
                    <div className={"grid place-items-center xl:mr-4 " + (isActive && 'scale-125')}>
                        {children}
                    </div>
                    <p className='hidden xl:block'>{name}</p>
                    {notif && <div className="grid place-items-center ml-auto justify-self-end">
                        <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                            <span className="">{notif}</span>
                        </div>
                    </div>}
                </button>
        }
    )
}



export default NavIcon