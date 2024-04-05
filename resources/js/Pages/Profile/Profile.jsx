import Avatar from '@/Components/Avatar';
import PageLayout from '@/Layouts/PageLayout'
import { Link } from '@inertiajs/react';
import React from 'react'


function Profile({ user, posts }) {
    return (
        <PageLayout>
            <div className="mx-auto pt-8 max-w-5xl">
                <Header user={user} length={posts.length} />
                <NavbarContent />
                <Posts posts={posts} />
            </div>
        </PageLayout>
    )
}




function HeaderOptions() {
    const HeaderButton = ({ children }) => <Link as="button" className='items-center px-4 py-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md font-medium text-sm dark:hover:bg-neutral-800 hover:bg-neutral-200 transition ease-in-out duration-150'>{children}</Link>

    return (
        <div className="flex gap-2">
            <HeaderButton>Edit Profile</HeaderButton>
            <HeaderButton>View archive</HeaderButton>
            <HeaderButton>Ad tools</HeaderButton>
            <Link as="button" className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </Link>
        </div>
    )
}

function Header(props) {
    return (
        <div className='space-y-11'>
            <div className="flex">
                <div className="flex-grow me-8">
                    <Avatar avatar={props.user.avatar} avatarOnly className={'w-36 mx-auto'} />
                </div>
                <div className="flex flex-col flex-grow-[2] space-y-4">
                    <div className="flex gap-5 items-center">
                        <h2 className='text-xl'>{props.user.name}</h2>
                        <HeaderOptions></HeaderOptions>
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
            <ul className="flex px-8">
                <li className='text-center'>
                    <div className={`w-20`}>
                        <Link as='button' className="dark:bg-neutral-900 bg-neutral-50 rounded-full size-20 dark:border-black border-neutral-100 object-cover object-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 m-auto stroke-neutral-300 dark:stroke-neutral-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </Link>

                        <p className='text-xs truncate w-[inherit] pt-4'>New</p>
                    </div>
                </li>
            </ul>
            <hr className='border-neutral-300 dark:border-neutral-800' />
        </div>
    );
}

function NavbarContent() {
    return (
        <div className="flex justify-center gap-14">
            <button role="button" className="flex items-center border-t dark:border-white border-black text-black dark:text-white justify-center py-5 text-start leading-tight ">
                <div className="grid place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                    </svg>
                </div>
                <p className='uppercase ms-1.5 text-xs'>posts</p>
            </button>
            <button role="button" className="flex items-center border-t dark:border-white border-black text-black dark:text-white justify-center py-5 text-start leading-tight ">
                <div className="grid place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                </div>
                <p className='uppercase ms-1.5 text-xs'>saved</p>
            </button>
            <button role="button" className="flex items-center border-t dark:border-white border-black text-black dark:text-white justify-center py-5 text-start leading-tight ">
                <div className="grid place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <p className='uppercase ms-1.5 text-xs'>tagged</p>
            </button>
        </div>
    );
}

function Posts(props) {
    return (<div className="grid grid-cols-3 gap-1">
        {props.posts.map((post, i) => {
            return <div key={i} className="aspect-square">
                <img src={`storage/` + post.image} className='aspect-square object-cover object-center' />
            </div>;
        })}
    </div>);
}


export default Profile