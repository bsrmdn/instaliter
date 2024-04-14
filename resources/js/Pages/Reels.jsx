import PageLayout from '@/Layouts/PageLayout'
import React from 'react'

function Reels({ posts }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {posts.map((post, i) => (
                <div key={i} className="relative">
                    <img className="object-cover w-full h-full" src={post.image} alt={post.caption} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                        <div className="text-white">
                            <i className="far fa-heart"></i>
                            <i className="far fa-comment"></i>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                        <p className="text-sm">{post.caption}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

Reels.layout = (page) => <PageLayout children={page} />

export default Reels

