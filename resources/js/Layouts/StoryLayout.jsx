import Avatar from '@/Components/Avatar'
import React from 'react'

function StoryLayout({ users }) {
    return (
        <div className="flex items-center gap-x-4 mt-1 overflow-x-scroll overflow-hidden no-scrollbar">
            {users.map((user, i) => {
                return <Avatar key={i} className='w-16 h-24' username={user.name} />
            })}
        </div>
    )
}

export default StoryLayout