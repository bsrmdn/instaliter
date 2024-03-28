import Avatar from '@/Components/Avatar'
import Feed from '@/Components/Feed'
import React from 'react'

function FeedLayout() {
    return (
        <div className="feeds flex flex-col items-center mt-4">
            <Feed />
            <Feed />
        </div>
    )
}

export default FeedLayout