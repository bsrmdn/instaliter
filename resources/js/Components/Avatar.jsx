import React from 'react'

function Avatar({ className, hasStory = false, avatarOnly = false, avatar, username }) {

    return (
        <div className={`text-center ` + className}>
            <div className={`w-[inherit] ` + (hasStory ? `mb-1 bg-gradient-to-tr bg-clip-padding rounded-full from-yellow-400 via-red-500 to-purple-500 p-[2px]` : '')}>
                <div className={`${hasStory ? `p-[2px] bg-white dark:bg-black rounded-full` : ''}`}>
                    <img
                        alt="avatar"
                        src={`storage/${avatar ? avatar : 'avatar/default-profile.jpg'}`}
                        className=" w-max rounded-full dark:border-black border-white object-cover object-center"
                    />

                </div>
            </div>
            {!avatarOnly &&
                <p className='text-xs truncate w-[inherit]'>{username}</p>
            }
        </div>

    )
}

export default Avatar