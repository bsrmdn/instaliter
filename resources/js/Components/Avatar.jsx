import React from 'react'

function Avatar({ className, hasStory, avatarOnly, avatar }) {

    return (
        <div className={`avatar text-center ` + className}>
            <div className={`my-1 ` + (hasStory && `bg-gradient-to-tr bg-clip-padding rounded-full w-fit from-yellow-400 via-red-500 to-purple-500 p-[2px]`)}>
                <div className={`p-[2px] ${hasStory && `bg-white dark:bg-black rounded-full`} `}>
                    <img
                        alt="avatar"
                        src={`storage/${avatar ? avatar : 'avatar/default-profile.jpg'}`}
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