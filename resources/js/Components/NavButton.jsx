import { Link/*, usePage*/ } from '@inertiajs/react'
import React from 'react'

function NavIcon(props) {
    // const { url, component } = usePage()
    const isActive = route().current(`${props.to}`)

    return (
        {
            ...!props.button ?
                <Link as='button' method={props.method ? props.method : 'get'} href={typeof route(props.to) == 'string' && route(props.to)} role="button" tabIndex="0" className={` ${isActive && 'bg-gray-300 bg-opacity-30 dark:bg-gray-50 dark:bg-opacity-15'} flex items-center justify-center xl:justify-normal w-full p-2 rounded-xl text-start leading-tight transition-all hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15 text-black dark:text-white outline-none`}>
                    <div className="grid place-items-center xl:mr-4">
                        {props.children}
                    </div>
                    <p className='hidden xl:block'>{props.name}</p>
                    {props.notif && <div className="grid place-items-center ml-auto justify-self-end">
                        <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                            <span className="">{props.notif}</span>
                        </div>
                    </div>}
                </Link>
                :
                <button onClick={props.onClick} role="button" tabIndex="0" className="flex items-center w-full justify-center xl:justify-normal p-2 rounded-xl text-start leading-tight transition-all hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15 text-black dark:text-white outline-none">
                    <div className="grid place-items-center xl:mr-4">
                        {props.children}
                    </div>
                    <p className='hidden xl:block'>{props.name}</p>
                    {props.notif && <div className="grid place-items-center ml-auto justify-self-end">
                        <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                            <span className="">{props.notif}</span>
                        </div>
                    </div>}
                </button>
        }
    )
}



export default NavIcon