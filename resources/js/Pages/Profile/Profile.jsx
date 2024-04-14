import Avatar from '@/Components/Avatar'
import Feed from '@/Components/Feed'
import ModalFeed from '@/Components/Modal/ModalFeed'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import { AuthContext } from '@/Context/Context'
import HorizontalScroll from '@/Layouts/HorizontalScroll'
import PageLayout from '@/Layouts/PageLayout'
import { Link } from '@inertiajs/react'
import React, { forwardRef, useContext, useEffect, useRef, useState, useTransition } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'


function Profile({ user, posts }) {
    return (
        <div className="mx-auto pt-8 max-w-5xl">
            <Header user={user} length={posts.length} />
            <TabContent />
            <Posts posts={posts} />
        </div>
    )
}

Profile.layout = page => <PageLayout children={page} />

function HeaderOptions({ user }) {
    const isAuthUser = useContext(AuthContext).user.id == user.id

    return (
        <div className="flex gap-2">
            {isAuthUser ?
                <>
                    <SecondaryButton children={'Edit Profile'} />
                    <SecondaryButton children={'View archive'} />
                    <SecondaryButton children={'Ad tools'} />
                    <Link as="button" href={route('profile.edit')} className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </Link>
                </>
                :
                <>
                    <PrimaryButton children={'Follow'} />
                    <SecondaryButton children={'Message'} />
                    <Link as='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </Link>
                </>
            }
        </div>
    )
}
// MARK: Avatar and profile
function Header(props) {
    const isAuthUser = useContext(AuthContext).user.id == props.user.id

    return (
        <div className='space-y-11'>
            <div className="flex">
                <div className="flex-grow me-8">
                    <Avatar avatar={props.user.avatar} avatarOnly className={'w-36 mx-auto'} />
                </div>
                <div className="flex flex-col flex-grow-[2] space-y-4">
                    <div className="flex gap-5 items-center">
                        <h2 className='text-xl'>{props.user.name}</h2>
                        <HeaderOptions user={props.user} />
                    </div>
                    <ul className="flex gap-10">
                        <li><span className='font-bold'>{props.length}</span> posts</li>
                        <li><span className='font-bold'>0</span> followers</li>
                        <li><span className='font-bold'>0</span> following</li>
                    </ul>
                    <div className="font-bold">
                        <p>{props.user.username}</p>
                    </div>
                </div>
            </div>
            <HorizontalScroll className={'px-8 text-center gap-x-9'}>
                {isAuthUser &&
                    <div className={`w-20`}>
                        <Link as='button' className="dark:bg-neutral-900 bg-neutral-50 rounded-full size-20 dark:border-black border-neutral-100 object-cover object-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 m-auto stroke-neutral-300 dark:stroke-neutral-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </Link>

                        <p className='text-xs truncate w-[inherit] pt-4'>New</p>
                    </div>
                }

            </HorizontalScroll>
            <hr className='border-neutral-300 dark:border-neutral-800' />
        </div>
    )
}
//MARK: Tab Button
const TabContentButton = forwardRef(({ name, children, disabled = false, isActive = false, onClick }, ref) => {

    return (
        <button type="button" disabled={disabled} onClick={(e) => onClick()} className={`${isActive ? `border-t dark:border-white border-black text-black dark:text-white` : `dark:text-neutral-300 text-neutral-800`} flex items-center justify-center py-5 text-start leading-tight`}>
            <div className="grid place-items-center">
                {children}
            </div>
            <p className='uppercase ms-1.5 text-xs'>{name}</p>
        </button>
    )
})

//MARK: Tab
function TabContent() {
    const [isPending, startTransition] = useTransition()
    const [tab, setTab] = useState('posts');

    const selectTab = (tab) => startTransition(() => setTab(tab))

    return (
        <div className="flex justify-center gap-14">
            <TabContentButton name={'posts'} onClick={() => selectTab('posts')} isActive={tab == 'posts'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                </svg>
            </TabContentButton>
            <TabContentButton disabled name={'saved'} onClick={() => selectTab('saved')} isActive={tab == 'saved'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </TabContentButton>
            <TabContentButton disabled name={'tagged'} onClick={() => selectTab('tagged')} isActive={tab == 'tagged'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </TabContentButton>
        </div>
    )
}

function Posts(props) {
    const [open, setOpen] = useState(false)
    const [post, setPost] = useState(null)
    const modalRef = useRef(null)

    return (
        <div className="grid grid-cols-3 gap-1">
            {props.posts.map((post, i) => {
                return (
                    <button key={i} className="relative aspect-square group" onClick={() => {
                        setPost(post)
                        setOpen(true)
                    }}>
                        <div className="absolute invisible group-hover:visible dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 content-center size-full space-x-5">
                            <Feed.ButtonInteraction name='Like'>
                                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </Feed.ButtonInteraction>
                            <Feed.ButtonInteraction name='Comment'>
                                <path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
                            </Feed.ButtonInteraction>
                            <Feed.ButtonInteraction name='Share'>
                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </Feed.ButtonInteraction>
                        </div>
                        <LazyLoadImage src={`storage/` + post.image} className='aspect-square object-cover object-center'
                            placeholder={
                                <div className={"bg-neutral-700 animate-pulse size-full"} />
                            }
                        />
                    </button>
                )
            })}
            {open && <ModalFeed setOpenFeed={setOpen} post={post} modalRef={modalRef} />}

        </div>
    )
}


export default Profile