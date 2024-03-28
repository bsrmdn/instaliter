import Avatar from '@/Components/Avatar'
import React from 'react'

function StoryLayout() {
    return (
        <div className="flex items-center gap-x-4 mt-1 overflow-x-scroll overflow-hidden no-scrollbar">
            <Avatar className='w-16' hasStory />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
            <Avatar className='w-16' />
        </div>
    )
}

export default StoryLayout