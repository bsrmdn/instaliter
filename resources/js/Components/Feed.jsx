import React, { useContext, useRef, useState } from 'react'
import Avatar from './Avatar'
import Dropdown from './Dropdown';
import { AuthContext } from '@/Context/Context';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, router, useForm } from '@inertiajs/react';


const Feed = ({ children, className }) => {

    return (
        <div className={"feed-wrapper mb-4 w-full " + className}>
            <div className="feed-item bg-white dark:bg-black">
                {children}
            </div>
        </div>
    )
}

const Header = ({ user, children }) => {
    const authUser = useContext(AuthContext)
    return (
        <div className="header py-4 flex justify-between items-center">
            <Link as='button' href={route('profile.show', user.username)} className="left flex flex-row items-center">
                <Avatar avatar={user.avatar} className='size-10' avatarOnly />
                <div className="user-name-and-place flex flex-col ms-4">
                    <span className="text-sm font-bold dark:text-white">{user.username}</span>
                    {/* <span className="text-xs font-light text-gray-900 dark:text-gray-50">Chiapas, Mexico</span> */}
                </div>
            </Link>
            <Dropdown>
                <Dropdown.Trigger canOpen={authUser.user.username == user.username}>
                    <svg aria-label="More options" className="_8-yf5 fill-black dark:fill-white" height="16" viewBox="0 0 48 48" width="16">
                        <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                        <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                        <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
                    </svg>
                </Dropdown.Trigger>
                {authUser.user.username == user.username &&
                    <Dropdown.Content contentClasses='py-1 flex flex-col bg-white dark:bg-neutral-900 border dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15'>
                        {children}
                    </Dropdown.Content>
                }
            </Dropdown>
        </div>
    );
}

const HeaderDropdown = ({ className = '', children, ...props }) => {
    return (
        <button type='button' {...props} className={`hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15 ${className}`}>
            {children}
        </button>
    )
}



const Image = ({ image, className, ...props }) => {
    return (
        <div {...props} className={"feed-img flex rounded place-content-center dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15 border " + className}>
            <LazyLoadImage src={'storage/' + image} alt="Post Image"
                className='object-contain'
                placeholder={
                    <div className={"bg-neutral-700 animate-pulse " + className} />
                }
            />

        </div>
    );
}




const ButtonInteraction = ({ children, name, onClick }) => {
    return (
        <button type='button' onClick={onClick}>
            <svg aria-label={name} className='fill-black dark:fill-white' height="24" viewBox="0 0 48 48" width="24">
                {children}
            </svg>
        </button>
    );
}

const LikeButton = ({ postId, isLiked }) => {
    const { data, setData, post } = useForm({
        isLiked: isLiked,
    });

    const handleLike = (e) => {
        e.preventDefault()
        post(route('posts.likes', postId), {
            onSuccess: () => {
                setData('isLiked', !data.isLiked)
            },
            preserveState: true,
            preserveScroll: true,
            only: ['posts']
        });
    };

    return (
        <button type='button' onClick={handleLike}>
            <svg aria-label='like' className={'size-6 ' + (isLiked ? 'fill-red-500' : 'fill-black dark:fill-white')} viewBox='0 0 16 16'>
                {isLiked ?
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    :
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                }
            </svg>
        </button>

    )
}


const ButtonInteractionsFeed = ({ children }) => {
    return (
        <div className="icons flex flex-row justify-between items-center">
            <div className="left flex flex-row gap-4">
                {children}
            </div>
            <div className="right">
                <ButtonInteraction name='Save'>
                    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                </ButtonInteraction>
            </div>
        </div>
    );
}

const Bottom = ({ className, children, post, name, caption, withCaption = true }) => {
    const commentRef = useRef(null)
    const { data, setData, post: postForm, reset, processing } = useForm({
        comment: "",
    });

    const handleCommentChange = (e) => {
        setData("comment", e.target.value);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        if (data.comment.trim() !== "") {
            postForm(route('comments.store', [post.id, data]), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset()
                    router.reload({
                        only: ['posts.comments']
                    })
                    commentRef.current.value = ''
                }
            });
        }
    }

    return (
        <div className={"card-footer py-4 " + className}>
            <div className="top break-all">
                {children}
                <div className="likes mt-1">
                    <span className="font-bold text-sm">
                        {post.likes.length} likes
                    </span>
                </div>
                {withCaption &&
                    <div className="caption text-sm mt-3">
                        <b>{name} </b>
                        {caption}
                    </div>
                }
                <div className="post-date mt-1">
                    <span className="text-xs dark:text-gray-50 opacity-40 text-gray-900">
                        1 minute ago
                    </span>
                </div>
            </div>
            <form className="pt-3 mt-3 wrapper flex" onSubmit={handleCommentSubmit}>
                <input ref={commentRef} onChange={handleCommentChange} type="text" className="text-sm mt-0 block w-full px-0.5 border-0 focus:ring-0 bg-transparent" placeholder="Add a comment" />
                <button type='submit' disabled={processing} className="text-blue-500 hover:text-blue-600 disabled:opacity-50 w-2/12 text-right font-bold">post</button>
            </form>
        </div>
    );
}

Feed.Header = Header
Feed.HeaderDropdown = HeaderDropdown
Feed.Image = Image
Feed.Bottom = Bottom
Feed.LikeButton = LikeButton
Feed.ButtonInteractionsFeed = ButtonInteractionsFeed
Feed.ButtonInteraction = ButtonInteraction


export default Feed