import PageLayout from '@/Layouts/PageLayout'
// import StoryLayout from '@/Layouts/StoryLayout'
import Avatar from '@/Components/Avatar'
import Feed from '@/Components/Feed'
import ModalEdit from '@/Components/Modal/ModalEdit'
import { Link, useForm } from '@inertiajs/react';
import React, { createContext, useContext, useRef, useState } from 'react'

const AuthContext = createContext(null)
const UsersContext = createContext(null)

export default function Home({ auth, posts, users }) {
    return (
        <PageLayout>
            <div className="flex justify-center">
                <UsersContext.Provider value={users}>
                    <div className="max-w-[39rem] my-4 w-full">
                        <StoryLayout className={'py-2'} />
                        <FeedLayout posts={posts} />
                    </div>
                    <div className="w-96 h-fit mt-9 ps-16 hidden lg:block">
                        <AuthContext.Provider value={auth}>
                            <SideProfile user={auth.user} sort={users.sort}></SideProfile>
                        </AuthContext.Provider>
                    </div>
                </UsersContext.Provider>
            </div>
        </PageLayout>
    )
}

function StoryLayout() {
    const users = useContext(UsersContext)

    return (
        <div className="flex items-center gap-x-4 py-2 overflow-x-scroll overflow-hidden no-scrollbar">
            {users.map((user, i) => {
                return <Avatar key={i} className='w-16 h-24' username={user.username} hasStory />
            })}
        </div>
    )
}

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
            {posts.length > 0 ?
                posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post, i) => {
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
                            <Feed.Bottom name={post.user.username} caption={post.caption} />
                        </Feed>
                    )
                })
                :
                <p>no post</p>
            }
            <ModalEdit open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} post={oldPost} />
        </div>
    )

}

function SideProfile() {
    const auth = useContext(AuthContext)
    const users = useContext(UsersContext)

    return (
        <div className="px-4">
            <div className="flex items-center w-full">
                <Avatar username={auth.user.username} avatarOnly className={'w-11'} />
                <div className="flex flex-col grow text-sm ms-3">
                    <p className='font-semibold'>{auth.user.username}</p>
                    <p className='text-gray-400 text-xs font-extralight'>{auth.user.name}</p>

                </div>
                <Link as='button' role='button' className='text-xs text-red-500 hover:text-white' method='post' href={route('logout')}>Logout</Link>
            </div>
            <div className="py-5 space-y-4">
                <p className='dark:text-gray-300 text-gray-600 text-sm'>Suggested for you</p>
                {users.sort(() => Math.random() - 0.5)
                    .slice(0, 5)
                    .map((user, i) => {
                        if (user.username != auth.user.username) {
                            return <div key={i} className="flex items-center w-full">
                                <Avatar username={user.username} avatarOnly className={'w-11'} />
                                <div className="flex flex-col w-full text-sm ms-3">
                                    <p className='font-semibold truncate w-36'>{user.username}</p>
                                    <p className='text-gray-400 text-xs font-extralight'>Suggested for you</p>
                                </div>
                                <Link as='button' role='button' className='text-xs text-blue-500 hover:text-white'>Follow</Link>
                            </div>
                        }
                    }, 0)}
            </div>
        </div>
    )
}