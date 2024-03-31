import Feed from '@/Components/Feed'
import ModalEdit from '@/Components/Modal/ModalEdit'
import { useForm } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'

function FeedLayout({ posts }) {
    const { delete: destroy } = useForm({})

    const [open, setOpen] = useState(false)
    const [oldPost, setOldPost] = useState(null)
    const cancelButtonRef = useRef(null)

    const deletePost = (id) => {
        if (confirm("Are you sure want to delete this post? id=" + id)) {
            destroy(`/posts/${id}`)
        }

    }
    return (
        <div className="flex flex-col items-center mt-4 ">
            {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post, i) => {
                return (
                    <Feed key={i}>
                        <Feed.Header id={post.id} user={post.user}>
                            <Feed.HeaderDropdown children={"Update Post"} onClick={() => {
                                setOldPost(post)
                                setOpen(true)
                            }} />
                            <Feed.HeaderDropdown children={"Delete Post"} onClick={() => deletePost(post.id)} className='text-red-500' />
                        </Feed.Header>
                        <Feed.Image image={post.image} />
                        <Feed.Bottom name={post.user.name} caption={post.caption} />
                    </Feed>
                )
            })}
            <ModalEdit open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} post={oldPost} />
        </div>
    )
}

export default FeedLayout