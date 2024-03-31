import React, { useContext } from 'react'
import Avatar from './Avatar'
import Dropdown from './Dropdown';
import { Auth } from '@/Data/Auth';


const Feed = ({ children }) => {

    return (
        <div className="feed-wrapper mb-4 w-9/12">
            <div className="feed-item border-b dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15 bg-white dark:bg-black">
                {children}
            </div>
        </div>
    )
}

const Header = ({ user, children }) => {
    const authUser = useContext(Auth)
    return (
        <div className="header py-1 flex justify-between items-center">
            <div className="left flex flex-row items-center">
                <Avatar className='w-10' avatarOnly />
                <div className="user-name-and-place flex flex-col ms-4">
                    <span className="text-sm font-bold">{user.name}</span>
                    {/* <span className="text-xs font-light text-gray-900 dark:text-gray-50">Chiapas, Mexico</span> */}
                </div>
            </div>
            <Dropdown>
                <Dropdown.Trigger>
                    <svg aria-label="More options" className="_8-yf5 fill-black dark:fill-white" height="16" viewBox="0 0 48 48" width="16">
                        <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                        <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                        <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
                    </svg>
                </Dropdown.Trigger>
                {authUser.user.name == user.name &&
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



const Image = ({ image }) => {
    return (
        <div className="feed-img rounded min-h-72 items-center dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15 border">
            <img src={'storage/' + image} alt="" />
        </div>
    );
}




const ButtonInteraction = (props) => {
    return (
        <div className="button-interaction">
            <svg aria-label={props.name} className='fill-black dark:fill-white' height="24" viewBox="0 0 48 48" width="24">
                {props.children}
            </svg>
        </div>
    );
}


const ButtonInteractionsFeed = () => {
    return (
        <div className="icons flex flex-row justify-between items-center">
            <div className="left flex flex-row gap-4">
                <ButtonInteraction name='Like'>
                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </ButtonInteraction>
                <ButtonInteraction name='Comment'>
                    <path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
                </ButtonInteraction>
                <ButtonInteraction name='Share'>
                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                </ButtonInteraction>
            </div>
            <div className="right">
                <ButtonInteraction name='Save'>
                    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                </ButtonInteraction>
            </div>
        </div>
    );
}

const Bottom = (props) => {
    return (<div className="card-footer py-4">
        <div className="top">
            <ButtonInteractionsFeed />
            <div className="likes mt-1">
                <span className="font-bold text-sm">
                    122,780 likes
                </span>
            </div>
            <div className="caption text-sm mt-3">
                <b>{props.name} </b>
                {props.caption}
            </div>
            <div className="post-date mt-1">
                <span className="text-xs dark:text-gray-50 opacity-40 text-gray-900">
                    1 minute ago
                </span>
            </div>
        </div>
        <div className="pt-3 mt-3">
            <div className="wrapper flex">
                <input type="text" className="text-sm mt-0 block w-full px-0.5 border-0 focus:ring-0 bg-transparent" placeholder="Add a comment" />
                <button className="text-blue-500 opacity-75 w-2/12 text-right font-bold">post</button>
            </div>

        </div>
    </div>);
}

Feed.Header = Header
Feed.HeaderDropdown = HeaderDropdown
Feed.Image = Image
Feed.Bottom = Bottom


export default Feed