import React from 'react'

function Avatar({ className, hasStory, avatarOnly }) {

    return (
        <div className={`avatar text-center ` + className}>
            <div className={hasStory && `bg-gradient-to-tr bg-clip-padding rounded-full w-fit from-yellow-400 via-red-500 to-purple-500 p-[2px] my-1`}>
                <div className={`p-[2px] ${hasStory && `bg-white dark:bg-black rounded-full`} `}>
                    <img
                        alt="user 1"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                        className="inline-block rounded-full dark:border-black border-white border-[] object-cover object-center"
                    />

                </div>
            </div>
            {!avatarOnly &&
                <p className='text-sm truncate'>Don wewewewewewe</p>
            }
        </div>

    )
}

export default Avatar