import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Avatar({ className, hasStory = false, avatarOnly = false, avatar, avatarURL, username }) {

    return (
        <div className={`text-center ` + className}>
            <div className={`w-[inherit]` + (hasStory ? `mb-1 bg-gradient-to-tr bg-clip-padding rounded-full from-yellow-400 via-red-500 to-purple-500 p-[2px]` : '')}>
                <div className={`${hasStory ? `p-[2px] bg-white dark:bg-black rounded-full` : ''} aspect-square`}>
                    <LazyLoadImage
                        alt="avatar"
                        src={avatarURL || `/storage/${avatar ? avatar : 'avatars/default-profile.jpg'}`}
                        className="size-full rounded-full dark:border-black border-white object-cover object-center"
                        placeholder={
                            <div className="rounded-full bg-neutral-700 size-full animate-pulse" />
                        }
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