import Avatar from '@/Components/Avatar'
import Feed from '@/Components/Feed'
import { Link, router, useForm } from '@inertiajs/react'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Modal from './Modal'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Dropdown from '../Dropdown'
import { AuthContext } from '@/Context/Context'

function ModalFeed({ open, setOpenFeed = () => { }, setOpenEdit, modalRef, post, setPost = () => { } }) {
    const [comments, setComments] = useState(post.comments)

    const { delete: destroy } = useForm({})
    const commentRef = useRef(null)

    useEffect(() => {
        setComments(post.comments)
    }, [post.comments])

    const deletePost = (id) => {
        if (confirm("Are you sure want to delete this post?")) {
            destroy(route('posts.destroy', id), {
                preserveScroll: true,
                onFinish: () => {
                    setOpenFeed(false),
                        setPost(null)
                }
            })
        }

    }

    return (
        <Modal show={open} onClose={setOpenFeed} modalRef={modalRef} maxWidth='max-w-sm md:max-w-none max-h-none md:max-h-[calc(100vw-4rem)]'>
            <div className="flex flex-col md:flex-row max-h-[calc(100vh-8rem)]">

                <div className="px-4 md:hidden block">
                    <Feed.Header user={post.user} >
                        <Feed.HeaderDropdown children={"Update Post"} className='dark:text-white' onClick={() => {
                            setOpenFeed(false)
                            setOpenEdit(true)
                        }} />
                        <Feed.HeaderDropdown children={"Delete Post"} onClick={() => deletePost(post.id)} className='text-red-500' />
                    </Feed.Header>
                </div>
                <FeedImage image={post.image} />
                <div className="flex flex-col md:w-[25rem] w-full divide-y dark:divide-neutral-800 divide-neutral-200">
                    <div className="px-4 hidden md:block">
                        <Feed.Header user={post.user}>
                            <Feed.HeaderDropdown children={"Update Post"} className='dark:text-white' onClick={() => {
                                setOpenFeed(false)
                                setOpenEdit(true)
                            }} />
                            <Feed.HeaderDropdown children={"Delete Post"} onClick={() => deletePost(post.id)} className='text-red-500' />
                        </Feed.Header>
                    </div>
                    <div className="p-4 flex-grow hidden overflow-y-scroll no-scrollbar md:block">
                        <CaptionSection user={post.user} caption={post.caption} />
                        <CommentsSection comments={comments} />
                    </div>
                    <Feed.Bottom postId={post.id} className={`px-4 dark:text-white `} withCaption={false}>
                        <Feed.ButtonInteractionsFeed>
                            <Feed.LikeButton />
                            <Feed.ButtonInteraction name='Comment' onClick={() => commentRef.current.focus()}>
                                <path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
                            </Feed.ButtonInteraction>
                            <Feed.ButtonInteraction name='Share'>
                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </Feed.ButtonInteraction>
                        </Feed.ButtonInteractionsFeed>
                    </Feed.Bottom>
                </div>
            </div>
        </Modal>
    )
}


function FeedImage({ image }) {
    return (
        <div className={"grow md:basis-3/4 aspect-square flex justify-center bg-black"}>
            <LazyLoadImage src={'storage/' + image} className='object-contain' placeholder={<div className={"bg-neutral-700 animate-pulse grow"} />} />
        </div>
    );
}


function CaptionSection({ user, caption }) {

    return (
        <div className="caption flex mb-5">
            <Link as='button' href={route('profile.show', user.username)}>
                <Avatar avatar={user.avatar} className={'size-10 me-4'} avatarOnly />
            </Link>
            <div className="flex flex-col space-y-1 text-sm white mt-3 dark:text-white">
                <span className='break-all'><Link as='button' href={route('profile.show', user.username)} className='me-1'><b>{user.username} </b></Link>
                    {caption}</span>
                <div className="flex space-x-4 text-xs text-neutral-400">
                    <span>1m</span>
                    <span className='font-semibold'>See Translation</span>
                </div>
            </div>
        </div>
    );
}


function CommentsSection({ comments }) {
    const authUser = useContext(AuthContext)

    const deleteComment = (commentId) => {
        router.delete(route('comments.destroy', commentId))
    }

    return (
        <div className="flex flex-col space-y-2">
            {comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(comment => (
                <div key={comment.id} className="flex group">
                    <Link as='button' href={route('profile.show', comment.user.username)}>
                        <Avatar avatar={comment.user.avatar} className={'size-10 me-4'} avatarOnly />
                    </Link>
                    <div className="flex flex-col flex-shrink space-y-1 text-sm white mt-3 dark:text-white">
                        <span className='break-all'><Link as='button' href={route('profile.show', comment.user.username)} className='me-1'><b>{comment.user.username} </b></Link>
                            {comment.body}</span>
                        <div className="flex space-x-4 text-xs text-neutral-400">
                            <span>1m</span>
                            <span className='font-semibold'>See Translation</span>
                        </div>
                    </div>
                    <div className="ms-auto text-white group-hover:block hidden">
                        <Dropdown>
                            <Dropdown.Trigger canOpen={authUser.user.username == comment.user.username}>
                                <svg aria-label="More options" className="_8-yf5 fill-black dark:fill-white" height="16" viewBox="0 0 48 48" width="16">
                                    <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                                    <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                                    <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
                                </svg>
                            </Dropdown.Trigger>
                            {authUser.user.username == comment.user.username &&
                                <Dropdown.Content contentClasses='py-1 flex flex-col bg-white dark:bg-neutral-900 border dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15'>
                                    <Feed.HeaderDropdown children={"Delete Comment"} onClick={() => deleteComment(comment.id)} className='text-red-500' />
                                </Dropdown.Content>
                            }
                        </Dropdown>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ModalFeed