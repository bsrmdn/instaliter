import React from 'react'

function Avatar() {
    return (
        <div className="avatar text-center w-24">
            <div className="bg-gradient-to-tr bg-clip-padding rounded-full w-fit from-yellow-400 via-red-500 to-purple-500 p-1.5 my-1">
                <img
                    alt="user 1"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    className="inline-block h-20 w-20 rounded-full dark:ring-black ring-white ring-[3px] object-cover object-center"
                />
            </div>
            <p className='font-medium truncate'>Don wewewewewewe</p>
        </div>
    )
}

export default Avatar