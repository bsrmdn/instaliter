import Feed from '@/Components/Feed'
import React from 'react'

function FeedLayout({ posts }) {
    console.log('posts: ', posts);
    return (
        <div className="flex flex-col items-center mt-4 ">
            {posts.map((post, i) => {
                console.log('post: ', post);
                return <Feed key={i} post={post} />
            })}
        </div>
    )
}

export default FeedLayout