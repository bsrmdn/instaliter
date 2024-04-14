import PageLayout from '@/Layouts/PageLayout'
import Avatar from '@/Components/Avatar'
import Feed from '@/Components/Feed'
import ModalEdit from '@/Components/Modal/ModalEdit'
import { Link, useForm } from '@inertiajs/react';
import React, { useContext, useRef, useState, useTransition } from 'react'
import { AuthContext, UploadPostContext } from '@/Context/Context';
import HorizontalScroll from '@/Layouts/HorizontalScroll';
import ModalFeed from '@/Components/Modal/ModalFeed';

const Home = ({ posts, users }) => {
    return (
        <div className="flex justify-center">
            <div className="max-w-[39rem] my-4 w-full">
                <HorizontalScroll>
                    {users.map((user, i) => {
                        return <Avatar key={i} className='w-16 h-24' username={user.username} hasStory />
                    })}
                </HorizontalScroll>
                <FeedLayout posts={posts} />
            </div>
            <div className="w-96 h-fit mt-9 ps-8 xl:ps-16 hidden lg:block">
                <SideProfile users={users} />
            </div>
        </div>
    )
}

Home.layout = page => <PageLayout children={page} />

function FeedLayout({ posts }) {
    const { delete: destroy } = useForm({})

    const isUploading = useContext(UploadPostContext)

    const [openEdit, setOpenEdit] = useState(false)
    const [openFeed, setOpenFeed] = useState(false)
    const [post, setPost] = useState(null)
    const modalRef = useRef(null)

    const [isPending, startTransition] = useTransition()


    const deletePost = (id) => {
        if (confirm("Are you sure want to delete this post? id=" + id)) {
            destroy(route('posts.destroy', id))
        }

    }
    return (
        <div className="flex flex-col items-center mt-4 ">
            {isUploading &&
                <Feed className={'max-w-[29rem] border-b dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15 py-5'}>
                    <div class="animate-pulse flex space-x-4">
                        <div class="rounded-full bg-neutral-300 dark:bg-neutral-800 size-10"></div>
                        <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 text-neutral-300 dark:text-neutral-800 rounded">Uploading...</div>
                            <div class="space-y-3">
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-neutral-300 dark:bg-neutral-800 rounded col-span-2"></div>
                                    <div class="h-2 bg-neutral-300 dark:bg-neutral-800 rounded col-span-1"></div>
                                </div>
                                <div class="h-2 bg-neutral-300 dark:bg-neutral-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                </Feed>
            }

            {posts.length > 0 ?
                posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post, i) => {
                    return (
                        <Feed key={i} className={'max-w-[29rem] border-b dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15'}>
                            <Feed.Header user={post.user}>
                                <Feed.HeaderDropdown children={"Update Post"} onClick={() => startTransition(() => {
                                    setPost(post)
                                    setOpenEdit(true)
                                })} />
                                <Feed.HeaderDropdown children={"Delete Post"} onClick={() => deletePost(post.id)} className='text-red-500' />
                            </Feed.Header>
                            <Feed.Image image={post.image} className='min-h-72 max-h-[36rem] hover:cursor-pointer' onClick={() => startTransition(() => {
                                setPost(post)
                                setOpenFeed(true)
                            })} />
                            <Feed.Bottom name={post.user.username} caption={post.caption}>
                                <Feed.ButtonInteractionsFeed>
                                    <Feed.ButtonInteraction name='Like'>
                                        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                    </Feed.ButtonInteraction>
                                    <Feed.ButtonInteraction name='Comment' onClick={() => startTransition(() => {
                                        setPost(post)
                                        setOpenFeed(true)
                                    })}>
                                        <path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
                                    </Feed.ButtonInteraction>
                                    <Feed.ButtonInteraction name='Share'>
                                        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                    </Feed.ButtonInteraction>
                                </Feed.ButtonInteractionsFeed>
                            </Feed.Bottom>
                        </Feed>
                    )
                })
                :
                <p>no post</p>
            }
            {openEdit && <ModalEdit setOpen={setOpenEdit} post={post} />}
            {openFeed && <ModalFeed setOpenFeed={setOpenFeed} post={post} modalRef={modalRef} />}
        </div>
    )

}

function SideProfile({ users }) {
    const auth = useContext(AuthContext)

    return (
        <div className="px-4">
            <div className="flex items-center w-full">
                <Link as='button' href={route('profile')}>
                    <Avatar username={auth.user.username} avatarOnly className={'size-11'} />
                </Link>
                <div className="flex flex-col grow text-sm ms-3">
                    <Link as='button' href={route('profile')} className='font-semibold text-left truncate w-36'>{auth.user.username}</Link>
                    <Link as='button' href={route('profile')} className='text-gray-400 text-xs font-extralight text-left'>{auth.user.name}</Link>

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
                                <Link as='button' href={route('profile.show', user.username)}>
                                    <Avatar username={user.username} avatarOnly className={'size-11'} />
                                </Link>
                                <div className="flex flex-col w-full text-sm ms-3">
                                    <Link as='button' href={route('profile.show', user.username)} className='font-semibold truncate w-36 text-left'>{user.username}</Link>
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

export default Home